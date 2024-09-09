import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaStar, FaRegStar, FaChevronLeft, FaChevronRight, FaFire, FaGift } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaClock } from "react-icons/fa";

const products = [
  // Electronics
  {
    name: "Apple MacBook Air M1",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
    price: 999.99,
    salePrice: 899.99,
    rating: 5,
    reviews: 1234,
    category: "Electronics"
  },
  {
    name: "Sony WH-1000XM4 Headphones",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
    price: 349.99,
    salePrice: 299.99,
    rating: 4,
    reviews: 5678,
    category: "Electronics"
  },
  {
    name: "Samsung 55 QLED 4K TV",
    image: "https://images.samsung.com/is/image/samsung/p6pim/uk/qe55q60aauxxu/gallery/uk-qled-q60a-qe55q60aauxxu-front-silver-431389319",
    price: 799.99,
    salePrice: 699.99,
    rating: 4,
    reviews: 789,
    category: "Electronics"
  },
  {
    name: "Apple iPad Pro 12.9",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-cell-spacegray-202104_GEO_US?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1617920522000",
    price: 1099.99,
    salePrice: 999.99,
    rating: 5,
    reviews: 456,
    category: "Electronics"
  },
  {
    name: "DJI Mavic Air 2 Drone",
    image: "https://m.media-amazon.com/images/I/61H6sByGqbL._AC_SL1500_.jpg",
    price: 799.99,
    salePrice: 749.99,
    rating: 4,
    reviews: 234,
    category: "Electronics"
  },

  // Fashion
  {
    name: "Nike Air Max 270",
    image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/pyyixbczj6u5kiwhpjik/air-max-270-mens-shoes-KkLcGR.png",
    price: 150.00,
    salePrice: 129.99,
    rating: 4,
    reviews: 890,
    category: "Fashion"
  },
  {
    name: "Levi's 501 Original Fit Jeans",
    image: "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?$qv_desktop_full$",
    price: 69.50,
    salePrice: 59.99,
    rating: 4,
    reviews: 1200,
    category: "Fashion"
  },
  {
    name: "Ray-Ban Aviator Sunglasses",
    image: "https://assets.ray-ban.com/is/image/RayBan/805289602057_shad_qt?$594$",
    price: 154.00,
    salePrice: 139.99,
    rating: 5,
    reviews: 2345,
    category: "Fashion"
  },
  {
    name: "Fossil Men's Chronograph Watch",
    image: "https://fossil.scene7.com/is/image/FossilPartners/FS5384_main?$sfcc_fos_medium$",
    price: 149.00,
    salePrice: 129.99,
    rating: 4,
    reviews: 567,
    category: "Fashion"
  },
  {
    name: "The North Face Denali Fleece Jacket",
    image: "https://images.thenorthface.com/is/image/TheNorthFace/NF0A3XAU_JK3_hero?$638x745$",
    price: 179.00,
    salePrice: 159.99,
    rating: 5,
    reviews: 890,
    category: "Fashion"
  },

  // Home & Kitchen
  {
    name: "Instant Pot Duo 7-in-1",
    image: "https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_SL1500_.jpg",
    price: 99.99,
    salePrice: 79.99,
    rating: 5,
    reviews: 4567,
    category: "Home & Kitchen"
  },
  {
    name: "Dyson V11 Cordless Vacuum",
    image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/268731-01.png?$responsive$&fmt=png-alpha&cropPathE=mobile&fit=stretch,1&wid=640",
    price: 599.99,
    salePrice: 499.99,
    rating: 4,
    reviews: 1234,
    category: "Home & Kitchen"
  },
  {
    name: "KitchenAid Stand Mixer",
    image: "https://kitchenaid-h.assetsadobe.com/is/image/content/dam/global/kitchenaid/countertop-appliance/portable/images/hero-KSM150PSER.tif",
    price: 379.99,
    salePrice: 329.99,
    rating: 5,
    reviews: 3456,
    category: "Home & Kitchen"
  },
  {
    name: "Nespresso Vertuo Coffee Machine",
    image: "https://www.nespresso.com/ecom/medias/sys_master/public/12569812172830/Desktop-PDP-2000x2000.png",
    price: 199.99,
    salePrice: 169.99,
    rating: 4,
    reviews: 789,
    category: "Home & Kitchen"
  },
  {
    name: "Philips Hue White and Color Ambiance Starter Kit",
    image: "https://images.philips-hue.com/is/image/PhilipsLighting/046677548483_A1_1000x1000",
    price: 199.99,
    salePrice: 179.99,
    rating: 4,
    reviews: 567,
    category: "Home & Kitchen"
  },

  // Books
  {
    name: "Atomic Habits by James Clear",
    image: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    price: 27.00,
    salePrice: 21.99,
    rating: 5,
    reviews: 87654,
    category: "Books"
  },
  {
    name: "The Midnight Library by Matt Haig",
    image: "https://m.media-amazon.com/images/I/51Ifl1zXhJL._SX329_BO1,204,203,200_.jpg",
    price: 26.00,
    salePrice: 19.99,
    rating: 4,
    reviews: 23456,
    category: "Books"
  },
  {
    name: "Dune by Frank Herbert",
    image: "https://m.media-amazon.com/images/I/41+L9Q+rWvL._SX277_BO1,204,203,200_.jpg",
    price: 18.00,
    salePrice: 14.99,
    rating: 5,
    reviews: 34567,
    category: "Books"
  },
  {
    name: "The Silent Patient by Alex Michaelides",
    image: "https://m.media-amazon.com/images/I/51OuP0mmnwL._SX326_BO1,204,203,200_.jpg",
    price: 26.99,
    salePrice: 20.99,
    rating: 4,
    reviews: 12345,
    category: "Books"
  },
  {
    name: "Where the Crawdads Sing by Delia Owens",
    image: "https://m.media-amazon.com/images/I/51j5p18mJNL._SX330_BO1,204,203,200_.jpg",
    price: 26.00,
    salePrice: 18.99,
    rating: 5,
    reviews: 45678,
    category: "Books"
  },

  // Sports & Outdoors
  {
    name: "Fitbit Charge 5",
    image: "https://m.media-amazon.com/images/I/61UwwYq9W0L._AC_SL1500_.jpg",
    price: 179.99,
    salePrice: 149.99,
    rating: 4,
    reviews: 3456,
    category: "Sports & Outdoors"
  },
  {
    name: "Hydro Flask Water Bottle",
    image: "https://m.media-amazon.com/images/I/61mNJ-8VxQL._AC_SL1500_.jpg",
    price: 44.95,
    salePrice: 39.99,
    rating: 5,
    reviews: 12345,
    category: "Sports & Outdoors"
  },
  {
    name: "Coleman Sundome Tent",
    image: "https://m.media-amazon.com/images/I/61+pBiwkGxL._AC_SL1500_.jpg",
    price: 79.99,
    salePrice: 69.99,
    rating: 4,
    reviews: 5678,
    category: "Sports & Outdoors"
  },
  {
    name: "Spalding NBA Street Basketball",
    image: "https://m.media-amazon.com/images/I/91vdgs5FY4L._AC_SL1500_.jpg",
    price: 29.99,
    salePrice: 24.99,
    rating: 4,
    reviews: 2345,
    category: "Sports & Outdoors"
  },
  {
    name: "Osprey Farpoint 40 Travel Backpack",
    image: "https://m.media-amazon.com/images/I/91Ey5HqQ7qL._AC_SL1500_.jpg",
    price: 160.00,
    salePrice: 139.99,
    rating: 5,
    reviews: 1234,
    category: "Sports & Outdoors"
  },

  // Beauty & Personal Care
  {
    name: "Olaplex Hair Perfector No 3 Repairing Treatment",
    image: "https://m.media-amazon.com/images/I/61tdHYJXVyL._SL1500_.jpg",
    price: 28.00,
    salePrice: 24.99,
    rating: 4,
    reviews: 23456,
    category: "Beauty & Personal Care"
  },
  {
    name: "Neutrogena Hydro Boost Water Gel",
    image: "https://m.media-amazon.com/images/I/71ijpn9UyXL._SL1500_.jpg",
    price: 19.99,
    salePrice: 16.99,
    rating: 5,
    reviews: 34567,
    category: "Beauty & Personal Care"
  },
  {
    name: "Oral-B Pro 1000 Electric Toothbrush",
    image: "https://m.media-amazon.com/images/I/81RVpT3JmlL._SL1500_.jpg",
    price: 49.99,
    salePrice: 39.99,
    rating: 4,
    reviews: 12345,
    category: "Beauty & Personal Care"
  },
  {
    name: "Revlon One-Step Hair Dryer And Volumizer",
    image: "https://m.media-amazon.com/images/I/712ztoyoLYL._SL1500_.jpg",
    price: 59.99,
    salePrice: 49.99,
    rating: 5,
    reviews: 45678,
    category: "Beauty & Personal Care"
  },
  {
    name: "CeraVe Moisturizing Cream",
    image: "https://m.media-amazon.com/images/I/61S7BrCBj7L._SL1000_.jpg",
    price: 18.99,
    salePrice: 16.08,
    rating: 5,
    reviews: 56789,
    category: "Beauty & Personal Care"
  }
];

