import React from 'react';
import { Home, ShoppingBag, User, List } from 'lucide-react';
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <NavLink> <NavItem icon={<Home size={24} />} label="Home" /> </NavLink>
        <NavLink  to="/orders"> <NavItem icon={<ShoppingBag size={24} />} label="Orders" /> </NavLink>
       <NavLink to="/cart">  <NavItem icon={<FaShoppingCart size={24} />} label="Cart" /> </NavLink>
        <NavLink to="/signup">
           <NavItem icon={<User size={24} />} label="Login" />
        </NavLink>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default BottomNavBar;