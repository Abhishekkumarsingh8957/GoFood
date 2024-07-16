import React from "react";
import { Link } from "react-router-dom";
function footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="align-content-center">© 2024 GoFood, Inc</p>

        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        ></Link>
      </footer>
    </div>
  );
}
export default footer;
