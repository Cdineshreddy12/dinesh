import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaChevronRight, FaTimes } from 'react-icons/fa';
import { LuPackageCheck } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MobileMenu } from '../ReduxStore/MobileCategorySlice';
import { setActiveCategory } from '../ReduxStore/CategorySlice';

export default function Header() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.MobileCategory.mobileMenuIsOpen);
  const activeCategory = useSelector((state) => state.category.activeCategory);
  const { categories } = useSelector((state) => state.category);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    dispatch(MobileMenu());
  };

  const handleCategoryChange = (category) => {
    dispatch(setActiveCategory(category));
    dispatch(MobileMenu());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const CategoryList = () => (
    <ul className="space-y-2 mt-4">
      {categories.map((category, index) => (
        <li 
          key={index} 
          className={`
            py-3 px-4 rounded-lg text-black flex items-center justify-between cursor-pointer
            transition-all duration-200 ease-in-out
            ${activeCategory === category
              ? 'bg-blue-100 text-blue-600 font-semibold' 
              : 'hover:bg-gray-100'
            }
          `}
          onClick={() => handleCategoryChange(category)}
        >
          <span className="flex items-center">
            <FaBars className={`mr-3 ${activeCategory === category ? 'text-blue-500' : 'text-gray-400'}`} />
            {category}
          </span>
          <FaChevronRight className={`
            transition-transform duration-200
            ${activeCategory === category ? 'transform rotate-90 text-blue-500' : 'text-gray-400'}
          `} />
        </li>
      ))}
    </ul>
  );

  return (
    <header className="bg-[#1A98FF] shadow-lg z-50 w-full text-white fixed top-0">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 flex-shrink-0">
            <span className="font-inter text-14px flex items-center text-sm md:text-lg px-2 md:px-4 py-1 md:py-2 bg-white text-black rounded-full flex gap-1 md:gap-2 font-bold tracking-tight">
              Student's
              <span className="text-[#E30513]">Provision</span>
              <span className="">Store</span>
            </span>
          </div>
          
          {/* Search Bar - Visible on all screen sizes */}
          <div className="flex-grow max-w-xl mx-2 md:mx-4 order-3 md:order-2 w-full md:w-auto mt-2 md:mt-0">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-0 mt-1 mr-2 bg-yellow-400 text-blue-800 rounded-full p-2 hover:bg-yellow-300 transition duration-300">
                <FaSearch className="text-lg" />
              </button>
            </form>
          </div>
          
          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-6 order-2 md:order-3">
            <NavLink to="/orders" className="flex items-center hover:text-yellow-300 transition duration-300">
              <LuPackageCheck className="text-3xl mr-2" />
            </NavLink>
            <NavLink to="/cart" className="flex items-center hover:text-yellow-300 transition duration-300 relative">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">12</span>
            </NavLink>
            <NavLink to="/signup" className="flex items-center bg-[#1A98FF] group cursor-pointer transition duration-300">
              <div className="bg-[#1A98FF] rounded-full p-2 mr-2 group-hover:bg-yellow-300 transition duration-300">
                <FaUser className="text-lg" />
              </div>
              <span className='font-semibold group-hover:text-yellow-300'>Login</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl order-2 md:order-3"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-400 to-blue-400 text-white">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleMenu} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          <nav className="space-y-4">
            <a href="/orders" className="flex items-center text-gray-800">
              <LuPackageCheck className="text-2xl mr-2" />
              <span>Orders</span>
            </a>
            <a href="/cart" className="flex items-center text-gray-800">
              <FaShoppingCart className="text-2xl mr-2" />
              <span>Cart</span>
            </a>
            <a href="/signup" className="flex items-center text-gray-800">
              <FaUser className="text-2xl mr-2" />
              <span>Login</span>
            </a>
          </nav>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Categories</h2>
            <CategoryList />
          </div>
        </div>
      </div>
    </header>
  );
}