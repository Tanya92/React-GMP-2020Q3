import React from 'react';
import PropTypes from 'prop-types';

import Title from './title';
import MyButton from './my-button';

import '../styles/page-not-found.less';
import { Link } from 'react-router-dom';

const blockName = 'page-not-found';

const PageNotFound = ({errorMessage}) => {
    return (
        <div className={blockName}>
            <Title/>
            <h2 className={`${blockName}__info`}>
                Page Not Found
            </h2>
            <p className={`${blockName}__error-message`}>
                {errorMessage}
                <Link to='/'>
                    <MyButton
                        title={'GO BACK TO HOME'}
                        className={`${blockName}__back-button`}
                        onClick={() => console.log('go to APP')}
                    />
                </Link>
            </p>
            
        </div>
    )
}

PageNotFound.propTypes = {
    errorMessage: PropTypes.string
  };
  
PageNotFound.defaultProps = {
errorMessage: '404'
};

export default PageNotFound;