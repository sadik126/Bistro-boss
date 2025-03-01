import React from 'react';

const ProfileCard = ({ name, img }) => {
    return (
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-24 h-24 bg-white border-2 border-yellow-500 rounded-full">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={img} />
                    </div>
                </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{name}</h2>
        </div>
    );
};

export default ProfileCard;