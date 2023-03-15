import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import Footer from "./footer-component";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
