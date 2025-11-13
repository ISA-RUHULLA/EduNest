
import React from "react";
import Navber from "../components/Navber";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div  className="max-w-[1440px] mx-auto bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <Navber />

      {/* Main Content */}
      <main className="p-2">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
