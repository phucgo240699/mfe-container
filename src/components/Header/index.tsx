import { AuthenticationContext } from '@/contexts/authentication';
import * as React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children = <></> }) => {
  const { isAuthenticated, reset } = React.useContext(AuthenticationContext);

  const handleLogout = (): void => {
    reset();
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="fixed w-full px-6 py-3 bg-white flex justify-between items-center border-b-2 border-b-neutral-300 shadow-md">
          <a href={'/'}>Dashboard</a>
          <a href={'/marketing'}>Marketing</a>
          <button
            onClick={handleLogout}
            className="border-[1px] px-6 py-2 rounded-lg text-red-700 border-red-700 hover:text-red-500 hover:border-red-500 "
          >
            Logout
          </button>
        </div>
      ) : (
        <></>
      )}
      <br />
      <br />
      <br />
      {children}
    </>
  );
};
