import React from 'react'

import { RenderParams } from '../_components/RenderParams'
import { getMeUser } from '../_utilities/getMeUser'
import { LoginForm } from './LoginForm'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/dashboard?message=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <>
      <RenderParams />
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Log In</h1>
      <div className="mt-6">
        <LoginForm />
      </div>
    </>
  )
}
