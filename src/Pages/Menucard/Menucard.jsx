import React from 'react';
import useMenu from '../useMenu/useMenu';
import Ordertab from '../Ordertab/Ordertab';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';

const Menucard = () => {
    const [menu] = useMenu()

    const popular = menu.filter(m => m.category === 'popular').slice(-3);
    console.log(popular)
    return (
        <div className='mt-5'>
            <Sectiontitle
                subtitle={"---Check it out---"}
                title={"CHEF RECOMMENDS"}
            ></Sectiontitle>
            <Ordertab items={popular}></Ordertab>

        </div>
    );
};

export default Menucard;