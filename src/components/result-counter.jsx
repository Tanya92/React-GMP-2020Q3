import React from 'react';
import PropTypes from 'prop-types';

const ResultCounter = ({ count }) => {
    return (
        count ?
            (<div className='result-counter-container'>
                <span className='result-counter'>{count}</span>
                <span className='result-counter-info'>movies found</span>
            </div>) :
            (
                <div className='result-counter-container'>
                    <span className='result-counter'>Not found</span>
                </div>
            )
    )
}

ResultCounter.propTypes = {
    count: PropTypes.number
};

ResultCounter.defaultProps = {
    count: 6
};

export default ResultCounter;