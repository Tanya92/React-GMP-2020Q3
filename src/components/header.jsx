import React from "react";

import MyButton from './my-button';
import Title from './title';
import SearchForm from "./search-form";
import MovieFormDialog from './movie-form-dialog';
import AddIcon from '@material-ui/icons/Add';

import '../styles/header.less';

const blockName = 'header';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpenedForm: false
    }
  }

  handleOpen = () => this.setState(() => ({
    isOpenedForm: true
  }));

  handleClose = () => this.setState(() => ({
    isOpenedForm: false
  }));
  
  render () {
    const { isOpenedForm } = this.state;
    return (
      <header className={blockName}>
        <Title />
        <MyButton 
          className={`${blockName}__add-movie-button`} 
          title='ADD MOVIE'
          onClick={this.handleOpen} 
          icon={<AddIcon style={{marginRight: '5px'}}/>}
        />
        <MovieFormDialog 
          formTitle='addMovie'
          isOpenedForm={isOpenedForm} 
          handleCloseForm={this.handleClose}
        />
        <SearchForm blockName={blockName} className='search-form'/>
      </header>
    );
  }
}

export default Header;