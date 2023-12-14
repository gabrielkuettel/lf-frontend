import React from 'react'

import { ResetPasswordForm } from './ResetPasswordForm'

export default async function ResetPassword() {
  return (
    <>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Reset Password
      </h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </>
  )
}
