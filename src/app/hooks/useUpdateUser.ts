"use client";
import { UserContext } from "@/contexts/UserContext";
import type { User } from "@/types/User";
import { Session } from "next-auth";
import { useContext, useEffect } from "react";


const useUpdateUser = (session: Session | null) => {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        const fetchData = async () => {
            if (session) {
                const sessionUser: User = {
                    email: session.user!.email!.toString(),
                    active: true,
                    provider: session.user.provider,
                };
    
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_CREATE_USER}`, {
                        method: "POST",
                        signal: signal,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(sessionUser),
                    });
                
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                
                    const user: User = await response.json();
                    setUser(user);
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            }
        };
    
        fetchData();
    
        return () => {
            abortController.abort();
        };
    }, [session, setUser]);
};

export default useUpdateUser;