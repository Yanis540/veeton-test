import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import UserAccountNav from './UserAccountNav';
import Link from 'next/link';

interface NavbarProps {

};

function Navbar({}:NavbarProps) {
    return (
    <MaxWidthWrapper>
        <header className="flex flex-row items-center justify-between px-5 py-4 h-[4rem] border-b border-gray-600">
          {/* Logo from left */}
          <Link href='/' className="text-gray-600">Veeton</Link>
          {/* User photo from right */}
          <UserAccountNav /> 
        </header>
     </MaxWidthWrapper>
    );
};

export default Navbar;