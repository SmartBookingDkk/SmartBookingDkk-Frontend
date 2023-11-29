"use client";

import React, { createContext } from 'react';
import { useMediaQuery } from '@mui/material';

type ResponsiveContextType = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    };

const defaultResponsiveContext: ResponsiveContextType = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
};

export const ResponsiveContext = createContext<ResponsiveContextType>(defaultResponsiveContext);


export function ResponsiveProvider(props: any) {
    const mobile = useMediaQuery('(max-width: 763px)');
    const tablet = useMediaQuery('(min-width: 764px) and (max-width: 1280px)');
    const desktop = useMediaQuery('(min-width: 1281px) and (max-width: 5000px)');

    const value = {
        isMobile: mobile,
        isTablet: tablet,
        isDesktop: desktop,
    };

    return <ResponsiveContext.Provider value={value} {...props} />;
}

