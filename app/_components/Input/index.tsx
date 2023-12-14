'use client'

import React from 'react'
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'
import clsx from 'clsx'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'number' | 'password' | 'email'
  validate?: (value: string) => boolean | string
}

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
  validate,
}) => {
  return (
    <>
      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
        {`${label} ${required ? '*' : ''}`}
      </label>
      <input
        className={clsx(
          'block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          error && 'ring-2 ring-red-500 focus:ring-red-600 active:ring-red-600',
        )}
        {...{ type }}
        {...register(name, {
          required,
          validate,
          ...(type === 'email'
            ? {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              }
            : {}),
        })}
      />
      {error && (
        <div className="text-red-600 text-xs">
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </>
  )
}
