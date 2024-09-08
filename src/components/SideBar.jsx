// SideBar.js
import React from 'react';
import { FaBars, FaChevronRight, FaTimes, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSide } from '../ReduxStore/SisebarSlice';
import { setActiveCategory } from '../ReduxStore/CategorySlice';

export default function SideBar({ isMobile }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.side);
  const { categories, activeCategory } = useSelector((state) => state.category);

  const handleToggleSidebar = () => {
    dispatch(toggleSide());
  };

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
    if (isMobile) handleToggleSidebar();
  };

  const CategoryList = () => (
    <ul className="space-y-2">
      {categories.map((category, index) => (
        <li 
          key={index} 
          className={`
            py-3 px-4 rounded-lg flex items-center justify-between cursor-pointer
            transition-all duration-200 ease-in-out
            ${activeCategory === category 
              ? 'bg-blue-100 text-blue-600 font-semibold' 
              : 'hover:bg-gray-100'
            }
          `}
          onClick={() => handleCategoryClick(category)}
        >
          <span className="flex items-center">
            <FaBars className={`mr-3 ${activeCategory === category ? 'text-blue-500' : 'text-gray-400'}`} />
            {isOpen && category}
          </span>
          {isOpen && (
            <FaChevronRight className={`
              transition-transform duration-200
              ${activeCategory === category ? 'transform rotate-90 text-blue-500' : 'text-gray-400'}
            `} />
          )}
        </li>
      ))}
    </ul>
  );

  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-12 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg"
          onClick={handleToggleSidebar}
        >
          <FaBars />
        </button>
        <aside className={`fixed top-12 left-0 w-64 h-full bg-white shadow-lg px-4 py-6 overflow-y-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">Categories</h2>
            <button onClick={handleToggleSidebar} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          <CategoryList />
        </aside>
      </>
    );
  }

  return (
    <aside className={`fixed top-32 left-0 ${isOpen ? 'w-1/4' : 'w-16'} h-[calc(100vh-8rem)] bg-white shadow-lg overflow-y-auto transition-all duration-500 ease-in-out`}>
      <div className={`flex justify-between items-start p-4 ${isOpen ? '' : 'flex-col'}`}>
        {isOpen && <h2 className="text-2xl font-bold mb-6 text-blue-600 border-b pb-2">Categories</h2>}
        <button 
          className={`text-3xl text-blue-600 hover:text-blue-800 transition-transform duration-300 `} 
          onClick={handleToggleSidebar}
        >
          {!isOpen ? <FaArrowAltCircleRight /> : <FaArrowAltCircleLeft />}
        </button>
      </div>
      <div className={`${isOpen ? 'px-4' : 'px-2'}`}>
        <CategoryList />
      </div>
    </aside>
  );
}