import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CloseIcon from '@material-ui/icons/Close';
import MyButton from './my-button';


import { formsData } from '../constants/index';

const { formDescription } = formsData;

function mapStateToProps (state) {
    const {formTitle} = state.titleReducer;
    return {formTitle}
}
  
const FormDialogTitle = ({ formTitle, blockName, handleCloseForm }) => {
    return (
        <>
            <p className={`${blockName}__form-description`}>{formDescription[formTitle]}</p>
            <MyButton 
                className={`${blockName}__close-button`}
                icon={<CloseIcon className={`${blockName}__close-button-icon`}/>}
                onClick={handleCloseForm}
            />
        </>
    )
}

FormDialogTitle.propTypes = {
    formTitle: PropTypes.string,
    blockName: PropTypes.string,
    handleCloseForm: PropTypes.func
}
  
FormDialogTitle.defaultProps = {
    formTitle: 'edit',
    blockName: '',
    handleCloseForm: () => {}
}

export default connect(mapStateToProps)(FormDialogTitle);