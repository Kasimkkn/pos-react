import React from 'react';
import { FaHome, FaHistory } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdMenu } from 'react-icons/md';
import { FaCartShopping } from "react-icons/fa6";


const Header = ({isSidebarOpen , toggleSidebar , toggleCart}) => {
  
  return (
    <nav className={`bg-secondary  z-50  fixed ${isSidebarOpen ? 'w-56 h-full'  : 'px-8 w-full flex justify-between'}`}>
      <div className={`flex justify-between max-md:w-[50%] ${isSidebarOpen ? 'max-md:w-[100%]' : ''}`}>
      <button className="md:hidden text-white p-4 focus:outline-none" onClick={toggleSidebar}>
        <MdMenu className='text-3xl hover:text-text-primary hover:cursor-pointer'/>
      </button>  
      <div className='logo text-text-primary text-xl p-5 flex items-center max-md:text-xl'>
        M<span className='text-white'>a</span>M
      </div>
      </div>
      <ul className={`flex gap-10 items-center ${isSidebarOpen ? 'flex flex-col justify-evenly h-96 items-start' : 'max-md:hidden'}`}>
        <li>
          <a href="#" className='text-text-primary flex gap-2 items-center max-md:text-xl'>
            <BiSolidFoodMenu className='text-2xl' />
            MENU
          </a>
        </li>
        <li>
          <a href="#" className='text-white flex gap-2 items-center max-md:text-xl' >
            <FaHome className='text-2xl' />
            HOME
          </a>
        </li>
        <li>
          <a href="#" className='text-text-primary flex items-center gap-2 max-md:text-xl'>
            <FaHistory className='text-2xl' />
            HISTORY
          </a>
        </li>
      </ul>
      <div className={`Icon flex gap-5 items-center ${isSidebarOpen ? 'max-md:justify-center max-md:h-[80%]' : 'max:md:hidden'}`}>
        <div className={`w-10 h-10 ${isSidebarOpen ? '' : 'max-md:hidden'}`}>
          <img src="https://media.licdn.com/dms/image/D4D03AQG0YsFctCrMZQ/profile-displayphoto-shrink_800_800/0/1711246000788?e=1720656000&v=beta&t=tQnguUzqoyRoJ6B0dXGu04OF8aPaln0XZEwxz2HL0uY" alt="kasim" className='w-full h-full rounded-full' />
        </div>
      </div>
      <button className="md:hidden text-white p-4 focus:outline-none" onClick={toggleCart}>
        <FaCartShopping className='text-3xl hover:text-text-primary hover:cursor-pointer'/>
      </button>  
    </nav>
  );
};

export default Header;
