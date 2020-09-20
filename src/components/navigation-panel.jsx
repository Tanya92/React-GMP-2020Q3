import React, { useState, useCallback } from 'react';
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {addQueryParameter} from '../store/actions/actions';

import {navigationItems} from '../constants/index';

const blockName = 'navigation-panel';

const NavigationPanel = ({filterValue}) => {
    const [activeEl, setActiveEl] = useState(filterValue);
    const dispatch = useDispatch();

    const itemHandleClick = useCallback(() => {
        if (event.target.innerText === 'ALL') {
            dispatch(addQueryParameter({filter: undefined}))
        } else {
            dispatch(addQueryParameter({filter: event.target.innerText}))
        }
        
        if ((event.target).innerText !== activeEl) {
            setActiveEl(event.target.innerText);
        }
    },[event]); 


    return (
        <nav className={blockName}>
            <ul className={`${blockName}__list`}>
                {navigationItems
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

NavigationPanel.propTypes = {
    filterValue: PropTypes.string,
  }
  
NavigationPanel.defaultProps = {
    filterValue: undefined
}

function mapStateToProps (state) {
    return {
       filterValue: state.queryReducer.filter
    }
}

export default connect(mapStateToProps)(NavigationPanel);