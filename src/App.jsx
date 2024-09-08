import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Login from './components/login.jsx'
import Register from './components/Register.jsx'
import HomePage from './components/HomePage.jsx'
import MainContent from './components/MainContent.jsx'
import Cart from './components/Cart.jsx'
import OrdersComponent from './components/orders.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminOrderPanel from './components/AdminPanel.jsx'
import AdminProductForm from './components/AdminProductForm.jsx'
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx'
export default function App() {

  function generateDummyOrders(count = 1000) {
    const statuses = [0, 1, 2]; // 0: Not Delivered, 1: Packed, 2: Delivered
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
    const generateRandomDate = (start, end) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
  
    const generateRandomPhone = () => {
      return `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    };
  
    const orders = [];
  
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      orders.push({
        id: `ORD-${String(i + 1).padStart(6, '0')}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: generateRandomDate(new Date(2023, 0, 1), new Date()).toISOString(),
        customer: {
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          phone: generateRandomPhone(),
        },
        total: Math.floor(Math.random() * 10000) / 100, // Random total between 0 and 100
      });
    }
    console.log(orders);
  
    return orders;
  }
  
  // Usage:
  const dummyOrders = generateDummyOrders();

  const router=createBrowserRouter([
    {
      path:'',element:<HomePage/>,
      children:[
        {
          index:true,element:<MainContent/>,
        },
        {
          path:'/cart',element:<Cart/>
        },
        {
          path:'/orders',element:<OrdersComponent/>
        }
      ]
    },
    {path:'/signup',element:<Register />},
    {path:'/admin',element:<AdminPanel order={dummyOrders} />},
    {
      path:'/adminDashboard',
      element:<AdminDashboard/>,
      children:[
        {
           index:true,
           element:<AdminOrderPanel  order={dummyOrders}/>
        },
        {
          path:'addProduct',
          element:<AdminProductForm/>
        },
        {
          path:'analytics',
          element:<AnalyticsDashboard/>
        }
      ]


    }
  ])
  return (
    <RouterProvider router={router}>
        
    </RouterProvider>
  )
}