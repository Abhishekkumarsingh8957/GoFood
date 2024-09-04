import React ,{useState}from "react";
import { Link , useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";
function Navbar() {
  let data = useCart();
  const navigate=useNavigate();
  const [cartView, setCartView] = useState(false)
  const handelLogout=()=>{
   localStorage.removeItem("authToken");
   navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
             
             {localStorage.getItem("authToken")
             ?
             <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">
                  My Order
                </Link>
              </li>
              :<div></div>
             }

            </ul>
            {!localStorage.getItem("authToken") ? 
            <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">
                  SignUp
                </Link>
            </div>
            :
            <div>
            <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>My Cart {" "}
         {data.length}
            </div>
            {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
            <div className="btn bg-white text-danger mx-2" onClick={handelLogout}>Logout</div>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
