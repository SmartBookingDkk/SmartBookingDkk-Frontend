"use client";

import Image from 'next/image';


type AdminSidebarProps = {
  sidebarOpen: boolean;
};

const AdminSidebar = ({ sidebarOpen }: AdminSidebarProps) => {

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 lg:w-[220px] sm:w-[150px] bg-white border-r-2 pt-12 
      transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      style={{ zIndex: 0 }}
    >

      <div className="w-full h-full">

        <ul className="flex flex-col pt-10 h-2/5 text-black leading-loose">

          <div className='flex-col w-full'>

            <a href='/dashboard/calendar'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Calendar</li>
            </a>

            <a href='/dashboard/statistics'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Statistics</li>
            </a>

            <a href='/dashboard/invoices'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Invoices</li>
            </a>

            <a href='/dashboard/business-settings'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Business Settings</li>
            </a>

          </div>

        </ul>

      </div>

    </div>
  );
};

export default AdminSidebar;