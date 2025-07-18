import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/axiosInstance";
import { useAuth } from "../context/useAuth";
import { NavLink } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashBoard = () => {
  const { token } = useAuth();
  const [dashboardData, setDashBoardData] = useState();
  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    axiosInstance(token)
      .get(`dashboard/statistics/`)
      .then((res) => {
        setDashBoardData(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h2>Dashboard</h2>
      <div>
        <div>
          <span>Enhanced : </span>
          <span>{dashboardData?.enhancedProducts}</span>
        </div>
        <div>
          <span>Failed : </span>
          <span>{dashboardData?.failedProducts}</span>
        </div>
        <div>
          <span>Pending : </span>
          <span>{dashboardData?.pendingProducts}</span>
        </div>
        <div>
          <span>Total : </span>
          <span>{dashboardData?.totalProducts}</span>
        </div>
        <div>
          <span>Percentage Changes : {'{'}</span>
            <span> enhanced Products :</span><span>{dashboardData?.percentageChanges.enhancedProducts}</span>
            <span> , Pending Products :</span><span>{dashboardData?.percentageChanges.pendingProducts}</span>
            <span> , failed Products :</span><span>{dashboardData?.percentageChanges.failedProducts}</span> {'}'}
        </div>
      </div>
      <SideBar/>
    </>
  );
};

export default DashBoard;
