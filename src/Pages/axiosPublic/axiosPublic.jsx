import axios from 'axios';
import React from 'react';
const allaxios = axios.create({
    baseURL:'http://localhost:7065'
})
const axiosPublic = () => {
    return allaxios;
};

export default axiosPublic;