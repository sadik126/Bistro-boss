import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Pages/Authprovider/Authprovider";
import {
  FaBowlFood,
  FaCartShopping,
  FaCircleUser,
  FaClipboardList,
  FaDoorClosed,
  FaDoorOpen,
  FaHouse,
} from "react-icons/fa6";
import Usecart from "../../Pages/Usecart/Usecart";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = Usecart()
  const navOptions = (
    <>
      <li>
        <Link to="/">
          {" "}
          <FaHouse></FaHouse> Home
        </Link>
      </li>

      <li>
        <Link to="/menu">
          {" "}
          <FaClipboardList /> Menu
        </Link>
      </li>
      <li>
        <Link to="/order/salad">
          {" "}
          <FaBowlFood /> Order food
        </Link>
      </li>
      <li>
        <Link to="/dashboard/cart">
          {" "}
          <button>
            <FaCartShopping className="mr-2" />
            <div className="badge badge-secondary ">+{cart.length}</div>
          </button>
        </Link>
      </li>
      <li>
        {user ? (
          <button onClick={logOut}>
            {/* <button onClick={logOut} className="text-white">
              
            </button> */}
            <FaDoorClosed /> Logout
          </button>
        ) : (
          <Link to="/login">
            {" "}
            <FaDoorOpen /> Login
          </Link>
        )}
      </li>
      <li>
        {user && (
          <div className="avatar">
            <div className="w-8 rounded-full">
              {user?.photoURL !== null ? (
                <>
                  <img src={user?.photoURL} alt="" />
                </>
              ) : (
                <>
                  <FaCircleUser style={{ width: "30px", height: "30px" }} />
                </>
              )}
              {/* <img src={user?.photoURL} alt="" /> */}
              {/* {console.log(user)} */}
            </div>
          </div>
        )}
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">BISTRO BOSS</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{navOptions}</ul>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
      </div>
    </div>
  );
};

export default Navber;
