import React, { Suspense, useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sn from 'classnames';

import AddIcon from '@material-ui/icons/Add';
import MyButton from './my-button';
import Title from './title';
import SearchForm from "./search-form";
const MovieFormDialog = React.lazy(() => import('./movie-form-dialog'));
const MovieInfo = React.lazy(() => import('./movie-info'));

import { ThemeProvider } from '../utils/useThemes.jsx';

import '../styles/header.less';

const blockName = 'header';

const Header = ({ movieInfo }) => {
  const [isOpenedForm, setOpenedForm] = useState(false);

  const handleOpen = () => setOpenedForm(true);

  const handleClose = () => setOpenedForm(false);
    
  useEffect(() => {
    if (isOpenedForm) {
        document.title = 'Add movie form';
    }

    return () => document.title = 'React 2020Q3'
})
 

  const HeaderContent = () => (
    <> 
      <Title />
      <MyButton 
        className={`${blockName}__add-movie-button`} 
        title='ADD MOVIE'
        onClick={handleOpen} 
        icon={<AddIcon style={{marginRight: '5px'}}/>}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <MovieFormDialog 
          formTitle='addMovie'
          isOpenedForm={isOpenedForm} 
          handleCloseForm={handleClose}
        />
      </Suspense>
      <SearchForm blockName={blockName} className='search-form'/>
    </>
  )
 
    return (
      <ThemeProvider>
      <header className={sn(blockName, movieInfo && `${blockName}__movie-info`)}>
        {
        movieInfo === null ? 
          <HeaderContent/> :
          <Suspense fallback={<div>Loading...</div>}>
          <MovieInfo />
        </Suspense>  
        }
      </header>
      </ThemeProvider>
    );
}

Header.propTypes = {
  movieInfo: PropTypes.object,
};

Header.defaultProps = {
  movieInfo: null,
}

function mapStateToProps(state) {
  const {movieInfo} = state.headerReducer;
  return {movieInfo}
}

export default connect(mapStateToProps)(Header);
