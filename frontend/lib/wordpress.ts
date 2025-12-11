

export async function getGalleryImages() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/galleries`;

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch galleries: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error: any) {
    if (error.message?.includes('fetch failed')) {
      throw new Error('Network error: Unable to connect to WordPress API. Please check your internet connection and the API endpoint.');
    }
    throw error;
  }
}