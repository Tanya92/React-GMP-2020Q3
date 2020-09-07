import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const Panel = ({ blockName, itemsArray }) => {
    const [activeEl, setActiveEl] = useState(null);

    const itemHandleClick = useCallback(() => {
        if ((event.target).innerText !== activeEl) {
            setActiveEl(event.target.innerText)
        }
    },[event]);

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
                        {item}   
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
}

Panel.defaultProps = {
    blockName: '',
    itemsArray: [],
}
export default Panel;