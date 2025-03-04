import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import Useadmin from "../../Pages/Useadmin/Useadmin";
import Customlink from "../../Pages/Customlink/Customlink";
import { IoFastFood } from "react-icons/io5";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const [imageSrc, setImageSrc] = useState("");
  const [isAdmin] = Useadmin()
  const [isOpen, setIsOpen] = useState(false);
  useEffect(async () => {
    if (user?.photoURL) {
      await fetch(user.photoURL, { mode: "no-cors" })
        .then(() => setImageSrc(user.photoURL))
        .catch((err) => console.log("Image fetch failed", err));
    }
  }, [user]);
  const [cart] = Usecart()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navOptions = (
    <>
      <li>
        <Customlink to="/">
          {" "}
          <FaHouse></FaHouse> Home
        </Customlink>
      </li>

      <li>
        <Customlink to="/menu">
          {" "}
          <FaClipboardList /> Menu
        </Customlink>
      </li>
      {
        user && <li>
          <Customlink to="/order/salad">
            {" "}
            <FaBowlFood /> Order food
          </Customlink>
        </li>
      }
      {/* <li>
        <Link to="/order/salad">
          {" "}
          <FaBowlFood /> Order food
        </Link>
      </li> */}
      <li>
        <Customlink to="/dashboard/cart">
          {" "}
          <button>
            <FaCartShopping className="mr-2" />
            <div className="badge badge-secondary ">+{cart.length}</div>
          </button>
        </Customlink>
      </li>
      <li>
        {user ? (
          <button onClick={logOut}>
            {/* <button onClick={logOut} className="text-white">
              
            </button> */}
            <FaDoorClosed /> Logout
          </button>
        ) : (
          <Customlink to="/login">
            {" "}
            <FaDoorOpen /> Login
          </Customlink>
        )}
      </li>
      <li>
        {user && (
          <div className="avatar">
            <div className="w-8 rounded-full">
              {user?.photoURL !== null ? (
                <>
                  <img src={imageSrc} alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
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
    <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between py-3">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-widest flex">
          <IoFastFood />
          <span className="text-orange-700 ml-3">BISTRO </span> BOSS
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-lg">
          <Customlink to="/">
            <FaHouse /> Home
          </Customlink>
          <Customlink to="/menu">
            <FaClipboardList /> Menu
          </Customlink>
          {user && (
            <Customlink to="/order/salad">
              <FaBowlFood /> Order Food
            </Customlink>
          )}
          <Customlink to="/dashboard/cart">
            <FaCartShopping />
            <span className="ml-2 badge badge-secondary">{cart.length}</span>
          </Customlink>
          {user ? (
            <button onClick={logOut} className="flex items-center">
              <FaDoorClosed /> Logout
            </button>
          ) : (
            <Customlink to="/login">
              <FaDoorOpen /> Login
            </Customlink>
          )}
        </ul>

        {/* User Avatar */}
        {user && (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            {user.photoURL ? (
              <img src={imageSrc} alt="User Profile" className="w-full h-full object-cover" />
            ) : (
              <FaCircleUser className="w-full h-full text-gray-300" />
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white text-2xl">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="bg-black/90 py-4 space-y-3 text-center flex flex-col items-center lg:hidden">
          <Customlink to="/" onClick={toggleMenu}>
            <FaHouse /> Home
          </Customlink>
          <Customlink to="/menu" onClick={toggleMenu}>
            <FaClipboardList /> Menu
          </Customlink>
          {user && (
            <Customlink to="/order/salad" onClick={toggleMenu}>
              <FaBowlFood /> Order Food
            </Customlink>
          )}
          <Customlink to="/dashboard/cart" onClick={toggleMenu}>
            <FaCartShopping />
            <span className="ml-2 badge badge-secondary">{cart.length}</span>
          </Customlink>
          {user ? (
            <button onClick={logOut} className="flex items-center">
              <FaDoorClosed /> Logout
            </button>
          ) : (
            <Customlink to="/login" onClick={toggleMenu}>
              <FaDoorOpen /> Login
            </Customlink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navber;
