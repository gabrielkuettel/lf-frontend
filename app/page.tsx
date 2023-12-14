import Link from 'next/link'

export default function Home() {
  return (
    <>
      <p className="text-base font-semibold leading-7 text-indigo-600">Local Fiber</p>

      <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Auth and Access Control Demo
      </h1>

      <p className="mt-6 text-xl leading-8">
        {'This is a '}
        <Link
          href="https://payloadcms.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
        >
          Payload
        </Link>
        {' + '}
        <Link
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
        >
          Next.js
        </Link>
        {' app. Check out the source code for the '}
        <Link
          href="https://github.com/payloadcms/payload/tree/main/examples/auth"
          className="font-medium underline"
        >
          client
        </Link>
        {' and the '}
        <Link
          href="https://github.com/payloadcms/payload/tree/main/examples/auth"
          className="font-medium underline"
        >
          server.
        </Link>
      </p>

      <p className="mt-6 text-xl leading-8">
        {"This example demonstrates how to implement Payload's "}
        <Link
          href="https://payloadcms.com/docs/authentication/overview"
          className="font-medium underline"
        >
          Authentication
        </Link>
        {' and '}
        <Link
          href="https://payloadcms.com/docs/access-control/overview"
          className="font-medium underline"
        >
          Access Control
        </Link>
        {
          ' strategies in both the REST and GraphQL APIs. To toggle between these APIs, see `_layout.tsx`.'
        }
      </p>

      <p className="mt-6 text-xl leading-8">
        {'Visit the '}
        <Link href="/login" className="font-medium underline">
          login page
        </Link>
        {' to start the authentication flow. Once logged in, you will be redirected to the '}
        <Link href="/dashboard" className="font-medium underline">
          account page
        </Link>
        {` which is restricted to users only. To manage all users, `}
        <Link
          href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users`}
          className="font-medium underline"
        >
          login to the admin dashboard
        </Link>
        {'.'}
      </p>
    </>
  )
}
