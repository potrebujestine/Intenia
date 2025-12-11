import GalleryClient from './GalleryClient';
import { getGalleryImages } from '@/lib/wordpress';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/gallery',
  },
};

interface GalleryImage {
  ID: string;
  post_title: string;
  guid: string;
}

interface GalleryItem {
  id: number;
  image: GalleryImage[];
}

export default async function GalleryPage() {
  try {
    const wpGalleries: GalleryItem[] = await getGalleryImages();

    const allImages = wpGalleries.flatMap((gallery) =>
      (gallery.image || []).map((img) => ({
        ID: img.ID,
        url: img.guid || '',
        title: img.post_title || '',
      }))
    );

    return <GalleryClient images={allImages} />;
  } catch (error) {
    console.error('Error loading gallery:', error);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Napaka pri nalaganju galerije</h1>
          <p className="text-white/70">Prosimo, poskusite znova pozneje.</p>
        </div>
      </div>
    );
  }
}
