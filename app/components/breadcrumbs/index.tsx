'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function Breadcrumb() {
  const pathname = usePathname();

  const pageTitle = useMemo(() => {
    if (!pathname || pathname === '/') return 'Home';
    const segment = pathname.replace('/', '');
    
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [pathname]);

  return (
    <div className="text-sm font-normal text-black  border-b-4 border-b-[#3FC3AC] pb-1 inline-block">
      {pageTitle}
    </div>
  );
}
