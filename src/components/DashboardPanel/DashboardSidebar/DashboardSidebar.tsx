"use client";

import Image from 'next/image';


type DashboardSidebarProps = {
  sidebarOpen: boolean;
};

const DashboardSidebar = ({ sidebarOpen }: DashboardSidebarProps) => {

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 lg:w-[220px] sm:w-[180px] bg-white border-r-2 pt-12 
      transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      style={{ zIndex: 0 }}
    >

      <div className="w-full h-full">

        <ul className="flex flex-col pt-10 h-2/5 text-black leading-loose">

          <div className='flex-col w-full'>

            <a href='/dashboard/calendar'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Kalender</li>
            </a>

            <a href='/dashboard/statistics'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Statistik</li>
            </a>

            <a href='/dashboard/invoices'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Fakturaer</li>
            </a>

            <a href='/dashboard/my-profile'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center'>
                Min profil
              </li>
            </a>

            <a href='/dashboard/business-settings'>
              <li className='my-4 py-2 hover:cursor-pointer hover:bg-gray-200 text-center' >Min Virksomhed</li>
            </a>

          </div>

        </ul>

      </div>

    </div>
  );
};

export default DashboardSidebar;
