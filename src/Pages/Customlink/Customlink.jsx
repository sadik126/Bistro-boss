import React from 'react';
import { NavLink } from 'react-router-dom';

const Customlink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "btn text-orange-700 font-bold border-b-2 border-orange-700 "
                    : " btn bg-transparent text-white border-none"
            }
        >
            {children}
        </NavLink>
    );
};

export default Customlink;