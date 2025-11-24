import { DisableDraftMode } from '@/components/disable-draft-mode';
import { Header } from '@/components/header';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-white min-h-screen">
      <Header />
      {children}
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </section>
  );
}
