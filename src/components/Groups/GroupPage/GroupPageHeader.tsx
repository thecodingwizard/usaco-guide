import { Transition } from '@headlessui/react';
import * as React from 'react';
import Group from '../../../mobx/Group';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';

export default observer(function GroupPageHeader(props: { group: Group }) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const ref = useRef();

  React.useEffect(() => {
    const handleClick = e => {
      // @ts-ignore
      if (ref.current.contains(e.target)) return;
      setIsActionsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="py-6 sm:py-12 bg-gradient-to-r from-light-blue-800 to-cyan-600">
      <div className="max-w-7xl px-4 sm:px-8 mx-auto md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-xl sm:text-3xl font-bold">
            {props.group?.name ?? 'Loading...'}
          </h1>
          <p className="text-cyan-100 text-base sm:text-lg mt-2">
            {props.group?.detail}
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <div className="relative inline-block text-left" ref={ref}>
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-light-blue-800 text-sm font-medium text-white hover:bg-light-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-blue-600 focus:ring-black transition"
                id="options-menu"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
              >
                Actions
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <Transition
              show={isActionsOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Account settings
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Support
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  License
                </a>
                <form method="POST" action="#">
                  <button
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </header>
  );
});