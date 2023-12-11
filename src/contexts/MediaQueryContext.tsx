"use client";

import React, { createContext } from 'react';
import { useMediaQuery } from '@mui/material';

type ResponsiveContextType = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
    };

const defaultResponsiveContext: ResponsiveContextType = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isPortrait: false,
};

export const ResponsiveContext = createContext<ResponsiveContextType>(defaultResponsiveContext);


export function ResponsiveProvider(props: any) {
    const mobile = useMediaQuery('(max-width: 763px)' );
    const tablet = useMediaQuery('(min-width: 764px) and (max-width: 1280px)' );
    const desktop = useMediaQuery('(min-width: 1281px) and (max-width: 1920px)' );
    const portrait = useMediaQuery('(orientation: portrait)' );

    const value = {
        isMobile: mobile,
        isTablet: tablet,
        isDesktop: desktop,
        isPortrait: portrait,
    };

    return <ResponsiveContext.Provider value={value} {...props} />;
}

