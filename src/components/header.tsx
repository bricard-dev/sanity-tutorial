import { siteConfig } from '@/lib/site-config';
import { urlFor } from '@/sanity/lib/image';
import { NAVIGATION_QUERYResult } from '@/sanity/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

type HeaderProps = {
  siteSettings: NAVIGATION_QUERYResult;
};

export function Header({ siteSettings }: HeaderProps) {
  const {
    navigation,
    headerDisplayType,
    headerCustomTitle,
    headerLogo,
    title,
  } = siteSettings || {};

  // Détermine le contenu à afficher dans le header
  const renderHeaderTitle = () => {
    switch (headerDisplayType) {
      case 'customTitle':
        return (
          <span className="md:text-xl font-bold tracking-tight">
            {headerCustomTitle || title || siteConfig.title}
          </span>
        );
      case 'logo':
        if (headerLogo?.asset?.url) {
          return (
            <Image
              src={urlFor(headerLogo).width(150).height(60).url()}
              alt={headerLogo.alt || 'Logo'}
              width={150}
              height={60}
              className="h-10 w-auto object-contain"
              priority
            />
          );
        }
        // Fallback si le logo n'est pas disponible
        return (
          <span className="md:text-xl font-bold tracking-tight">
            {title || siteConfig.title}
          </span>
        );
      case 'siteTitle':
      default:
        return (
          <span className="md:text-xl font-bold tracking-tight">
            {title || siteConfig.title}
          </span>
        );
    }
  };

  return (
    <header className="h-16 flex justify-between items-center container mx-auto">
      <Link href="/" className="flex items-center">
        {renderHeaderTitle()}
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          {navigation?.map((item) => (
            <NavigationMenuItem key={item._key}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={`/${item.page?.slug?.current || ''}`}>
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
