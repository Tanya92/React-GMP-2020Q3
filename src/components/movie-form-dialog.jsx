import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles'; 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormDialogTitle from './form-dialog-title';
import MyEnhancedForm from './HOC-formik';

import '../styles/movie-form-dialog.less';

const blockName = 'movie-form-dialog';

const useStyles = makeStyles(() => ({
  formTitle: {
    padding: '30px 50px'
  },
  formContent: {
    padding: '15px 50px'
  },
}));


const MovieFormDialog = ( { isOpenedForm, handleCloseForm, movieData } ) => {
  const classes = useStyles();

  return (
    <Dialog 
      open={isOpenedForm} 
      onClose={handleCloseForm} 
      aria-labelledby="form-dialog-title"
      className={blockName}
      scroll='paper'
    >
      <DialogTitle 
        id="form-dialog-title"
        className={classes.formTitle}
      >
        <FormDialogTitle blockName={blockName} handleCloseForm={handleCloseForm}/>
      </DialogTitle>
      <DialogContent className={classes.formContent}>
        <MyEnhancedForm movieData={movieData} handleCloseForm={handleCloseForm}/>        
      </DialogContent>
    </Dialog>
  );
};

MovieFormDialog.propTypes = {
    movieData: PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string, 
      genres: PropTypes.arrayOf(PropTypes.string), 
      release_date: PropTypes.string,
      runtime: PropTypes.number,
      overview: PropTypes.string 
    }),
    isOpenedForm: PropTypes.bool,
    handleCloseForm: PropTypes.func
};

MovieFormDialog.defaultProps = {
    movieData: {
      id: null,
      poster_path: null,
      title: null,
      genres: [],
      release_date: null,
      runtime: null,
      overview: null
  },
    isOpenedForm: true,
    handleCloseForm: () => {},
};

export default MovieFormDialog;