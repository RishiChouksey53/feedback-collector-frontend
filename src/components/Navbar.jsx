import { useContext } from "react";
import Styles from "./Navbar.module.css";
import { MyContext } from "../MyContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
        {/* {location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          (user ? (
            <button
              onClick={() => {
                setUser(null);
              }}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </button>
          ))} */}
        <Link className={Styles.navLink} to={"/"}>
          Home
        </Link>
        {user?.role === "admin" && (
          <Link className={Styles.navLink} to={"/adminPanel"}>
            Admin Panel
          </Link>
        )}
        {location.pathname !== "/login" && !user && (
          <Link className={Styles.navLink} to={"/login"}>
            Login
          </Link>
        )}
        {location.pathname === "/login" && (
          <Link className={Styles.navLink} to={"/register"}>
            SignUp
          </Link>
        )}
        {user && (
          <>
            <Link
              onClick={() => {
                setUser(null);
              }}
              className={Styles.navLink}
              to={""}
            >
              Logout
            </Link>
            <Link className={Styles.navLink} to={""}>
              Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
