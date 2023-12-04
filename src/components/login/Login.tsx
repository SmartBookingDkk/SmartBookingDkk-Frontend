import React from 'react'
import Link from "next/link";

const Login = () => {

  return (
    <>
      <div className=' border-2 border-black p-4 mb-10 hover:cursor-pointer'>
        <Link href="/api/auth/signin?callbackUrl=/dashboard">Signin with Google</Link>
      </div>
    </>
  )
}

export default Login
