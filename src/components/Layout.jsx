// components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      
      {/* Main content area with permanent left margin for sidebar */}
      <div 
        className="ml-60" 
        style={{ paddingTop: '80px' }} // Add padding to account for fixed navbar
      >
        <div className="p-6">
          <Outlet /> {/* This will render the matched route component */}
        </div>
      </div>
    </div>
  );
};

export default Layout;