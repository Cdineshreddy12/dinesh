import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaShoppingBasket, FaTruck, FaClock, FaEdit, FaTrash, FaSearch, FaChevronDown } from 'react-icons/fa';


// admin panel component
const OrderStatus = ({ status }) => {
  const statusConfig = {
    0: { icon: FaClock, label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    1: { icon: FaShoppingBasket, label: 'Preparing', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    2: { icon: FaTruck, label: 'Out for Delivery', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    3: { icon: FaCheckCircle, label: 'Delivered', color: 'text-green-600', bgColor: 'bg-green-100' },
  };

  const { icon: Icon, label, color, bgColor } = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${color} ${bgColor} py-1 px-3 rounded-full text-sm font-medium`}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  );
};

const StatusUpdateDropdown = ({ currentStatus, onStatusUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Preparing' },
    { value: 2, label: 'Out for Delivery' },
    { value: 3, label: 'Delivered' },
  ];

  const handleStatusChange = (newStatus) => {
    onStatusUpdate(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          Update Status
          <FaChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className={`${
                  currentStatus === status.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const OrderTable = ({ orders, onStatusUpdate, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
    <table className="w-full table-auto text-left">
      <thead>
        <tr className="bg-gray-100">
          {["Order ID", "Customer", "Status", "Date", "Total", "Actions"].map((head) => (
            <th key={head} className="border-b border-gray-200 p-4">
              <span className="text-sm font-semibold text-gray-700 uppercase">
                {head}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map(({ id, customer, status, date, total }) => (
          <tr key={id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
            <td className="p-4">
              <span className="text-sm font-medium text-gray-900">
                {id}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm text-gray-700">
                {customer.name}
              </span>
            </td>
            <td className="p-4">
              <OrderStatus status={status} />
            </td>
            <td className="p-4">
              <span className="text-sm text-gray-700">
                {new Date(date).toLocaleDateString()}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-medium text-gray-900">
                ${Number(total).toFixed(2)}
              </span>
            </td>
            <td className="p-4">
              <div className="flex gap-2">
                <StatusUpdateDropdown
                  currentStatus={status}
                  onStatusUpdate={(newStatus) => onStatusUpdate(id, newStatus)}
                />
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition duration-150 ease-in-out"
                  onClick={() => onEdit(id)}
                >
                  <FaEdit className="h-4 w-4" />
                </button>
                <button 
                  className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition duration-150 ease-in-out"
                  onClick={() => onDelete(id)}
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminOrderPanel = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmOrder, setDeleteConfirmOrder] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    setOrders(generateSampleOrders(100));
  }, []);

  const filterOrders = (orders) => 
    orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusUpdate = (orderId, newStatus) => {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    };

  const handleEdit = (orderId) => {
    const orderToEdit = orders.find(order => order.id === orderId);
    setEditingOrder(orderToEdit);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    const updatedOrders = orders.map(order => 
      order.id === editingOrder.id ? editingOrder : order
    );
    setOrders(updatedOrders);
    setIsEditDialogOpen(false);
    setEditingOrder(null);
  };

  const handleDelete = (orderId) => {
    const orderToDelete = orders.find(order => order.id === orderId);
    setDeleteConfirmOrder(orderToDelete);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedOrders = orders.filter(order => order.id !== deleteConfirmOrder.id);
    setOrders(updatedOrders);
    setIsDeleteDialogOpen(false);
    setDeleteConfirmOrder(null);
  };

  const todayOrders = filterOrders(orders.filter(order => {
    const orderDate = new Date(order.date);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  }));

  const pendingOrders = filterOrders(orders.filter(order => order.status === 0));
  const preparingOrders = filterOrders(orders.filter(order => order.status === 1));
  const outForDeliveryOrders = filterOrders(orders.filter(order => order.status === 2));
  const deliveredOrders = filterOrders(orders.filter(order => order.status === 3));

  return (
    <div className="min-h-screen ">
      <div className=" bg-gradient-to-r w-[50%]  mx-auto rounded-full from-green-400 to-blue-500 py-4 px-4 my-8 sm:px-6 lg:px-8">
        <h1 className="text-white  text-4xl font-bold text-center">Grocery Order Management</h1>
      </div>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg">
                {['Today\'s Orders', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered'].map((tab, index) => (
                  <button
                    key={tab}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition duration-150 ease-in-out ${
                      activeTab === ['today', 'pending', 'preparing', 'out-for-delivery', 'delivered'][index]
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(['today', 'pending', 'preparing', 'out-for-delivery', 'delivered'][index])}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              {activeTab === 'today' && <OrderTable orders={todayOrders} onStatusUpdate={handleStatusUpdate} onEdit={handleEdit} onDelete={handleDelete} />}
              {activeTab === 'pending' && <OrderTable orders={pendingOrders} onStatusUpdate={handleStatusUpdate} onEdit={handleEdit} onDelete={handleDelete} />}
              {activeTab === 'preparing' && <OrderTable orders={preparingOrders} onStatusUpdate={handleStatusUpdate} onEdit={handleEdit} onDelete={handleDelete} />}
              {activeTab === 'out-for-delivery' && <OrderTable orders={outForDeliveryOrders} onStatusUpdate={handleStatusUpdate} onEdit={handleEdit} onDelete={handleDelete} />}
              {activeTab === 'delivered' && <OrderTable orders={deliveredOrders} onStatusUpdate={handleStatusUpdate} onEdit={handleEdit} onDelete={handleDelete} />}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Order Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Order</h2>
            {editingOrder && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={editingOrder.customer.name}
                    onChange={(e) => setEditingOrder({...editingOrder, customer: {...editingOrder.customer, name: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={editingOrder.customer.email}
                    onChange={(e) => setEditingOrder({...editingOrder, customer: {...editingOrder.customer, email: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                  <input
                    type="date"
                    value={new Date(editingOrder.date).toISOString().split('T')[0]}
                    onChange={(e) => setEditingOrder({...editingOrder, date: new Date(e.target.value).toISOString()})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                  <input
                    type="number"
                    value={editingOrder.total}
                    onChange={(e) => setEditingOrder({...editingOrder, total: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={() => setIsEditDialogOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out">Cancel</button>
              <button onClick={handleEditSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
            <p className="mb-6 text-lg text-gray-600">Are you sure you want to delete order {deleteConfirmOrder?.id}?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsDeleteDialogOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150 ease-in-out">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to generate sample orders
const generateSampleOrders = (count) => {
    const sampleOrders = [];
    const statuses = [0, 1, 2, 3];
    const customers = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
      { name: "Bob Johnson", email: "bob@example.com" },
      { name: "Alice Brown", email: "alice@example.com" },
      { name: "Charlie Wilson", email: "charlie@example.com" }
    ];
  
    for (let i = 1; i <= count; i++) {
      const randomDate = new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000); // Random date within the last week
      sampleOrders.push({
        id: `ORD${String(i).padStart(3, '0')}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: randomDate.toISOString(),
        total: (Math.random() * 100 + 20).toFixed(2), // Random total between $20 and $120
      });
    }
    return sampleOrders;
  };
  
  export default AdminOrderPanel;