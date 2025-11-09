
import React from "react";
import Navber from "../components/Navber";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* Header */}
      <Navber />

      {/* Main Content */}
      <main className="p-4">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
