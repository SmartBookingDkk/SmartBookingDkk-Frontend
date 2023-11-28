"use client";

import React, { createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

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
    const mobile = useMediaQuery({ query: '(max-width: 763px)' });
    const tablet = useMediaQuery({ query: '(min-width: 764px) and (max-width: 1280px)' });
    const desktop = useMediaQuery({ query: '(min-width: 1281px) and (max-width: 1920px)' });

    const value = {
        isMobile: mobile,
        isTablet: tablet,
        isDesktop: desktop,
    };

    return <ResponsiveContext.Provider value={value} {...props} />;
}

