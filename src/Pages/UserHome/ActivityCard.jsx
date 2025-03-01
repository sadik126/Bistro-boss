import React from 'react';
import { FaShoppingCart, FaStar, FaCalendar, FaMoneyBill } from "react-icons/fa";

const ActivityCard = ({ orders, reviews, bookings, payments }) => {
    return (
        <div className="bg-yellow-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Activities</h2>
            <ul className="space-y-2">
                <ActivityItem icon={<FaShoppingCart />} text="Orders" count={orders} color="text-blue-600" />
                <ActivityItem icon={<FaStar />} text="Reviews" count={reviews} color="text-green-500" />
                <ActivityItem icon={<FaCalendar />} text="Bookings" count={bookings} color="text-yellow-600" />
                <ActivityItem icon={<FaMoneyBill />} text="Payment" count={payments} color="text-red-600" />
            </ul>
        </div>
    );
};

const ActivityItem = ({ icon, text, count, color }) => {
    return (
        <li className={`flex items-center ${color}`}>
            <span className="text-xl mr-2">{icon}</span>
            <span className="font-medium">{text}: {count}</span>
        </li>
    );
};

export default ActivityCard;