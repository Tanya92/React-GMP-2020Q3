import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import sn from 'classnames';
import MyButton from './my-button';

import {addMovieRequest, editMovieRequest, deleteMovieRequest} from '../utils/requests';

import { formsData } from '../constants/index';

import '../styles/form-dialog.less';

const blockName = 'form-dialog';

function mapStateToProps(state) {
  const {formTitle} = state.titleReducer;
  return {formTitle}
}

const handleValidate = values => {
  const errors = {
    poster_path: null, 
    release_date: null,
    title: null, 
    genres: null, 
    runtime: null, 
    overview: null
  };

  const requiredKeys = Object.keys(values).filter(key => key !== 'id');

  requiredKeys.forEach(key => {
    if (!values[key]) {
      errors[key] = 'Required';
    }

    if (key === 'genres' && values[key]?.length === 0) {
      errors[key] = 'Required';
    }

    if (key === 'runtime'  && typeof values[key] !== 'number' && values[key]) {
      errors[key] = `${key} must be a number!`
    }

    if (key === 'runtime'  && typeof values[key] === 'number' && values[key]<0) {
      errors[key] = `${key} must be a positive number!`
    }

    });

  return errors;
};
 
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    formTitle,
    handleCloseForm,
    handleSubmit,
  } = props;

  const dispatch = useDispatch();

  const { labels, placeholders, buttons, genreList, movieId } = formsData;
  
  const movieButtons = buttons[formTitle];

  const checkErrorObject = () => {
    const errors = handleValidate(values)
    const isEmptyObj = Object.keys(errors).length === 0 && errors.constructor === Object;
    const isNullErrors = Object.keys(errors).every(key => errors[key] === null);
    return !isEmptyObj && isNullErrors;
  }

  const handleButtonClick = (button) => {
    const isValidateData = checkErrorObject();
      if (button === 'SUBMIT') {
        if (isValidateData) {
          addMovieRequest(values)(dispatch);
          handleCloseForm()
        }    
      }
      
      if (button === 'SAVE') {
        if (isValidateData) {
          editMovieRequest(values)(dispatch);
          handleCloseForm()
        }
      }
        
      if (button === 'RESET') {
        Object.keys(values).forEach(key => delete values[key]);
 
      }
    if (button === 'CONFIRM') {
      deleteMovieRequest(values.id)(dispatch)
      handleCloseForm()
    }
  };

  const handleButtonType = (button) => {
    switch(button) {
      case 'RESET':
        return 'reset';
      case 'SUBMIT':
      case 'CONFIRM':
      case 'SAVE':
        return 'submit';
      default: 
        return 'button';
    }
  }

  function handleSelectHelper (event) {
    const select = event.target;
    let selectedItems = [], cur;
    for (let i = 0; i < select.options.length; i++) {
        cur = select.options[i];
        if (cur.selected) {
            selectedItems.push(encodeURIComponent(cur.value));
        }
    }

    values.genres = selectedItems;
  }

  const renderFormItem = (label, index, field, type='text') => {
    return (
      <div className={`${blockName}__form-element`} key={`${label}${index}`}>
        <label htmlFor={label}>{label}</label>
        {field === 'overview' ? 
          <textarea
            id={label} 
            placeholder={placeholders[index]} 
            defaultValue={values[field]}
            name={label}
            onChange={(event) => {
              if (field !== 'runtime' && field !== 'id') {
                values[field] = encodeURIComponent(event.target.value.trim()) 
              } else {
                values[field] = Number(event.target.value);
            }
            }}
          />
            : 
          <input 
            type={type}
            id={label} 
            placeholder={placeholders[index]} 
            defaultValue={values[field]}
            name={label}
            onChange={(event) => {
              if (field !== 'runtime' && field !== 'id') {
                values[field] = event.target.value.trim()
              } else {
                console.log(field, typeof values[field])
                values[field] = Number(event.target.value);
              }
            }}
        />
        }
        {errors[field] && touched[field] && <div id="feedback">{errors[field]}</div>} 
      </div> 
    );  
  };

  const renderFormList = (label, index) => {
      switch(label) {
      case 'MOVIE ID':
        return values.id && 
          <div key={`${label}${index}`}>
            <p className={'label-id'}>{movieId}</p>
            <p className={'id-value'}>{values.id}</p>
          </div>
      case 'TITLE': 
          return renderFormItem(label, index, 'title');
          case 'RELEASE DATE':
          return (
              <div key={`${label}${index}`} className={`${blockName}__form-element`}>
                  <label htmlFor={label}>{label}</label>
                  <input
                      id={label}
                      type="date"
                      name={label}
                      defaultValue={values.release_date}
                      placeholder={placeholders[index]}
                      onChange={(event) => {
                        values.release_date = event.target.value;
                      }}
                  />
                  {errors.release_date && touched.release_date && <div id="feedback">{errors.release_date}</div>}     
              </div>       
          );     
      case 'MOVIE URL': 
      return renderFormItem(label, index, 'poster_path', 'url');
      case 'GENRE':
          return (
              <div key={`${label}${index}`} className={`${blockName}__form-element`}>
                  <label htmlFor={label}>{label}</label>
                  <select 
                      className={`${blockName}__form-element`}
                      id={label}
                      defaultValue={values.genres}
                      multiple={true}
                      name={label}
                      onChange={event => handleSelectHelper(event)}
                  >
                      <option disabled value=''>{placeholders[index]}</option>
                          {genreList.map((item, index) => (
                              <option key={`${item}${index}`} value={item} >{item}</option>
                          ))}
                  </select>
                  {errors.genres && touched.genres && <div id="feedback">{errors.genres}</div>}
              </div> 
          ); 
      case 'OVERVIEW': 
          return renderFormItem(label, index, 'overview');
      case 'RUNTIME': 
          return renderFormItem(label, index, 'runtime');              
      default:
          return renderFormItem(label, index, '');
      }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={blockName}>
      {formTitle ==='delete' ? 
          <p className='delete-question'>Are you sure you want to delete this movie?</p> :
          <>
            {labels.map(
              ( label, index ) => renderFormList(label, index)
            )}
          </>
      }     
      {movieButtons.map(
          (buttonName, index) => 
            <MyButton 
              type={handleButtonType(buttonName)}
              key={`${buttonName}${index}`}
              title={buttonName}
              onClick={()=>handleButtonClick(buttonName, errors)} 
              className={sn(
                `${blockName}__${buttonName.toLowerCase()}-button`,
                `${blockName}__form-button`
              )}
            />
        )}
      </form>
    </>
  );
};
 
 const MyEnhancedForm = withFormik({
  mapPropsToValues: ({movieData}) => { 
    const { id, poster_path, title, genres, release_date, runtime, overview } = movieData;
      
    return { 
      id, 
      poster_path, 
      title, 
      genres, 
      release_date, 
      runtime, 
      overview
    } 
  },
  validate: values => handleValidate(values),
  handleSubmit: () => {
    console.log('Form is submitted!')
  },
  displayName: 'Movie Form Dialog'
 })(connect(mapStateToProps)(MyForm));

 MyForm.propTypes = {
    values: PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string, 
      genres: PropTypes.arrayOf(PropTypes.string), 
      release_date: PropTypes.string,
      runtime: PropTypes.number,
      overview: PropTypes.string 
    }),
    handleCloseForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    errors: PropTypes.shape({
      id: PropTypes.string,
      poster_path: PropTypes.string,
      title: PropTypes.string, 
      genres:  PropTypes.string, 
      release_date: PropTypes.string,
      runtime: PropTypes.string,
      overview: PropTypes.string 
    }),
    touched: PropTypes.shape({
      id: PropTypes.bool,
      poster_path: PropTypes.bool,
      title: PropTypes.bool, 
      genres:  PropTypes.arrayOf(PropTypes.bool), 
      release_date: PropTypes.bool,
      runtime: PropTypes.bool,
      overview: PropTypes.bool 
    }),
    formTitle: PropTypes.string,
    blockName: PropTypes.string
 }

 MyForm.defaultProps = {
  values: {
    id: null,
    poster_path: null,
    title: null, 
    genres: [], 
    release_date: null,
    runtime: null,
    overview: null 
  },
  handleCloseForm: () => {},
  handleSubmit: () => {},
  errors: {
    id: null,
    poster_path: null,
    title: null, 
    genres:  null, 
    release_date: null,
    runtime: null,
    overview: null 
  },
  touched: {
    id: false,
    poster_path: false,
    title: false, 
    genres: [], 
    release_date: false,
    runtime: false,
    overview: false 
  },
  formTitle: 'edit',
  blockName: ''
}

export default MyEnhancedForm;