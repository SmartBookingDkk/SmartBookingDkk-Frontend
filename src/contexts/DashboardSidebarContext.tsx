"use client";
import { useState, createContext ,useContext } from "react";

const DashboardSidebarContext = createContext({
    sidebarOpen: false,
    setSidebarOpen: (value: boolean) => {}
});


const DashboardSidebarProvider = ({ children }: any) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <DashboardSidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </DashboardSidebarContext.Provider>
    );
};

export const useAdminSidebar = () => useContext(DashboardSidebarContext);

export default DashboardSidebarProvider;