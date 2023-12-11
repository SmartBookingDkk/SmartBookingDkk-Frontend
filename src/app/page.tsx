"use client";

import Image from 'next/image'
import Login from '@/components/login/Login'

export default function Home() {

const handleClick = async () => {
  const response = await fetch('http://localhost:8080/api/v1/auth/user', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log("RESPONSE: ", response.json());
}


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Login />
      <button onClick={() => handleClick()}>Hello</button>
    </main>
  )
}