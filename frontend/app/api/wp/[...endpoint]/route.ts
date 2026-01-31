import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600;

async function fetchFromWordPress(endpoint: string, lang: string): Promise<any> {
  const url = `https://wp.intenia-engineering.si/wp-json/wp/v2/${endpoint}?lang=${lang}&_embed`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
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

