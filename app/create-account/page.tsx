import React from 'react'

import { RenderParams } from '../_components/RenderParams'
import { getMeUser } from '../_utilities/getMeUser'
import { CreateAccountForm } from './CreateAccountForm'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/dashboard?message=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  return (
    <>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Create Account
      </h1>
      <div className="mt-6">
        <RenderParams />
      </div>
      <div className="mt-6">
        <CreateAccountForm />
      </div>
    </>
  )
}
