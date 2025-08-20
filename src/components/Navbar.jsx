import { useContext } from "react";
import Styles from "./Navbar.module.css";
import { MyContext } from "../MyContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(MyContext);
  return (
    <div className={Styles.navBar}>
      <div className={Styles.navLeft}>
        <div className={Styles.navLeftIcon}>
          <i className="fa-regular fa-message"></i>
        </div>
        <div>
          <h2>Feedback Collector</h2>
          <p>manage user feedback</p>
        </div>
      </div>
      <div className={Styles.navRight}>
        {/* <div>
          <i className="fa-regular fa-user"></i>
          &nbsp;
          <span>{count}</span>
        </div>
        <p>Total Feedback</p> */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
          }
        >
          Home
        </NavLink>
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
        {location.pathname !== "/login" && !user && (
          <NavLink
            className={({ isActive }) =>
              `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
            }
            to={"/login"}
          >
            Login
          </NavLink>
        )}
        {location.pathname === "/login" && (
          <NavLink
            className={({ isActive }) =>
              `${Styles.navLink} ${isActive ? Styles.isActive : ""}`
            }
            to={"/register"}
          >
            SignUp
          </NavLink>
        )}
        {user && (
          <>
            <NavLink
              onClick={() => {
                setUser(null);
                navigate("/")
                localStorage.removeItem("token");
                toast.success("Logout successfully! ");
              }}
              className={Styles.navLink}
              to={""}
            >
              Logout
            </NavLink>
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
