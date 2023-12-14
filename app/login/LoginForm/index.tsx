'use client'

import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../_components/Button'
import { Input } from '../../_components/Input'
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    defaultValues: {
      email: 'admin@admin.com',
      password: 'admin',
    },
  })

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/dashboard')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
      <p>
        To log in, use the email <b>admin@admin.com</b> with the password <b>admin</b>. To manage
        your users,{' '}
        <Link
          href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users`}
          className="font-medium underline"
        >
          login to the admin dashboard
        </Link>
        .
      </p>
      <div className="mt-6">
        <Message error={error} />
      </div>
      <div className="mt-6">
        <Input
          name="email"
          label="Email Address"
          required
          register={register}
          error={errors.email}
          type="email"
        />
      </div>
      <div className="mt-4">
        <Input
          name="password"
          type="password"
          label="Password"
          required
          register={register}
          error={errors.password}
        />
      </div>
      <div className="mt-4">
        <Button
          type="submit"
          disabled={isLoading}
          label={isLoading ? 'Processing' : 'Login'}
          appearance="primary"
        />
      </div>
      <div className="mt-6">
        <Link href={`/create-account${allParams}`} className="font-medium underline">
          Create an account
        </Link>
        <br />
        <Link href={`/recover-password${allParams}`} className="font-medium underline">
          Recover your password
        </Link>
      </div>
    </form>
  )
}
