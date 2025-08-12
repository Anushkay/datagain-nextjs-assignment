'use client';
import RightArrowIcon from '@/app/icons/RightArrowIcon';
import { sidebarItems, footerItems } from '../sidebar/constants';
import type { CollapsedSidebarProps } from './types';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function CollapsedSidebar({
  isOpen,
  setIsOpen,
}: CollapsedSidebarProps) {
  if (isOpen) return null;  

  return (
    <div className="bg-[#2C4E6C] fixed left-4 top-[calc(3.5rem+1rem+1.25rem)] bottom-4 w-16 rounded-lg z-20 flex flex-col items-center py-4 gap-2">
      <Button
        type="button"
        size='sm'
        onPress={() => setIsOpen(true)}
        className="focus:outline-none  bg-transparent hover:bg-white/20 rounded-full transition-colors border-none"
        aria-label="Expand sidebar"
      >
        <RightArrowIcon 
          size={18} 
          color="#FFFFFF" 
          tooltip="Show Navigation"
        />
      </Button>

      {/* Main Navigation Items */}
      <nav className="flex flex-col items-center gap-4 flex-1">
        {sidebarItems.map((item) => {
          const IconComponent = item.iconProps?.icon;
          return (
            <Button
              size='sm'
              as={Link}
              key={item.path}
              className="bg-transparent hover:bg-white/20  transition-colors"
              title={item.label}
              href={item.path}
            >
              {typeof IconComponent === "function" ? (
                <IconComponent 
                  size={18} 
                  color="#FFFFFF" 
                  tooltip={item.label}
                />
              ) : (
                <span className="text-white text-xs font-medium">
                  {item.label?.charAt(0)}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer Items */}
      <div className="flex flex-col items-center gap-6 mt-auto">
        {footerItems.map((item) => {
         const IconComponent = item.iconProps?.icon;
          return (
          <Button
            key={item.path}
            className="bg-transparent hover:bg-white/20 rounded-full transition-colors"
            title={item.label}
            size='sm'
          >
             {typeof IconComponent === "function" ? (
                <IconComponent 
                  size={20} 
                  color="#FFFFFF" 
                   tooltip={item.label}
                />
              ) : (
                <span className="text-white text-xs font-medium">
                  {item.label?.charAt(0)}
                </span>
              )}
          </Button>
        )})}
      </div>
    </div>
  );
}