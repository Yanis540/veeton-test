import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import UserAccountNav from './UserAccountNav';

interface NavbarProps {

};

function Navbar({}:NavbarProps) {
    return (
    <MaxWidthWrapper>
        <header className="flex flex-row items-center justify-between px-5 py-4 border-b border-gray-600">
          {/* Logo from left */}
          <h2 className="text-gray-600">Veeton</h2>
          {/* User photo from right */}
          <UserAccountNav /> 
        </header>
     </MaxWidthWrapper>
    );
};

export default Navbar;