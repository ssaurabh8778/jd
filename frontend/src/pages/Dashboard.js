import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../componets/Header";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Header />
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
          Dashboard
        </h1>
        <h1 className="text-center text-xl font-bold text-gray-600 mb-6">
          Welcome <strong>{user.firstName}</strong>!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
