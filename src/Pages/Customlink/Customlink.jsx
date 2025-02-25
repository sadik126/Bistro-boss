import React from 'react';
import { NavLink } from 'react-router-dom';

const Customlink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "btn text-red-700 font-bold border-b-2 border-red-700 "
                    : " "
            }
        >
            {children}
        </NavLink>
    );
};

export default Customlink;