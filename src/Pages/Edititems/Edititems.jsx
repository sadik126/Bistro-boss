import React from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { useLoaderData } from 'react-router-dom';

const Edititems = () => {
    const { item } = useLoaderData()
    console.log(item)
    return (
        <div>
            <Sectiontitle title="Edit Items" subtitle="Edit Items" />
        </div>
    );
};

export default Edititems;