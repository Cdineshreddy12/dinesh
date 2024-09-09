import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaLock, FaEnvelope } from "react-icons/fa";
import signupImage from '../assets/signup.jpeg';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Registering', formData);
    navigate('/dashboard');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '' });
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={signupImage} alt="Sign up" className="w-[150px] mx-auto h-[150px] my-2 rounded-full object-cover" />
            <div className="p-6">
              <h2 className="text-center text-[#4F46E5] text-2xl font-extrabold text-gray-900 mb-4">
                {isLogin ? 'Login' : 'Register'}
              </h2>
              <p className="text-center text-xs text-gray-600 mb-6">
                Welcome to Student Provision Store
              </p>
              <FormContent 
                isLogin={isLogin}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                toggleForm={toggleForm}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${signupImage})` }}></div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="relative w-full h-[500px] overflow-hidden">
            <div className={`absolute top-10 left-0 w-full h-full transition-all duration-500 ease-in-out ${isLogin ? 'translate-y-0' : '-translate-y-full'}`}>
               <h2 className="text-center text-[#4F46E5] text-2xl font-extrabold text-[#4F46E5] mb-4">
                  Login
                </h2>
              <FormContent 
                isLogin={true} 
                formData={formData} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                toggleForm={toggleForm}
              />
            </div>
            <div className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${isLogin ? 'translate-y-full' : 'translate-y-0'}`}>
                <h2 className="text-center text-[#4F46E5] text-2xl font-extrabold text-[#4F46E5] mb-4">
                  Register
                </h2>
              <FormContent 
                isLogin={false} 
                formData={formData} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                toggleForm={toggleForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormContent = ({ isLogin, formData, handleChange, handleSubmit, toggleForm }) => (
  <div className="bg-white  p-6 rounded-xl shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <InputField
          icon={<FaRegUserCircle />}
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
      )}
      <InputField
        icon={<FaEnvelope />}
        type="email"
        name="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        icon={<FaLock />}
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </div>
    </form>
    <div className="text-center mt-4">
      <button 
        onClick={toggleForm} 
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  </div>
);

const InputField = ({ icon, type, name, placeholder, value, onChange }) => (
  <div className="relative">
    <span className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-800">
      {icon}
    </span>
    <input
      type={type}
      name={name}
      required
      className="appearance-none border border-2 rounded-md relative block w-full px-3 py-2 pl-10  border-indigo-300 placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-indigo-700 focus:border-indigo-700 focus:z-10 text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default AuthForm;