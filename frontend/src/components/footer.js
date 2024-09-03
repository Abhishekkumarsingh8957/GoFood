import React from "react";
import { Link } from "react-router-dom";
function footer() {
  return (
    <div>
      <footer className="py-3 border-top">
        <p className="d-flex flex-wrap align-content-center justify-content-center">© 2024 GoFood, Inc</p>
        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        ></Link>
      </footer>
    </div>
  );
}
export default footer;
