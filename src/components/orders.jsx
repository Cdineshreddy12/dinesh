import React from 'react';
import { FaShoppingBag, FaCheckCircle, FaTruck, FaClock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
// this is order component
const OrderStepper = ({ currentStep }) => {
  const steps = [
    { icon: FaShoppingBag, label: 'Ordered' },
    { icon: FaCheckCircle, label: 'Accepted' },
    { icon: FaTruck, label: 'Out for Delivery' },
    { icon: FaClock, label: 'Delivered' },
  ];

  return (
    <div className="w-full bg-gray-100 py-4 md:py-8 px-2 md:px-4">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/2 md:w-1/4 mb-4 md:mb-0">
            <div
              className={`rounded-full h-8 w-8 md:h-12 md:w-12 flex items-center justify-center transition-colors duration-500 ease-in-out ${
                currentStep >= index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
              }`}
            >
              <step.icon className="h-4 w-4 md:h-6 md:w-6" />
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-xs md:text-sm font-semibold transition-colors duration-500 ease-in-out ${
                  currentStep >= index ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-full hidden md:flex justify-between items-center">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-full transition-all duration-500 ease-in-out ${
              index < steps.length - 1 ? (currentStep > index ? 'bg-blue-500' : 'bg-gray-300') : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CurrentOrder = ({ order }) => (
  <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden transition-all duration-500 ease-in-out">
    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <h2 className="text-xl md:text-2xl font-bold text-white">Current Order</h2>
    </div>
    <div className="p-4 md:p-6">
      <p className="text-lg md:text-xl font-semibold mb-2">Order #{order.id}</p>
      <p className="text-sm md:text-base text-gray-600 mb-4">Expected Delivery: {order.expectedDelivery}</p>
      <OrderStepper currentStep={order.currentStep} />
    </div>
  </div>
);

const PreviousOrder = ({ order }) => (
  <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 ease-in-out">
    <div>
      <p className="text-base md:text-lg font-semibold">Order #{order.id}</p>
      <p className="text-xs md:text-sm text-gray-600">Delivered on {order.deliveryDate}</p>
    </div>
    <span className={`mt-2 md:mt-0 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold transition-all duration-500 ease-in-out ${
      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
    }`}>
      {order.status}
    </span>
  </div>
);

const OrdersComponent = () => {
  const currentOrder = {
    id: '12345',
    expectedDelivery: 'September 10, 2024',
    currentStep: 2 
  };

  const previousOrders = [
    { id: '12344', deliveryDate: 'September 1, 2024', status: 'Delivered' },
    { id: '12343', deliveryDate: 'August 25, 2024', status: 'Delivered' },
    { id: '12342', deliveryDate: 'August 15, 2024', status: 'Returned' },
  ];

  const isOpen = useSelector((state) => state.sidebar.side);
  const isMobile = useSelector((state) => state.responsive.isMobile);

  return (
    <div 
      className={`bg-gray-100 min-h-screen transition-all duration-500 ease-in-out py-6 md:py-12 px-4 sm:px-6 lg:px-8 ${
        isMobile ? 'w-full' : isOpen ? 'ml-[30%] w-[70%]' : 'ml-[5%] w-[95%]'
      }`}
    >
      <div className="max-w-3xl mx-auto transition-all duration-500 ease-in-out">

      <div className="relative w-full h-16 mt-24 mb-4 overflow-hidden rounded-xl">
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

        <CurrentOrder order={currentOrder} />
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Previous Orders</h2>
          </div>
          <div className="p-4 md:p-6">
            {previousOrders.map((order) => (
              <PreviousOrder key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;