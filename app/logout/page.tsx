import React from 'react'

import { LogoutPage } from './LogoutPage'

export default async function Logout() {
  return (
    <>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Log Out</h1>
      <div className="mt-6">
        <LogoutPage />
      </div>
    </>
  )
}
