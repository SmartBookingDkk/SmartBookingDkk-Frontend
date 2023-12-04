"use client";

import React, { useEffect } from 'react';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import { useDashboardSidebar } from '@/contexts/DashboardSidebarContext';



type DashboardProps = {
  children?: React.ReactNode;
};



const DashboardPanel = ({ children }: DashboardProps) => {
  const { sidebarOpen, setSidebarOpen } = useDashboardSidebar();

  useEffect(() => {
    const storedSidebarOpen = localStorage.getItem('sidebarOpen');
    if (storedSidebarOpen) {
      setSidebarOpen(JSON.parse(storedSidebarOpen));
    }
  }, []);
  
  const openSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    localStorage.setItem('sidebarOpen', JSON.stringify(!sidebarOpen));
  }


  return (
    <div className="flex flex-col">
      <DashboardNavbar openSidebar={openSidebar} />
      <div className="flex">
        <DashboardSidebar sidebarOpen={sidebarOpen} />
        <div
          className={`flex-grow p-4 transition-all duration-300 ease-in-out transform ${
            sidebarOpen ? 'lg:ml-[220px] sm:ml-[180px]' : 'ml-0'
          }`}
        >
          {children}
          </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
