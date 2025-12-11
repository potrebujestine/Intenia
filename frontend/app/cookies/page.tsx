import CookiesPage from "@/components/cookies-page"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPageRoute() {
  return <CookiesPage />
}
