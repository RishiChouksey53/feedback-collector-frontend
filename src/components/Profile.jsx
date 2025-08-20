import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import Styles from "./Profile.module.css";

const Profile = () => {
  // Accessing the user object from global context
  const { user } = useContext(MyContext);

  return (
    <div className={`${Styles.profileContainer}`}>
      {/* Displaying user's name and username */}
      <p>
        <i className="fa-regular fa-user"></i> {user?.name} <br />
        <span>@{user?.username}</span>
      </p>

      {/* Displaying user's email */}
      <p>
        <i className="fa-regular fa-envelope"></i> {user?.email}
      </p>
    </div>
  );
};

export default Profile;
