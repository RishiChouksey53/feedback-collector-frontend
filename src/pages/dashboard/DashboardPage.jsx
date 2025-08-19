import React, { useContext } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import Styles from "./DashboardPage.module.css";
import { MyContext } from "../../MyContext";

const DashboardPage = () => {
  const { user } = useContext(MyContext);
  console.log(user);
  return (
    <div className={Styles.mainContainer}>
      {user?.role === "admin" ? (
        <div className={Styles.adminContainer}>
          <AdminDashboard />
        </div>
      ) : (
        <div className={Styles.userContainer}>
          <UserDashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
