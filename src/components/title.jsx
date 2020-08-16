import React from 'react';
import PropTypes from 'prop-types';

import '../styles/title.less';

const Title = ({ title }) => (
    <span className='title'>
        {title}
    </span>
);

Title.propTypes = {
    title: PropTypes.string
  };
  
  Title.defaultProps = {
    title: 'netflix roulette'
  };

export default Title;