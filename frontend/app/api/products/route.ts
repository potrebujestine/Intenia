import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(
      "https://wp.intenia-engineering.si/wp-json/wp/v2/products",
      {
        next: { revalidate: 3600 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Next.js Server; +https://nextjs.org/)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}