import React, { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";

const Cart = () => {
  const isOpen = useSelector((state) => state.sidebar.side);
  const isMobile = useSelector((state) => state.responsive.isMobile);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "product-1", price: 199.99, quantity: 2, stock: 5, img: "https://www.jiomart.com/images/product/original/490373600/bingo-achaari-masti-mad-angles-66-g-product-images-o490373600-p490373600-0-202211081536.jpg?im=Resize=(360,360)" },
    { id: 2, name: "product-2", price: 79.99, quantity: 1, stock: 0, img: "https://www.jiomart.com/images/product/original/491696354/lay-s-american-style-cream-onion-potato-chips-90-g-product-images-o491696354-p590121272-0-202307142033.jpg?im=Resize=(360,360)" },
    { id: 3, name: "product-3", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/491551827/bingo-original-style-chilli-sprinkled-potato-chips-90-g-product-images-o491551827-p491551827-0-202308291300.jpg?im=Resize=(360,360)" },
    { id: 4, name: "product-4", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/rv7nkbqfuf/ritebite-max-protein-chinese-manchurian-protein-chips-pack-of-3-120g-each-product-images-orv7nkbqfuf-p594396969-0-202406280835.jpg?im=Resize=(360,360)" },
    { id: 5, name: "product-5", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/491335169/bikaji-soya-sticks-200-g-product-images-o491335169-p590033097-0-202203152214.jpg?im=Resize=(360,360)" },
    { id: 6, name: "product-6", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/490655155/chheda-s-yellow-banana-chips-170-g-product-images-o490655155-p590086933-0-202307142035.jpg?im=Resize=(360,360)" },
    { id: 7, name: "product-7", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/491696355/lay-s-india-s-magic-masala-potato-chips-90-g-product-images-o491696355-p590121911-0-202307142035.jpg?im=Resize=(360,360)" },
    { id: 8, name: "product-8", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/rvvyl3927h/btw-navratan-mix-namkeen-1kg-product-images-orvvyl3927h-p606421229-0-202311301151.jpg?im=Resize=(360,360)" },
    { id: 9, name: "product-9", price: 349.99, quantity: 1, stock: 3, img: "https://www.jiomart.com/images/product/original/490842548/haldiram-s-nagpur-lite-chiwda-200-g-product-images-o490842548-p490842548-0-202211091754.jpg?im=Resize=(360,360)" },
  ]);


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.quantity + change, item.stock)) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handlePayment = () => {
    alert("Proceeding to payment...");
  };

  return (
    <div className={`container mx-auto p-4 md:p-6 transition-all duration-500 ease-in-out ${
      isMobile ? "mt-20" : isOpen ? "max-w-[70%] ml-[30%] mt-28" : "w-[90%] ml-[5%] mt-28"
    }`}>

      <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 animate-gradient-x"></div>
          
          {/* Frosted glass effect container */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-20 flex items-center justify-center">
            {/* Content */}
            <div className="text-center z-10">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                   Your Orders
              </h2>
              <div className="w-24 h-1 bg-white mx-auto rounded-full shadow-lg"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 bg-white bg-opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 bg-opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-md"></div>
          </div>
          
          {/* Enhanced continuous shimmering effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer-continuous"></div>
          </div>
        </div>


      {cartItems.length === 0 ? (
        <div className="bg-red-100 p-4 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
          <div>
            <h3 className="text-base md:text-lg font-semibold">Your cart is empty</h3>
            <p className="text-sm md:text-base text-gray-600">Add some items to your cart to get started.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={item.img} alt={item.name} className="w-32 h-32 md:w-32 h-48 md:h-32 object-cover md:rounded-l-lg" />
              <div className="flex-grow p-4 w-full">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${item.quantity === 1 && "opacity-50 cursor-not-allowed"}`}
                    disabled={item.quantity === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ${item.quantity === item.stock && "opacity-50 cursor-not-allowed"}`}
                    disabled={item.quantity === item.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className={`mt-2 ${item.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <div className="p-4 flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:w-auto">
                <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors mt-2 md:mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 md:mt-8 bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg md:text-xl font-semibold">Total:</span>
            <span className="text-xl md:text-2xl font-bold">${calculateTotal()}</span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 mb-16 text-white py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;