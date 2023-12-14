'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '../../_components/Button'
import { Input } from '../../_components/Input'
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'

type FormData = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${user.id}`,
          {
            // Make sure to include cookies with fetch
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            name: json.doc.name,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(`/login?unauthorized=account`)
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
      <Message error={error} success={success} />
      {!changePassword ? (
        <Fragment>
          <p>
            {'To change your password, '}
            <button
              type="button"
              onClick={() => setChangePassword(!changePassword)}
              className="font-medium underline"
            >
              click here
            </button>
            .
          </p>
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
        </Fragment>
      ) : (
        <Fragment>
          <p>
            {'Change your password below, or '}
            <button
              type="button"
              onClick={() => setChangePassword(!changePassword)}
              className="font-medium underline"
            >
              cancel
            </button>
            .
          </p>
          <div className="mt-6">
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
            <Input
              name="passwordConfirm"
              type="password"
              label="Confirm Password"
              required
              register={register}
              validate={value => value === password.current || 'The passwords do not match'}
              error={errors.passwordConfirm}
            />
          </div>
        </Fragment>
      )}
      <Button
        type="submit"
        label={isLoading ? 'Processing' : changePassword ? 'Change password' : 'Update account'}
        appearance="primary"
        className="my-4"
      />
    </form>
  )
}
