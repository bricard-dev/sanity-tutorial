import { siteConfig } from '@/lib/site-config';
import { sanityFetch } from '@/sanity/lib/live';
import { SITE_METADATA_QUERY } from '@/sanity/lib/queries';
import type { Metadata } from 'next';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { data: siteSettings } = await sanityFetch({
    query: SITE_METADATA_QUERY,
  });

  return {
    title: siteSettings?.title || siteConfig.title,
    description: siteSettings?.description || siteConfig.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
