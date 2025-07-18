import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <NavLink to="/catalogs">Catalogs</NavLink> <span>&nbsp;&nbsp;&nbsp;</span>
      <NavLink to="/products">Products</NavLink><span>&nbsp;&nbsp;&nbsp;</span>
      <NavLink to="/users">Users</NavLink><span>&nbsp;&nbsp;&nbsp;</span>
      <NavLink to="/activities">Activities</NavLink><span>&nbsp;&nbsp;&nbsp;</span>
      <NavLink to="/notifications">Notifications</NavLink><span>&nbsp;&nbsp;&nbsp;</span>
      <NavLink to="/aigrouprules">Ai Group Rules</NavLink><span>&nbsp;&nbsp;&nbsp;</span>
      <NavLink to="/airule">Ai Rules</NavLink><span>&nbsp;&nbsp;&nbsp;</span>

    </div>
  );
};

export default SideBar;
