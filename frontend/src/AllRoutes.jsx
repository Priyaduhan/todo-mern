import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
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
