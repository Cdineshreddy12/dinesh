import React from 'react';
import { FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
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
  const { activeCategory } = useSelector((state) => state.category);

  const filteredProducts = activeCategory === "All Categories"
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <main className={`${!isOpen ? 'w-[95%] ml-[5%]' : 'w-3/4 ml-[25%]'} mt-[10%] p-4 z-[0] transition-all duration-500 overflow-y-auto`}>
          <div className="relative w-full h-24 mb-8 overflow-hidden rounded-2xl">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 animate-gradient-x"></div>
          
          {/* Frosted glass effect container */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-20 flex items-center justify-center">
            {/* Content */}
            <div className="text-center z-10">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {activeCategory}
              </h2>
              <div className="w-24 h-1 bg-white mx-auto rounded-full shadow-lg"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 bg-opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-md"></div>
          </div>
          
          {/* Enhanced continuous shimmering effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer-continuous"></div>
          </div>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, i) => (
          <div key={i} className="bg-white hover:shadow-lg overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 relative">
            <div className="h-48 bg-gray-200 relative overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {product.salePrice < product.price && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  SALE
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm text-gray-800 mb-1 truncate">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-blue-600 font-semibold">₹{product.salePrice.toFixed(2)}</p>
                {product.salePrice < product.price && (
                  <p className="text-gray-500 line-through text-sm">₹{product.price.toFixed(2)}</p>
                )}
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => 
                    i < Math.round(product.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
                <span className="text-gray-600 text-xs ml-1">({product.reviews})</span>
              </div>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}