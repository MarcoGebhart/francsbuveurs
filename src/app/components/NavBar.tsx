"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo.png"


 export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    return (
        <nav className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="flex justify-between items-center h-20 md:hidden">
            <div className="absolute left-1/2 transform -translate-x-1/2">
                {/* Logo */}
                <Image
                    
                    src={Logo}
                    alt="FrancsBuveurs"
                    width={150}
                    height={150}
                />
            </div>
            {/* Burger */}
            <div className="ml-auto">
                <button
                className="md:hidden text-black focus:outline-none z-20" 
                onClick={toggleMenu}
                aria-label="menu mobile"
                >
                {/* Icône de burger SVG */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                </button>
            </div>
         </div> 
        {/* Desktop & tablette */}
        <div className="hidden md:flex items-center h-20 justify-center gap-15">
          {/* Liens gauche */}
          <div className="md:flex md:flex-col gap-4 lg:flex-row lg:gap-15">
            <a href="#" className="hover:text-orange-500 ">LA BOUTIQUE</a>
            <a href="#" className="hover:text-orange-500">LE BAR</a>
          </div>

          {/* Logo au centre */}
          <Image
            src={Logo}
            alt="FrancsBuveurs"
            width={150}
            height={150}
          />

          {/* Liens droite */}
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-15">
            <a href="#" className="hover:text-orange-500">LES EVENEMENTS</a>
            <a href="#" className="hover:text-orange-500">LA BRASSERIE</a>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4 text-center">
          <a href="#" className="block hover:text-orange-500">LA BOUTIQUE</a>
          <a href="#" className="block hover:text-orange-500">LE BAR</a>
          <a href="#" className="block hover:text-orange-500">LES EVENEMENTS</a>
          <a href="#" className="block hover:text-orange-500">LA BRASSERIE</a>
        </div>
      )}
    </nav>
  );

}