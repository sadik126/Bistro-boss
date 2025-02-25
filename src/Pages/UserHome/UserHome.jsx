import React from 'react';

const UserHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h2 className='text-3xl'> <span>Hi , welcome</span></h2>
            {
                user.displayName ? user.displayName : 'back'
            }
        </div>
    );
};

export default UserHome;