import React from "react";

const Registercomponent = () => {
  return (
    <div className="register ">
      <div className=" container ">
        <form className="row g-3 rounded-3">
          <div className=" col-md-5 col-sm-8">
            <label for="username" className="form-label">
              username:
            </label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="col-md-5 col-sm-8">
            <label for="inputEmail4" className="form-label">
              Email:
            </label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-5 col-sm-8">
            <label for="inputPassword4" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="con">
            <button className="btn btn-primary">提交</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registercomponent;
