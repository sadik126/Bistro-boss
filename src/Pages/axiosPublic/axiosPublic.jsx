import axios from 'axios';
import React from 'react';
const allaxios = axios.create({
    baseURL: 'https://bistro-boss-server-a7ed.onrender.com'
})
const axiosPublic = () => {
    return allaxios;
};

export default axiosPublic;