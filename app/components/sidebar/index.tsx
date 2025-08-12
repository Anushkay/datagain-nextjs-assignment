'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { Card, Button } from '@heroui/react';
import { sidebarItems, footerItems } from './constants';
import CollapsedSidebar from '../collapsed-sidebar';
import LeftArrowIcon from '@/app/icons/LeftArrowIcon';
import SidebarItem from './SidebarItem';
import PowerIcon from '@/app/icons/PowerIcon';

const SideBar = memo(function SideBar({ 
  isOpen, 
  setIsOpen 
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <CollapsedSidebar pathname={pathname} isOpen={isOpen} setIsOpen={setIsOpen} />

      <Card
        className={clsx(
          'fixed left-4 top-[calc(3.5rem+1rem+1.25rem)] bottom-4 h-[540px] bg-[#2C4E6C] flex flex-col z-20 rounded-xl text-white',
          'transition-[width,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'w-[212px]' : 'w-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="relative flex flex-col h-full">
          <nav className="mb-4 py-[20px] px-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  label={item.label}
                  isActive={pathname === item.path}
                  path={item.path}
                  iconProps={item.iconProps} 
                />
              ))}
            </ul>
          </nav>

          <div className="px-4 flex flex-col gap-[10px] pb-5">
            <ul className="space-y-2">
              {footerItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  label={item.label}
                  path={item.path}
                  isActive={pathname === item.path}
                  iconProps={item.iconProps}
                />
              ))}
            </ul>
            <Button
              variant="light"
              startContent={<PowerIcon size={22} />}
              className="w-[180px] h-[42px] bg-[#3FC3AC] text-white text-sm font-medium hover:bg-[#2C4E6C] rounded-[10px]"
            >
              Logout
            </Button>
          </div>
        </div>
      </Card>

      {isOpen && (
        <LeftArrowIcon
          className="fixed z-30 cursor-pointer"
          size={48}
          style={{
            top: 'calc(1.75rem + 1.25rem + 3rem)', 
            left: '206px',
          }}
          onClick={handleToggle}
          tooltip="Hide Navigation"
        />
      )}
    </>
  );
});

export default SideBar;