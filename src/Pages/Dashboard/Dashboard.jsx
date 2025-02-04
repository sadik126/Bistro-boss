import React from 'react';
import { FaCalendarCheck, FaCalendarDays, FaCartPlus, FaComment, FaHouseUser, FaSearchengin } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex'>
            <div className='w-64  min-h-screen bg-orange-400'>
                <ul className='menu p-4'>
                <li><NavLink to="/dashboard/home"> <FaHouseUser />UserHome</NavLink></li>
                    <li><NavLink to="/dashboard/cart"> <FaCartPlus /> My cart</NavLink></li>
                    <li><NavLink to="/dashboard/reservation"> <FaCalendarDays /> My cart</NavLink></li>
                    <li><NavLink to="/dashboard/addreview"> <FaComment /> Add review</NavLink></li>
                    <li><NavLink to="/dashboard/mybooking"> <FaCalendarCheck /> My booking</NavLink></li>

                    <div className="divider divider-neutral"></div>

                    <li><NavLink to="/"> <FaHouseUser />Home</NavLink></li>
                    <li><NavLink to="/dashboard/menu"> <FaSearchengin />Menu</NavLink></li>



                </ul>

            </div>

            <div style={{
      display: "flex",
      flexDirection:"column",
      gap:'2rem',
      justifyContent: "center",
      alignItems: "stretch",
      height: "100vh", // Full height to center vertically
      width: "100%", // Full width to center horizontally
    }} className='flex-1 mt-10'>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;