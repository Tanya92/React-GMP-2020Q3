import React from "react";
import PropTypes from 'prop-types';

import Title from './title';
import '../styles/footer.less';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  
  handleClick = () => {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
    console.log('counter', this.state.counter)
  }
  
  render() {
    if (this.state.counter === 2) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <footer className='footer' onClick={this.handleClick}>{this.props.children}</footer>;
  }
}



Footer.propTypes = {
  children: PropTypes.node.isRequired
}

Footer.defaultProps = {
  children: <Title />
}

export default Footer;

