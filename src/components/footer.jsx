import React, { useState} from "react";
import PropTypes from 'prop-types';

import Title from './title';
import '../styles/footer.less';

const Footer = (props) => {
  let [counter, setCounter] = useState(0);

  const handleClick = () => setCounter(counter + 1);
  
  if (counter === 2) {
    // Simulate a JS error
    throw new Error('I crashed!');
  }

  return <footer className='footer' onClick={handleClick}>{props.children}</footer>;
  
}


Footer.propTypes = {
  children: PropTypes.node.isRequired
}

Footer.defaultProps = {
  children: <Title />
}

export default Footer;

