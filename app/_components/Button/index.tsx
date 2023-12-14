'use client'

import React, { ElementType } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

export type Props = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  className,
  onClick,
  type = 'button',
  disabled,
}) => {
  let el = elFromProps
  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const content = (
    <span
      className={clsx(
        appearance === 'secondary' && 'text-gray-900',
        appearance === 'default' && 'text-gray-900',
      )}
    >
      {label}
    </span>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link
        href={href || ''}
        className={clsx(
          'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          appearance === 'primary' && 'bg-indigo-600 hover:bg-indigo-500',
          appearance === 'secondary' && 'bg-white hover:bg-gray-100 text-gray-900',
          appearance === 'default' && 'bg-white hover:bg-gray-100 text-gray-900',
          className,
        )}
        {...newTabProps}
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={clsx(
        'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        appearance === 'primary' && 'bg-indigo-600 hover:bg-indigo-500',
        appearance === 'secondary' && 'bg-white hover:bg-gray-100 text-gray-900',
        appearance === 'default' && 'bg-white hover:bg-gray-100 text-gray-900',
        className,
      )}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
