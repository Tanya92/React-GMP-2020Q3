import React from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';

const Button = ({ title, className, type, icon }) => {
    return (
        <button className={className} type={type}>
          {icon}{title}
        </button>
        
    )
}

Button.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node
};

Button.defaultProps = {
    title: '',
    className: '',
    type: 'button',
    icon: <AddIcon style={{marginRight: '5px'}}/> 
};

export default Button;



