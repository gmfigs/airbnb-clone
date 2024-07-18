'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
      <img
        className='hidden md:block cursor-pointer'
        width="100"
        height="100"
        src="/images/logo.png"/>
  );
}

export default Logo;