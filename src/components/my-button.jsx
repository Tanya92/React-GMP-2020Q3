import React from 'react';
import PropTypes from 'prop-types';

const MyButton = ({ title, className, type, icon, onClick }) => {
    return (
        <button className={className} type={type} onClick={onClick}>
          {icon}{title}
        </button>
        
    )
}

MyButton.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
};

MyButton.defaultProps = {
    title: '',
    className: '',
    type: 'button',
    icon: null,
    onClick: () => {} 
};

export default MyButton;



