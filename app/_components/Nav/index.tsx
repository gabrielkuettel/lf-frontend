import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

import { useAuth } from '../../_providers/Auth'

const userNavigation = [
  { name: 'Account', href: '/dashboard' },
  { name: 'Login', href: '/login' },
  { name: 'Create Account', href: '/create-account' },
  { name: 'Logout', href: '/logout' },
]

export function Nav() {
  const { user } = useAuth()

  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <div className="relative flex flex-1"></div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <span className="flex lg:items-center">
              <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {userNavigation.map(item => {
                if (user && (item.name === 'Account' || item.name === 'Logout')) {
                  return (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={clsx(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  )
                }

                if (!user && (item.name === 'Login' || item.name === 'Create Account')) {
                  return (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={clsx(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  )
                }

                return null
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
