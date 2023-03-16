import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginService from "../services/googleLogin.service";
import AuthService from "../services/auth.service";
const Logincomponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(email, password)
      .then((data) => {
        console.log(data.data);
        navigate("/");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };
  const handleGoogleLogin = () => {
    GoogleLoginService.googleLogin()
      .then(() => {
        console.log("google");
      })
      .catch((e) => {
        console.log("googleerror");
        console.log(e);
      });
  };
  return (
    <div className="login">
      <div className=" container">
        {message && <div className="alert alert-danger message">{message}</div>}
        <form className="row g-3 rounded-3">
          <div className="col-md-5 col-sm-8">
            <label for="username" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="username"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="col-md-5 col-sm-8">
            <label for="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChangePassword}
            />
          </div>
          <div className="con">
            <button className="btn btn-primary " onClick={handleLogin}>
              登入
            </button>
          </div>
          <div className="google">
            <Link
              className="btn btn-warning googleLink"
              onClick={handleGoogleLogin}
            >
              <i className="bi bi-google"></i>google登入
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logincomponent;
