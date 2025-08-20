import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import Styles from "./Profile.module.css";
const Profile = () => {
  const { user } = useContext(MyContext);
  return (
    <div className={`${Styles.profileContainer}`}>
      <p>
        <i className="fa-regular fa-user"></i> {user?.name} <br />
        <span>@{user?.username}</span>
      </p>

      <p>
        <i className="fa-regular fa-envelope"></i> {user?.email}
      </p>
    </div>
  );
};

export default Profile;
