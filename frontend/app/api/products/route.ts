import { NextResponse } from 'next/server';
import https from 'https';

export const revalidate = 3600;

function fetchWithHttps(url: string, maxRedirects = 5): Promise<any> {
  return new Promise((resolve, reject) => {
    if (maxRedirects === 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const options = {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    };

    https.get(url, options, (res) => {

      if (res.statusCode && (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308)) {
        const location = res.headers.location;
        if (location) {

          res.destroy();
          fetchWithHttps(location, maxRedirects - 1)
            .then(resolve)
            .catch(reject);
          return;
        }
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP error! status: ${res.statusCode}`));
          }
        } catch (error) {
          reject(new Error('Failed to parse JSON response'));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

export async function GET() {
  try {
    const data = await fetchWithHttps(
      "https://wp.intenia-engineering.si/wp-json/wp/v2/products"
    );
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',

      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

