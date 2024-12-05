import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const location = useLocation()
    const navigation = [
        { name: 'Dashboard', hrefs: [ '/dashboard-table','/' ], current: false },
        { name: 'Conference', hrefs: ['/conference'], current: false },
        { name: 'Company', hrefs: ['/company'], current: false },
        { name: 'Approval', hrefs: ['/approval'], current: false },
    ];

    navigation.forEach(item => {
        item.current = item.hrefs.some(href => location.pathname === href);
    });

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="max-w-10xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center p-2">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true  " className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Revival TV"
                src="/public/admin/logo.png"
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.hrefs[0]}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'border-b-2 border-red text-black font-bold' : 'font-bold text-black hover:border-b-2 hover:border-red hover:text-black',
                      ' px-3 py-5 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <Menu as="div" className="relative ml-3">
                <div className='flex items-center space-x-2'> 
                <MenuButton className="flex items-center space-x-2"> 
                    <span className="sr-only">Open user menu</span>
                    <img
                    alt="Profile picture of Nadini Annisa"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="w-8 h-8 rounded-full" 
                    />
                    <p className='text-sm hidden md:block font-semibold px-2'>Nadini Annisa</p>
                </MenuButton>
                </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Logout
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'border-b-2 border-red text-black' : 'text-gray-300 hover:border-b-2 hover:border-red hover:text-black',
                'block px-3 py-3 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
