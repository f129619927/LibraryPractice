import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Registercomponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  let handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  let handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  let handleRegister = (e) => {
    e.preventDefault();
    AuthService.register(username, email, password)
      .then(() => {
        console.log("註冊成功");
        alert("註冊成功,將導入登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };
  return (
    <div className="register">
      <div className=" container ">
        {message && <div className="alert alert-danger message">{message}</div>}
        <form className="row g-3 rounded-3">
          <div className=" col-md-5 col-sm-8">
            <label for="username" className="form-label">
              username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={handleChangeUsername}
            />
          </div>
          <div className="col-md-5 col-sm-8">
            <label for="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
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
            <button
              className="btn btn-primary noDefault"
              onClick={handleRegister}
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registercomponent;
