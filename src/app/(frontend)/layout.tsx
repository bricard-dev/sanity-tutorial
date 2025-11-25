import { DisableDraftMode } from '@/components/disable-draft-mode';
import { Header } from '@/components/header';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await sanityFetch({ query: NAVIGATION_QUERY });

  return (
    <section className="bg-white min-h-screen">
      <Header navigation={data?.navigation ?? []} />
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
