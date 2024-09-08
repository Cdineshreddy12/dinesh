

  





import React, { useState, useEffect } from 'react';
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

const Navigation = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCategory = (index) => {
    if (isMobile) {
      setOpenCategory(openCategory === index ? null : index);
    }
  };

  const categories = [
    {
      name: "Fruits & Vegetables",
      items: ["Apples", "Bananas", "Oranges", "Strawberries", "Grapes", "Carrots", "Broccoli", "Spinach", "Tomatoes", "Potatoes", "Onions", "Lettuce", "Cucumbers", "Bell Peppers"]
    },
    {
      name: "Dairy & Eggs",
      items: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Eggs", "Sour Cream", "Cottage Cheese", "Almond Milk", "Soy Milk", "Oat Milk", "Cream Cheese", "Whipped Cream"]
    },
    {
      name: "Meat & Seafood",
      items: ["Chicken", "Beef", "Pork", "Turkey", "Salmon", "Tuna", "Shrimp", "Lamb", "Sausages", "Bacon", "Ground Beef", "Crab", "Tilapia", "Cod"]
    },
    {
      name: "Bakery",
      items: ["Bread", "Bagels", "Muffins", "Croissants", "Cakes", "Cookies", "Pies", "Donuts", "Rolls", "Tortillas", "Baguettes", "Pastries"]
    },
    {
      name: "Pantry",
      items: ["Rice", "Pasta", "Flour", "Sugar", "Salt", "Pepper", "Olive Oil", "Vinegar", "Ketchup", "Mustard", "Mayonnaise", "Peanut Butter", "Jelly", "Honey", "Cereal", "Canned Soup", "Canned Vegetables", "Canned Fruits"]
    },
    {
      name: "Frozen Foods",
      items: ["Ice Cream", "Frozen Pizza", "Frozen Vegetables", "Frozen Fruits", "TV Dinners", "Frozen Waffles", "Frozen Fish", "Ice Pops", "Frozen Yogurt"]
    },
    {
      name: "Beverages",
      items: ["Water", "Soda", "Coffee", "Tea", "Juice", "Energy Drinks", "Sports Drinks", "Beer", "Wine", "Liquor", "Sparkling Water"]
    },
    {
      name: "Snacks",
      items: ["Chips", "Pretzels", "Popcorn", "Crackers", "Nuts", "Dried Fruits", "Chocolate", "Candy", "Granola Bars", "Trail Mix"]
    },
    {
      name: "Personal Care",
      items: ["Shampoo", "Conditioner", "Soap", "Toothpaste", "Deodorant", "Lotion", "Sunscreen", "Razors", "Feminine Hygiene", "Cotton Swabs"]
    },
  
  ];

  return (
    <nav className="bg-blue-600 fixed w-full text-white mt-16 z-50">
      <div className="hidden md:block container mx-auto px-4">
        {isMobile && (
          <div className="flex justify-between items-center py-2">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
            <span className="font-bold">Categories</span>
          </div>
        )}
        <ul className={`${isMobile && !isMenuOpen ? 'hidden' : 'flex'} flex-col md:flex-row md:flex-wrap md:justify-between py-2`}>
          {categories.map((category, index) => (
            <li 
              key={index} 
              className={`relative ${isMobile ? 'mb-2' : 'hover:bg-blue-800'} px-2 py-1 font-bold rounded cursor-pointer`}
              onMouseEnter={() => !isMobile && setHoveredCategory(index)}
              onMouseLeave={() => !isMobile && setHoveredCategory(null)}
              onClick={() => toggleCategory(index)}
            >
              <div className="flex justify-between items-center">
                {category.name}
                {isMobile && (
                  <span>
                    {openCategory === index ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
                  </span>
                )}
              </div>
              {((isMobile && openCategory === index) || (!isMobile && hoveredCategory === index)) && (
                <ul className={`${isMobile ? 'relative mt-2' : 'absolute left-0 mt-1'} w-full md:w-48 bg-white text-black shadow-lg rounded-md py-2`}>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="px-4 py-2 hover:bg-gray-100">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;