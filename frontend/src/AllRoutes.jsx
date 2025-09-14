import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/Signup";
import Login from "./components/Login";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
