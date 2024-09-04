import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://gofood-backend-bfad.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const status = (await response).status;
    const json=await response.json();
    if (status === 400) {
      alert("enter correct credentials");
    } else if (status === 200) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    }
  };
  const onchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </>
  );
}
export default Login;
