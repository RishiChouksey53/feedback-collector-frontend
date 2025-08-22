import { useContext } from "react";
import Styles from "./Navbar.module.css";
import { MyContext } from "../MyContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Navbar component
 * Renders the top navigation bar with links and user actions
 */
const Navbar = () => {
  // React Router hooks
  const navigate = useNavigate(); // for redirecting programmatically
  const location = useLocation(); // to check current route

  // Get user state from context
  const { user, setUser } = useContext(MyContext);

  return (
    <div className={Styles.navBar}>
      {/* Left side - App Logo and title */}
      <div
        className={Styles.navLeft}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className={Styles.navLeftIcon}>
          <i className="fa-regular fa-message"></i>
        </div>
        <div>
          <h2>Feedback Collector</h2>
          <p>manage user feedback</p>
        </div>
      </div>

      {/* Right side - Navigation links */}
      <div className={Styles.navRight}>
        {/* Home link (always visible) */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
          }
        >
          Home
        </NavLink>

        {/* Admin panel link - only visible if user is admin */}
        {user?.role === "admin" && (
          <NavLink
            className={({ isActive }) =>
              `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
            }
            to={"/admin"}
          >
            Admin&nbsp;Panel
          </NavLink>
        )}

        {!user && (
          <>
            <NavLink
              className={({ isActive }) =>
                `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
              }
              to={"/login"}
            >
              Login
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
              }
              to={"/register"}
            >
              SignUp
            </NavLink>
          </>
        )}

        {/* When user is logged in - show Logout and Profile */}
        {user && (
          <>
            {/* Logout button */}
            <NavLink
              onClick={() => {
                setUser(null); // clear user state
                navigate("/"); // go to homepage
                localStorage.removeItem("token"); // remove token
                toast.success("Logout successfully! ", { autoClose: 1000 }); // show toast
              }}
              className={Styles.navLink}
              to={""}
            >
              Logout
            </NavLink>

            {/* Profile link */}
            <NavLink
              className={({ isActive }) =>
                `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
              }
              to={"/profile"}
            >
              Profile
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
