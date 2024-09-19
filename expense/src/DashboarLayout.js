import React from "react";
import MainHeader from "./Components/Header/MainHeader";
import Footer from "./Components/Footer/Footer";
import TopPage1 from "./Components/LogDash/Page1/TopPage1";
import { Outlet } from "react-router";
import ChatbotIcon from "./Components/AI/chatboat"
function DashboardLayout() {
  return (
      <>
      <MainHeader/>
      <TopPage1/>
      <Outlet/>
      <Footer/>
      <ChatbotIcon/>
      </>
  );
}

export default DashboardLayout;
