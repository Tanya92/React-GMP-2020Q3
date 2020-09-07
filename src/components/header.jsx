import React, { Suspense, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import sn from 'classnames';

import MyButton from './my-button';
import Title from './title';
import SearchForm from "./search-form";
const MovieFormDialog = React.lazy(() => import('./movie-form-dialog'));
const MovieInfo = React.lazy(() => import('./movie-info'));

import { ThemeProvider } from '../utils/useThemes.jsx';

import AddIcon from '@material-ui/icons/Add';

import '../styles/header.less';

const blockName = 'header';

const Header = ({ headerContent, setHeaderContent }) => {
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
      <header className={sn(blockName, headerContent && `${blockName}__movie-info`)}>
        {
        headerContent === null ? 
          <HeaderContent/> :
          <Suspense fallback={<div>Loading...</div>}>
            <MovieInfo headerContent={headerContent} setHeaderContent={setHeaderContent}/>
          </Suspense> 
          
        }
      </header>
      </ThemeProvider>
    );
}

Header.propTypes = {
  headerContent: PropTypes.shape({
    id: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string, 
        genre: PropTypes.string, 
        releaseDate: PropTypes.string,
        rating: PropTypes.string,
        duration: PropTypes.string,
        description: PropTypes.string,
  }),
  setHeaderContent: PropTypes.func
};

Header.defaultProps = {
  headerContent: {
      id: '',
      image: '',
      title: '', 
      genre: '', 
      releaseDate: '',
      rating: '',
      duration: '',
      description: '',
    },
    setHeaderContent: () => {}
}

export default Header;