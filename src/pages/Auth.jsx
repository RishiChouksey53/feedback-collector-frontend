import React, { useContext, useEffect, useState } from "react";
import Styles from "./Auth.module.css"; // CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ScaleLoader } from "react-spinners";
import { loginUser, registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import { toast } from "react-toastify";

const Auth = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // toggle password
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [isError, setIsError] = useState(false); // error state
  const [message, setMessage] = useState(""); // success/error message
  const { setUser } = useContext(MyContext);

  // form values
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // update input values
  function onChangeHandler(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // handle login / register
  const authHandler = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;
    try {
      setIsLoading(true);
      if (isLoginPage) {
        // login
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        console.log(data);
        setUser(data.user);
        setMessage(data.message);
      } else {
        // register
        const data = await registerUser({ name, username, email, password });
        if (data.status === 201) {
          toast.success("Register successful, pease login to continue");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // clear error after 3s
  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
      setMessage("");
    }, 3000);
  }, [message]);

  return (
    <div className={Styles["signin-container"]}>
      <form className={Styles["signin-form"]} onSubmit={authHandler}>
        {/* show success or error message */}
        {message && (
          <p
            className={Styles.message}
            style={{ color: isError ? "red" : "green" }}
          >
            {message}
          </p>
        )}

        {/* form title */}
        <h2>{isLoginPage ? "Sign in" : "Sign up"}</h2>

        {/* only show name + username on signup */}
        {!isLoginPage && (
          <>
            <label>Name</label>
            <input
              onChange={onChangeHandler}
              name="name"
              type="text"
              placeholder="full name"
              value={formData.name}
              required
            />
            <label>Username</label>
            <input
              onChange={onChangeHandler}
              name="username"
              type="text"
              placeholder="username"
              value={formData.username}
              required
            />
          </>
        )}

        {/* email field */}
        <label>Email</label>
        <input
          onChange={onChangeHandler}
          name="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          required
          autoComplete="email"
        />

        {/* password field with show/hide */}
        <label>Password</label>
        <div className={Styles["password-wrapper"]}>
          <input
            onChange={onChangeHandler}
            type={showPassword ? "text" : "password"}
            placeholder="••••••"
            value={formData.password}
            name="password"
            required
            autoComplete="current-password"
          />
          <span
            className={Styles["toggle-password"]}
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className={Styles["signin-btn"]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ScaleLoader color="#fff" height={"1rem"} />
          ) : isLoginPage ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>

        {/* divider */}
        <div className={Styles.divider}>
          <span>or</span>
        </div>

        {/* link to switch between login/signup */}
        <p className={Styles["signup-link"]}>
          Don't have an account?{" "}
          <a
            onClick={() => {
              isLoginPage ? navigate("/register") : navigate("/login");
            }}
          >
            {!isLoginPage ? "Sign in" : "Sign up"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Auth;
