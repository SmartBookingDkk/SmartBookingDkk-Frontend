"use client";

import React, { useEffect } from 'react';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import AdminSidebar from './AdminSidebar/AdminSidebar';
import { useAdminSidebar } from '@/contexts/AdminSidebarContext';



type AdminProps = {
  children?: React.ReactNode;
};



const AdminPanel = ({ children }: AdminProps) => {
  const { sidebarOpen, setSidebarOpen } = useAdminSidebar();

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
      <AdminNavbar openSidebar={openSidebar} />
      <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} />
        <div
          className={`flex-grow p-4 transition-all duration-300 ease-in-out transform ${
            sidebarOpen ? 'ml-[250px]' : 'ml-0'
          }`}
        >
          {children}
          </div>
      </div>
    </div>
  );
};

export default AdminPanel;
