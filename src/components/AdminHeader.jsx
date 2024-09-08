import React from 'react';
import { ShoppingCart, Bell, User, PlusCircle, ClipboardList, BarChart2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const AdminHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
                <div className="flex items-center justify-center space-x-2 md:space-x-4 flex-grow md:flex-grow-0 md:text-center">
                    <span className="font-inter text-14px flex items-center text-sm md:text-lg px-2 md:px-4 py-1 md:py-2 bg-white text-black rounded-full flex gap-1 md:gap-2 font-bold tracking-tight">
                    Student's
                    <span className="text-[#E30513]">Provision</span>
                    <span className="">Store</span>
                    </span>
                </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <div className="flex items-center text-white font-bold hover:text-gray-900">
              <PlusCircle className="h-5 w-5 mr-1" />
              <NavLink to="/adminDashboard/addProduct"><span>Add a Product</span></NavLink>
            </div>
            <div className="flex items-center text-white font-bold hover:text-gray-900">
              <ClipboardList className="h-5 w-5 mr-1" />
              <NavLink to="/adminDashboard"><span>Orders</span></NavLink>
            </div>
            <div className="flex items-center text-white font-bold hover:text-gray-900">
              <BarChart2 className="h-5 w-5 mr-1" />
              <NavLink to="/adminDashboard/analytics"><span>Analytics</span></NavLink>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-white font-bold hover:text-gray-900">
              <User className="h-6 w-6" />
              <span className="ml-1 text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;