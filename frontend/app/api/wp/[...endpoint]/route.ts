import { NextRequest, NextResponse } from 'next/server';

async function fetchFromWordPress(endpoint: string, lang: string): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_URL;
  const url = `${baseUrl}/${endpoint}?lang=${lang}&_embed&per_page=100`;

  const response = await fetch(url, {
    next: {
      revalidate: 3600,
      tags: [endpoint, `locale:${lang}`]
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Next.js Server; +https://nextjs.org/)',
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  return response.json();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string[] }> }
) {
  try {
    const { endpoint } = await params;
    const endpointPath = endpoint.join('/');
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'sl';

    const data = await fetchFromWordPress(endpointPath, lang);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
