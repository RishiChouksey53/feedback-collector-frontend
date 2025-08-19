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
          <span>0</span>
        </div>
        <p>Total Feedback</p> */}
        <button className="secondaryButton"
          onClick={() => {
            navigate("/");
          }}
        >
          <i class="fa fa-home" aria-hidden="true"></i>
        </button>
        {location.pathname !== "/login" &&
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
          ))}
      </div>
    </div>
  );
};

export default Navbar;
