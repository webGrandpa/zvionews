'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import CategoryNav from './cards/CategoryNav';
import './ui/gradient.css';
import './ui/header-button.css';

export default function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        navRef.current && !navRef.current.contains(event.target) &&
        burgerRef.current && !burgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <header className="bg-white px-4 md:px-14 py-2 shadow-md fixed w-full z-50 top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" onClick={handleLinkClick}>
            <Image 
              className='logo'
              src="/logo.png" 
              alt="ZvioNews Logo" 
              width={150} 
              height={50} 
              priority
            />
          </Link>
          
          {/* Desktop Navigation (visible on md screens and up) */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            <CategoryNav />
            <ul className="flex items-center gap-4">
              {status === 'loading' ? (
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              ) : session ? (
                <>
                  <li className='cursor-pointer hover:underline'>
                    <Link href="/profile">პროფილი</Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="bg-rose-300 text-white px-3 py-1 rounded"
                    >
                      გასვლა
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/register" className="fill-in-button">რეგისტრაცია</Link>
                  </li>
                  <li>
                    <Link href="/login" className="fill-in-button">შესვლა</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          <div className="md:hidden">
            <button 
              ref={burgerRef}
              onClick={toggleMenu} 
              className="relative z-50 focus:outline-none"
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav 
        ref={navRef}
        id="mobile-navigation"
        className={`fixed top-0 left-0 h-full w-3/5 max-w-sm bg-white z-50 flex flex-col p-8 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-start gap-6 mt-8">
          <CategoryNav />
          <ul className="flex flex-col items-start gap-4 mt-4 border-t border-gray-200 pt-4 w-full">
            {status === 'loading' ? (
              <li className="w-full py-2 text-gray-500">იტვირთება...</li>
            ) : session ? (
              <>
                <li className='w-full'>
                  <Link href="/profile" onClick={handleLinkClick} className="block py-2 hover:underline">პროფილი</Link>
                </li>
                <li className='w-full'>
                  <button 
                    onClick={() => { handleLinkClick(); signOut({ callbackUrl: '/' }); }}
                    className="bg-rose-300 text-white px-3 py-1 rounded w-full text-left"
                  >
                    გასვლა
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='w-full'>
                  <Link href="/register" onClick={handleLinkClick} className="fill-in-button text-center block py-2">რეგისტრაცია</Link>
                </li>
                <li className='w-full'>
                  <Link href="/login" onClick={handleLinkClick} className="fill-in-button text-center block py-2">შესვლა</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}