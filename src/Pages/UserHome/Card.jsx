import React from 'react';

const Card = ({ icon, number, title, color }) => {
    return (
        <div className={`flex items-center p-5 rounded-lg shadow-lg bg-gradient-to-r ${color} text-white`}>
            <div className="text-4xl">{icon}</div>
            <div className="ml-4">
                <h2 className="text-2xl font-bold">{number}</h2>
                <p className="text-lg">{title}</p>
            </div>
        </div>
    );
};

export default Card;