import React, { useContext, useEffect, useState } from "react";
import Styles from "./Auth.module.css"; // CSS Modules import
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(MyContext);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  function onChangeHandler(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const authHandler = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;
    try {
      setIsLoading(true);
      if (isLoginPage) {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setMessage(data.message);
      } else {
        const data = await registerUser({ name, username, email, password });
        if (data.status === 201) {
          toast.success(data?.data.message);
          setTimeout(() => {
            toast.success("please login to continue")
            navigate("/login");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Auth failed", error);
      setMessage(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
      setMessage("");
    }, 3000);
  }, [message]);

  return (
    <div className={Styles["signin-container"]}>
      <form className={Styles["signin-form"]} onSubmit={authHandler}>
        {message && (
          <p
            className={Styles.message}
            style={{ color: isError ? "red" : "green" }}
          >
            {message}
          </p>
        )}
        <h2>{isLoginPage ? "Sign in" : "Sign up"}</h2>
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

        <div className={Styles.divider}>
          <span>or</span>
        </div>

        <p className={Styles["signup-link"]}>
          Don't have an account?{" "}
          <a
            onClick={() => {
              {
                isLoginPage ? navigate("/register") : navigate("/login");
              }
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
