import Link from 'next/link'

import { Button } from '../_components/Button'
import { RenderParams } from '../_components/RenderParams'
import { getMeUser } from '../_utilities/getMeUser'
import { AccountForm } from './AccountForm'

export default async function Account() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/dashboard')}`,
  })

  return (
    <>
      <RenderParams />
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Account</h1>
      <p className="mt-6 text-xl leading-8">
        {`This is your account dashboard. Here you can update your account information and more. To manage all users, `}
        <Link
          href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users`}
          className="font-medium underline"
        >
          login to the admin dashboard
        </Link>
        {'.'}
      </p>
      <div className="mt-6">
        <AccountForm />
      </div>
      <Button href="/logout" appearance="secondary" label="Log out" />
    </>
  )
}
