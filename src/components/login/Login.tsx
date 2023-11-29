import React from 'react'
import Link from "next/link";
import LoginButton from './LoginButton';
import { useAuth0, GetTokenSilentlyOptions } from '@auth0/auth0-react';

const Login = () => {

  const { getIdTokenClaims, getAccessTokenSilently } = useAuth0();

  const accessToken = getAccessTokenSilently();
  const idToken = getIdTokenClaims();

  
  console.log('getIdTokenClaims', accessToken);
  console.log('getAccessTokenSilently', idToken);

  return (
    <>
      <div className=' border-2 border-black p-4 mb-10 hover:cursor-pointer'>
        <Link href="http://localhost:8080/oauth2/authorize/google">Signin with Google</Link>
      </div>
      <div className=' border-2 border-black p-4 hover:cursor-pointer'>
        <Link href="http://localhost:8080/oauth2/authorize/github">Signin with Github</Link>
      </div>
      <LoginButton />
    </>


  )
}

export default Login
