"use client"

import { SessionProvider } from "next-auth/react"

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
  return (
    <div><SessionProvider>{children}</SessionProvider></div>
  )
}

export default AuthProvider