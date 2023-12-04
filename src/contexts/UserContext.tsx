"use client";

import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '@/types/User';

type UserContextType = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

// Provide a full default value for the context
const defaultContextValue: UserContextType = {
  user: undefined,
  setUser: () => { } // No-op function
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export function UserProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}