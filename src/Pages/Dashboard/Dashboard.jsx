import React, { useState } from 'react';
import { FaAmazonPay, FaCalendarCheck, FaCalendarDays, FaCartPlus, FaComment, FaHouseUser, FaSearchengin } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { IoIosContacts } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import { IoIosMenu } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { use } from 'react';
import Useadmin from '../Useadmin/Useadmin';
import Loading from '../Loading/Loading';


const Dashboard = () => {
    const [isAdmin, isAdminloading] = Useadmin();
    const [isOpen, setIsOpen] = useState(false);

    if (isAdminloading) {
        return <Loading></Loading>
    }
    console.log(isAdmin)
    return (
        <div className="flex-none lg:flex">
            {/* Button for Small Screens */}
            <button
                className="lg:hidden fixed top-4 left-4 bg-orange-500 text-white p-2 rounded-md z-50"
                onClick={() => setIsOpen(true)}
            >
                ☰ Menu
            </button>

            {/* Sidebar (Drawer) */}
            <div
                className={`min-h-[126vh] lg:min-h-screen fixed lg:static top-0 left-0 w-64  bg-orange-400 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 lg:translate-x-0 z-40`}
            >
                {/* Close Button (Small Screens) */}
                <button
                    className="lg:hidden absolute top-4 right-4 text-white text-2xl"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>

                <div className="font-extrabold text-center py-4">
                    <h2 className="text-4xl">Bistro Boss</h2>
                    <p>Restaurant</p>
                </div>

                <ul className="menu p-4 space-y-2">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/adminhome"><FaHouseUser /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/additems"><ImSpoonKnife /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageitems"><IoIosMenu /> Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/managebookings"><FaBook /> Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/manageusers"><FaUsers /> Manage Users</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userhome"><FaHouseUser /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/mybooking"><FaCalendarCheck /> My Booking</NavLink></li>
                            <li><NavLink to="/dashboard/addreview"><FaComment /> Add Review</NavLink></li>
                        </>
                    )}

                    <div className="divider divider-neutral"></div>

                    <li><NavLink to="/"><FaHouseUser /> Home</NavLink></li>
                    <li><NavLink to="/menu"><FaSearchengin /> Menu</NavLink></li>
                    <li><NavLink to="/dashboard/contact"><IoIosContacts /> Contact</NavLink></li>
                    <li><NavLink to="/dashboard/cart"><FaCartPlus /> My Cart</NavLink></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 mt-10 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;