export default function MainContent() {
  const isOpen = useSelector((state) => state.sidebar.side);
  const { activeCategory, categories } = useSelector((state) => state.category);

  const filteredProducts = activeCategory === "All Categories"
    ? []
    : products.filter(product => product.category === activeCategory);

  const mainContentClass = isOpen 
    ? 'w-full sm:w-3/4 sm:ml-[25%]' 
    : 'w-full sm:ml-0';

  return (
    <main className={`${mainContentClass} mt-[60px] sm:mt-[10%] p-4 z-[0] transition-all duration-300 ease-in-out overflow-y-auto`}>
      {activeCategory === "All Categories" ? (
        <HomepageView categories={categories} isOpen={isOpen} />
      ) : (
        <CategoryView 
          category={activeCategory} 
          products={filteredProducts}
          isOpen={isOpen}
        />
      )}
    </main>
  );
}

function HomepageView({ categories, isOpen }) {
  const contentClass = isOpen 
    ? 'w-full transition-all duration-300 ease-in-out' 
    : 'w-full sm:w-[95%] sm:ml-[5%] transition-all duration-300 ease-in-out';

  const featuredCategories = [
    { name: "Beauty Bonanza", discount: "UP TO 50% OFF", image: "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/e7554fcdb3042316.jpg?q=20" },
    { name: "Cold Drinks & Snacks", discount: "UP TO 33% OFF", image: 	"https://rukminim1.flixcart.com/fk-p-flap/1000/170/image/d9290fb51138d286.png?q=20" },
    { name: "Dry Fruits & Spices", discount: "UP TO 50% OFF", image: "	https://rukminim1.flixcart.com/fk-p-flap/1000/170/image/e7554fcdb3042316.jpg?q=20" },
    { name: "Electronics Extravaganza", discount: "UP TO 60% OFF", image: "	https://rukminim1.flixcart.com/fk-p-flap/1000/170/image/01c63eaa43ccb5ed.jpg?q=20" },
    { name: "Fashion Fiesta", discount: "UP TO 70% OFF", image: "	https://rukminim1.flixcart.com/fk-p-flap/1000/170/image/7c6cf1a109b087d2.jpg?q=20" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredCategories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + featuredCategories.length) % featuredCategories.length);
  };

  const topCategories = [
    { name: "Smartphones", discount: "Up To 40% Off", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000" },
    { name: "Headphones & Speakers", discount: "Up To 75% Off", image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg" },
    { name: "Small Appliances", discount: "Up To 65% Off", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-cell-spacegray-202104_GEO_US?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1617920522000"},
    { name: "Oil & Ghee", discount: "Up To 25% Off", image:  "https://images.thenorthface.com/is/image/TheNorthFace/NF0A3XAU_JK3_hero?$638x745$"},
    { name: "Atta & Pulses", discount: "Up To 33% Off", image: "/api/placeholder/200/200" },
    { name: "Dry Fruits", discount: "From ₹299 (500)", image: "/api/placeholder/200/200" },
    { name: "Chocolates", discount: "Up To 50% Off", image: "/api/placeholder/200/200" },
    { name: "Soft Drinks", discount: "Up To 33% Off", image: "/api/placeholder/200/200" },
    { name: "Instant Foods", discount: "Up To 50% Off", image: "/api/placeholder/200/200" },
    { name: "Men's Fashion", discount: "Min 40-80% Off", image: "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?$qv_desktop_full$"  },
    { name: "Women's Fashion", discount: "Min 40-80% Off", image:  "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/pyyixbczj6u5kiwhpjik/air-max-270-mens-shoes-KkLcGR.png" },
    { name: "Kids' Fashion", discount: "Min 40-80% Off", image: "/api/placeholder/200/200" },
  ];

  const flashDeals = products.slice(0, 5).map(product => ({
    ...product,
    flashPrice: (product.salePrice * 0.8).toFixed(2), // 20% off the sale price
    timeLeft: Math.floor(Math.random() * 24) + 1, // Random hours left between 1-24
  }));

  return (
    <div className={contentClass}>
      {/* Main Banner Slider */}
      <div className="relative mb-8 overflow-hidden rounded-lg shadow-md">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredCategories.map((category, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative">
                <img src={category.image} alt={category.name} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                  <h3 className="text-white text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white text-xl font-semibold mb-4">{category.discount}</p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-lg font-semibold w-max transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          onClick={prevSlide}
        >
          <FaChevronLeft className="text-black text-xl" />
        </button>
        <button 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          onClick={nextSlide}
        >
          <FaChevronRight className="text-black text-xl" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredCategories.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Flash Deals Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaFire className="text-red-500 mr-2" />
          Flash Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {flashDeals.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-red-500">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                  FLASH DEAL
                </div>
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold">
                  {product.timeLeft}h left
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-red-600 font-bold">₹{product.flashPrice}</p>
                  <p className="text-gray-500 line-through text-xs">₹{product.price.toFixed(2)}</p>
                </div>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <h2 className="text-2xl font-bold mb-4">Shop From Top Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {topCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <img src={category.image} alt={category.name} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-1">{category.name}</h3>
              <p className="text-xs text-blue-600">{category.discount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offers Banner */}
      <div className="bg-gradient-to-r from-purple-300 to-indigo-300 rounded-lg shadow-md p-6 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Special Summer Sale!</h2>
        <p className="text-xl mb-4">Get an extra 15% off on orders above ₹1000</p>
        <button className="bg-white text-purple-600 hover:bg-yellow-400 hover:text-gray-900 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300">
          Shop Now
        </button>
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaGift className="text-green-500 mr-2" />
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {products.slice(0, 4).map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-blue-600 font-bold text-xl">₹{product.salePrice.toFixed(2)}</p>
                {product.salePrice < product.price && (
                  <p className="text-gray-500 line-through">₹{product.price.toFixed(2)}</p>
                )}
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => 
                    i < Math.round(product.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
                <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
              </div>
              <button className="w-full bg-[#FACC15] text-white text-sm font-semibold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryView({ category, products, isOpen }) {
  const contentClass = isOpen 
    ? 'w-full transition-all duration-300 ease-in-out' 
    : 'w-full sm:w-[95%] sm:ml-[5%] transition-all duration-300 ease-in-out';

  return (
    <div className={contentClass}>
      {/* Category Header - Reduced size */}
      <div className="relative w-full h-16 sm:h-20 mb-6 overflow-hidden rounded-lg shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 animate-gradient-x"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-20 flex items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            {category}
          </h2>
        </div>
      </div>

      {/* Category-specific Banner - Adjusted font sizes */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-2xl p-6 mb-6 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 "></div>
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 bg-black"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Exclusive {category.charAt(0).toUpperCase() + category.slice(1)} Sale!
          </h2>
          <p className="text-xl md:text-2xl font-semibold mb-2 tracking-wide">
            Buy 2, Get 1 FREE
          </p>
          <div className="flex items-center justify-center md:justify-start text-yellow-300 font-bold">
            <FaClock size={24} className="mr-2 animate-pulse" />
            <span className="text-lg">Ends in:1 hour</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          <p className="text-4xl font-black mb-2 tracking-widest text-yellow-300 animate-bounce">
            BOGO50
          </p>
          <p className="text-sm mb-3 font-medium">Use code at checkout</p>
          <button className="group bg-white text-purple-700 hover:bg-yellow-300 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg">
            Shop Now
            <FaShoppingCart size={24} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mb-20 -mr-20"></div>
      <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full -mt-10 -ml-10"></div>
    </div>


      {/* Featured Products in Category - Adjusted sizes */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <FaFire className="text-red-500 mr-2" />
          Hot Deals in {category}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-red-500">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                  HOT DEAL
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-red-600 font-bold text-base">₹{(product.salePrice * 0.9).toFixed(2)}</p>
                  <p className="text-gray-500 line-through text-xs">₹{product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => 
                      i < Math.round(product.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                    )}
                  </div>
                  <span className="text-gray-600 text-xs ml-1">({product.reviews})</span>
                </div>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 px-2 rounded-full transition-all duration-300 flex items-center justify-center">
                  <FaShoppingCart className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* banner */}

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 transform rotate-45"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Flash Sale!</h2>
          <p className="text-lg mb-2">Extra 20% OFF on {category} items</p>
          <div className="flex items-center text-yellow-300 font-semibold">
            <FaClock size={20} className="mr-2" />
            <span>Limited time offer</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          <p className="text-3xl font-bold mb-2">EXTRA20</p>
          <p className="text-sm mb-3">Use code at checkout</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 flex items-center">
            Shop Now
            <FaShoppingCart size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>

      {/* Product Grid - Adjusted sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 transition-all duration-300 ease-in-out">
        {products.map((product, i) => (
          <div key={i} className="bg-white hover:shadow-md overflow-hidden rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1 relative">
            <div className="h-32 sm:h-40 bg-gray-200 relative overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {product.salePrice < product.price && (
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                  SALE
                </div>
              )}
            </div>
            <div className="p-2 sm:p-3">
              <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-0.5 truncate">{product.name}</h3>
              <div className="flex justify-between items-center mb-1">
                <p className="text-blue-600 font-semibold text-xs sm:text-sm">₹{product.salePrice.toFixed(2)}</p>
                {product.salePrice < product.price && (
                  <p className="text-gray-500 line-through text-xs">₹{product.price.toFixed(2)}</p>
                )}
              </div>
              <div className="flex items-center mb-1 sm:mb-2">
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, i) => 
                    i < Math.round(product.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
                <span className="text-gray-600 text-xs ml-1">({product.reviews})</span>
              </div>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-semibold py-2 px-2 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center">
                <FaShoppingCart className="mr-1" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}
