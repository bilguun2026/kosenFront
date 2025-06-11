'use client';

import { useQuery } from '@tanstack/react-query';
import Header, { NavItem } from './header';
import { fetchNavigation } from '@/lib/api';
import { PageNavigation } from '@/types/api';

interface HeaderWithDataProps {
  className?: string;
}

export default function HeaderWithData({ className }: HeaderWithDataProps) {
  const {
    data: pages,
    isLoading,
    error,
  } = useQuery<PageNavigation[], Error>({
    queryKey: ['navigation'],
    queryFn: fetchNavigation,
  });


  const navItems: NavItem[] = Array.isArray(pages)
    ? pages.map((page) => ({
        label: page.title,
        href: `/page/${page.slug}`,
        dropdownItems:
          page.children.length > 0
            ? page.children.map((child) => ({
                label: child.title,
                href: `/page/${child.slug}`,
                subItems:
                  child.children.length > 0
                    ? child.children.map((subChild) => ({
                        label: subChild.title,
                        href: `/page/${subChild.slug}`,
                      }))
                    : undefined,
              }))
            : undefined,
      }))
    : [];


  if (isLoading) {
    return (
      <header
        className={`bg-gradient-to-r from-white to-gray-100 shadow-lg z-50 relative pointer-events-auto p-4 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-gray-700 animate-pulse">Loading...</div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header
        className={`bg-gradient-to-r from-white to-gray-100 shadow-lg z-50 relative pointer-events-auto p-4 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-red-600">Navigation error: Try again later</div>
        </div>
      </header>
    );
  }

  return (
    <Header
      className={className}
      title='ШИНЖЛЭХ УХААН ТЕХНОЛОГИЙН ИХ СУРГУУЛЬ'
      subtitle='КООСЭН ТК'
      navItems={navItems}
      onLanguageChange={() => alert('Language change not implemented')}
    />
  );
}