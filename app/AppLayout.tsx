'use client';

import { useState } from 'react';
import SideBar from './components/sidebar';
import Breadcrumb from './components/breadcrumbs';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-1 pt-[5.5rem]">
      {/* Sidebar */}
      <div
        className={`fixed left-4 top-[calc(3.5rem+1rem+1.25rem)] bottom-4 z-20 transition-all duration-300 
        ${isOpen ? 'w-[212px]' : 'w-20'}`}
      >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Main content area fixed inside page */}
      <div
        className={`fixed top-[5.5rem] right-4 bottom-4 transition-all duration-300 flex flex-col bg-#F6F7F8 rounded-lg`}
        style={{
          left: isOpen ? '246px' : '96px', // align with breadcrumb & sidebar
        }}
      >
        {/* Breadcrumb */}
        <div className="h-12 flex items-center px-5 rounded-t-lg ">
       <Breadcrumb />   
      </div>

        {/* Scrollable content inside fixed container */}
        <main className="flex-1 rounded-b-lg h-screen overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
