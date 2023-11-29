"use client";
import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const DashboardPage = () => {

  const { isAuthenticated, user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          // Get the access token
          const accessToken = await getAccessTokenSilently();

          // Get the ID token claims
          const idTokenClaims = await getIdTokenClaims();

          console.log('Access Token:', accessToken);
          console.log('ID Token Claims:', idTokenClaims);

          (async () => {
            try {
              const response = await fetch("http://localhost:8080/api/v1/auth/greet", {
                method: "GET",
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                },
                credentials: "include",
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              } else {
                const data = await response.json();
                console.log("RESPONSE: ", data);
              }
            } catch (error) {
              console.error('Fetch error:', error);
            }
          })();
          
        

        } catch (error) {
          console.error('Error fetching tokens:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);
  

  return ( 
    <div>DashboardPage</div>
  )
}

export default DashboardPage
