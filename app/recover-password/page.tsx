import React from 'react'

import { RecoverPasswordForm } from './RecoverPasswordForm'

export default async function RecoverPassword() {
  return (
    <>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Recover Password
      </h1>
      <div className="mt-6">
        <RecoverPasswordForm />
      </div>
    </>
  )
}
