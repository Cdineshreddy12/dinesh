import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
import BottomNavBar from './bottomNav';
import { useSelector ,useDispatch  } from 'react-redux';
import { setIsMobile } from '../ReduxStore/responsiveSlice'; 
const HomePage = () => {


  const categories = [
    "Academics & Stationery", "Snacks", "Health and Hygiene", "Dorm Essentials", "Others", "All Categories"
  ];

  const isMobile = useSelector((state) => state.responsive.isMobile);
  const dispatch=useDispatch();
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      dispatch(setIsMobile(mobileView)); // Dispatch action to update isMobile state
    };

    // Initial check to set the correct value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);



  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      <div className="flex"> 
        {/* Sidebar */}
        {!isMobile && <SideBar isMobile={isMobile} categories={categories}  />} {/* Show Sidebar only on larger screens */}
        {/* Main Content */}
        <div className="flex-grow ">
          <Outlet/>
        </div>
      </div>
        {/* bottom nav */}
        {isMobile && <BottomNavBar/> }
    </div>
  );
};

export default HomePage;
