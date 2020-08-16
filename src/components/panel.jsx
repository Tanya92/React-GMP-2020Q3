import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SelectForm from './select-form';

const Panel = ({ blockName, itemsArray, isSelectedPanel }) => {
    const [activeEl, setActiveEl] = useState(null);

    const itemHandleClick = () => {
        if ((event.target).innerText !== activeEl) {
            setActiveEl(event.target.innerText)
        }
    }

    return (
        <nav className={blockName}>
            <ul className={`${blockName}__list`}>
                {itemsArray
                    .map((item, index) =>
                        <li 
                            key={`${item}${index}`} 
                            className={
                                `${blockName}__list__item ${activeEl === item ? 'active' : ''}`}
                            onClick={itemHandleClick}
                        >
                        {isSelectedPanel ? <SelectForm title={item} /> : item}   
                        </li>
                    )
                }
            </ul>
        </nav>
    )
};

Panel.propTypes = {
    blockName: PropTypes.string,
    itemsArray: PropTypes.arrayOf(PropTypes.string), 
    isSelectedPanel: PropTypes.bool
}

Panel.defaultProps = {
    blockName: '',
    itemsArray: [],
    isSelectedPanel: true
}
export default Panel;