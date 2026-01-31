import { NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const MIN_SUBMISSION_TIME = 2000;
const MAX_SUBMISSION_TIME = 30 * 60 * 1000;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 10000);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);

    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({
        error: 'Too many requests. Please try again later.'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 50000) {
      return new Response(JSON.stringify({
        error: 'Request too large'
      }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await req.json();

    if (data.website && data.website.trim() !== '') {
      return new Response(JSON.stringify({
        error: 'Spam detected'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data._timestamp) {
      return new Response(JSON.stringify({
        error: 'Invalid submission'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const submissionTime = Date.now() - data._timestamp;
    if (submissionTime < MIN_SUBMISSION_TIME || submissionTime > MAX_SUBMISSION_TIME) {
      return new Response(JSON.stringify({
        error: 'Invalid submission timing'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data.name || !data.email) {
      return new Response(JSON.stringify({
        error: 'Name and email are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sanitizedName = sanitizeInput(data.name);
    const sanitizedEmail = data.email.trim().toLowerCase();
    const sanitizedProjectInfo = data.projectInformation ? sanitizeInput(data.projectInformation) : '';
    const sanitizedMessage = data.message ? sanitizeInput(data.message) : '';

    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return new Response(JSON.stringify({
        error: 'Invalid name length'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!validateEmail(sanitizedEmail)) {
      return new Response(JSON.stringify({
        error: 'Invalid email address'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!process.env.WP_USER || !process.env.WP_APP_PASSWORD) {
      return new Response(JSON.stringify({
        error: 'Server configuration error - missing credentials'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = Buffer.from(
      `${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`
    ).toString("base64");

    const requestBody = {
      title: sanitizedName,
      status: "publish",
      meta: {
        full_name: sanitizedName,
        email_address: sanitizedEmail,
        project_information: sanitizedProjectInfo,
        message_text: sanitizedMessage,
      },
    };

    const res = await fetch(
      "https://wp.intenia-engineering.si/wp-json/wp/v2/contact_submission",
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; Next.js Server; +https://nextjs.org/)",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return new Response(JSON.stringify({
        error: 'Failed to submit form',
        status: res.status
      }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await res.json();

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}