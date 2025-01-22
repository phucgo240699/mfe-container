import * as React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children = <></> }) => {
  return (
    <>
      <div className="fixed w-full px-6 py-3 bg-white flex justify-between items-center border-b-2 border-b-neutral-300 shadow-md">
        <a href={'/dashboard'}>Dashboard</a>
        <a href={'/marketing'}>Marketing</a>
        <button className="border-[1px] px-6 py-2 rounded-lg text-neutral-700 border-neutral-700 hover:text-blue-700 hover:border-blue-700 ">
          Login
        </button>
      </div>
      <br />
      <br />
      <br />
      {children}
    </>
  );
};
