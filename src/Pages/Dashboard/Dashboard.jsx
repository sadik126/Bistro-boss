import React from 'react';
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
    const [isAdmin , isAdminloading] = Useadmin();

    if(isAdminloading){
        return <Loading></Loading>
    }
    console.log(isAdmin)
    return (
        <div className='flex'>
         
            <div className='w-64  min-h-screen bg-orange-400'>
                <div className='font-extrabold'>
                <h2 className='text-center text-4xl'>Bistro Boss </h2>
                <p className='text-center'>Restaurent</p>

                </div>
            
                <ul className='menu p-4'>
                    {
                        isAdmin  ? <>
                         <li><NavLink to="/dashboard/adminhome"> <FaHouseUser />Admin Home</NavLink></li>
                    <li><NavLink to="/dashboard/additems"> <ImSpoonKnife /> Add Items</NavLink></li>
                    <li><NavLink to="/dashboard/manageitems"> <IoIosMenu /> Manage Items</NavLink></li>
                    <li><NavLink to="/dashboard/managebookings"> <FaBook /> Manage Bookings</NavLink></li>
                    <li><NavLink to="/dashboard/manageusers"> <FaUsers /> Manage Users</NavLink></li></> 
                    : <>
                         <li><NavLink to="/dashboard/home"> <FaHouseUser />UserHome</NavLink></li>
                    <li><NavLink to="/dashboard/cart"> <FaCartPlus /> My cart</NavLink></li>
                    <li><NavLink to="/dashboard/payment"> <FaAmazonPay /> Payment History</NavLink></li>
                    <li><NavLink to="/dashboard/addreview"> <FaComment /> Add review</NavLink></li>
                    <li><NavLink to="/dashboard/mybooking"> <FaCalendarCheck /> My booking</NavLink></li></>
                    }
               

                    <div className="divider divider-neutral"></div>

                    <li><NavLink to="/"> <FaHouseUser />Home</NavLink></li>
                    <li><NavLink to="/dashboard/menu"> <FaSearchengin />Menu</NavLink></li>
                    <li><NavLink to="/dashboard/contact"> <IoIosContacts />Contact</NavLink></li>



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