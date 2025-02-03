import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className='w-64 min-h-full bg-orange-400'>
                <ul className='menu'>
                    <li><NavLink to="/dashboard/cart">My cart</NavLink></li>

                </ul>

            </div>

            <div>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;