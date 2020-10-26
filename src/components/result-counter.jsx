import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ResultCounter = ({ numberOfMovies }) => {
    return (
        numberOfMovies && 
            (<div className='result-counter-container'>
                <span className='result-counter'>{numberOfMovies}</span>
                <span className='result-counter-info'>movie(s) found</span>
            </div>)
    )
}

ResultCounter.propTypes = {
    numberOfMovies: PropTypes.number
};

ResultCounter.defaultProps = {
    numberOfMovies: 6
};

function mapStateToProps(state) {
    return {
        numberOfMovies: state.asyncReducer.data?.length
    }
}
export default connect(mapStateToProps)(ResultCounter);