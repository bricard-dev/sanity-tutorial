import { NAVIGATION_QUERYResult } from '@/sanity/types';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

type HeaderProps = {
  navigation: NonNullable<NAVIGATION_QUERYResult>['navigation'];
};

export function Header({ navigation }: HeaderProps) {
  return (
    <header className="h-16 flex justify-between items-center container mx-auto">
      <Link className="md:text-xl font-bold tracking-tight" href="/">
        Layer Caker
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
