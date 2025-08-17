import Styles from "./Navbar.module.css";

const Navbar = () => {
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
        <div>
          <i className="fa-regular fa-user"></i>
          &nbsp;
          <span>0</span>
        </div>
        <p>Total Feedback</p>
      </div>
    </div>
  );
};

export default Navbar;
