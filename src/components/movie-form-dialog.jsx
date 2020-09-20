import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import sn from 'classnames';

import { makeStyles } from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { FormControl, InputLabel, Input, MenuItem } from '@material-ui/core';
import MyButton from './my-button';

import { formsData } from '../constants/index';

import '../styles/movie-form-dialog.less';

const blockName = 'movie-form-dialog';

const useStyles = makeStyles((theme) => ({
  formTitle: {
    padding: '30px 50px'
  },
  formContent: {
    padding: '15px 50px'
  },
  formControl: {
    width: '100%',
    marginTop: '30px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    color: '#f65261',
    fontSize: '1.5rem',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fill: '#f65261',  
    },
  },
  input: {
    color: '#ffffff',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  option: {
    color: '#000000',
    fontSize: '1.5rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f65261'
    }
  },
  actions: {
    marginRight: '40px'
  },
  select: {
    '& .MuiSvgIcon-root': {
      fill: '#f65261',  
  },
  }
}));

const MovieFormDialog = ( { formTitle, isOpenedForm, handleCloseForm, movieData } ) => {
  const classes = useStyles();
  const { id, poster_path, title, genres, release_date, runtime, overview } = movieData;

  const [selectValue, setSelectValue] = useState(genres[0]);

  const handleChange = useCallback(event => setSelectValue(event.target.value), [event]);


  const { labels, placeholders, buttons, genreList, movieId, formDescription } = formsData;

  const movieButtons = buttons[formTitle];

  const renderFormItem = (label, index, value) => {
    return (
      <FormControl className={classes.formControl} key={`${label}${index}`}>
        <InputLabel className={classes.label} shrink={true}>{label}</InputLabel>
        <Input placeholder={placeholders[index]} className={classes.input} value={value}></Input> 
      </FormControl> 
    );  
  };

  const renderFormList = (label, index) => {
      switch(label) {
        case 'MOVIE ID':
          return (
            <>
              <p className={classes.label}>{movieId}</p>
              <p className={classes.input}>{id}</p>
            </>
          );
        case 'TITLE': 
           return renderFormItem(label, index, title);
          case 'RELEASE DATE':
            return (
                <TextField
                  key={`${label}${index}`}
                  id="date"
                  type="date"
                  defaultValue={!release_date ? new Date().toISOString().slice(0, 10): release_date}
                  label={label}
                  className={classes.formControl}
                  InputLabelProps={{
                    shrink: true,
                    className: classes.label
                  }}
                  inputProps={{
                    placeholder: placeholders[index],
                    className: classes.input,
                  }}
                />           
            );     
        case 'MOVIE URL': 
         return renderFormItem(label, index, poster_path);
        case 'GENRE':
          return (
            <FormControl className={classes.formControl} key={`${label}${index}`}>
              <InputLabel className={classes.label} shrink={true}>{label}</InputLabel>
              <Select 
                value={selectValue}
                onChange={handleChange} 
                className={classes.select}
                input={<Input className={classes.input}></Input> }
                inputProps={{
                  className: classes.input,
                }}
              >
                <MenuItem disabled value='' className={classes.option}>{placeholders[index]}</MenuItem>
                {genreList.map((item, index) => (
                  <MenuItem  key={`${item}${index}`} value={item} className={classes.option}>{item}</MenuItem>
                ))}
            </Select>
            </FormControl> 
          ); 
        case 'OVERVIEW': 
          return renderFormItem(label, index, overview);
        case 'RUNTIME': 
          return renderFormItem(label, index, runtime);              
        default:
         return renderFormItem(label, index, '');
    }
  }

    return (
        <Dialog 
          open={isOpenedForm} 
          onClose={handleCloseForm} 
          aria-labelledby="form-dialog-title"
          className={blockName}
          scroll='body'
        >
        <DialogTitle 
          id="form-dialog-title"
          className={classes.formTitle}
        >
          <p className={`${blockName}__form-description`}>{formDescription[formTitle]}</p>
          <MyButton 
            className={`${blockName}__close-button`}
            icon={<CloseIcon className={`${blockName}__close-button-icon`}/>}
            onClick={handleCloseForm}
            /> 
        </DialogTitle>
        <DialogContent className={classes.formContent}>
          {formTitle ==='delete' ? 
            <p className={classes.input}>Are you sure you want to delete this movie?</p> :
            <>
              {id && renderFormList(movieId)}
              {labels.map(
                ( label, index ) => renderFormList(label, index)
              )}
            </>
          }         
        </DialogContent>
        <DialogActions className={classes.actions}>
          {movieButtons.map(
            (button, index) => 
              <MyButton 
                key={`${button}${index}`}
                title={button}
                onClick={handleCloseForm} 
                className={sn(
                  `${blockName}__${button.toLowerCase()}-button`,
                 `${blockName}__form-button`
                )}
              />
          )}
        </DialogActions>
      </Dialog>
    );
};

MovieFormDialog.propTypes = {
    formTitle: PropTypes.string,
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
    formTitle: '',
    movieData: {
      id: undefined,
      poster_path: '',
      title: '',
      genres: [],
      release_date: undefined,
      runtime: undefined,
      overview: ''
  },
    isOpenedForm: true,
    handleCloseForm: () => {},
};

export default MovieFormDialog;