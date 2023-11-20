import React from 'react'
import Link from "next/link";

const Login = () => {
  return (
    <div>
        <Link href="http://localhost:8080/oauth2/authorization/google">Signin with Google</Link>
        </div>
  )
}

export default Login
