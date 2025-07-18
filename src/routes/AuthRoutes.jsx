import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Index";
import Register from "../pages/register/Index";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AuthRoutes;
