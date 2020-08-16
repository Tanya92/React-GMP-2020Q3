import React from "react";

import Button from './button';
import Title from './title';
import SearchForm from "./search-form";

import '../styles/header.less';

const blockName = 'header';

const Header = () => {
  return (
    <header className={blockName}>
      <Title />
      <Button className={`${blockName}__add-movie-button`} title='ADD MOVIE' />
     <SearchForm blockName={blockName} className='search-form'/>
    </header>
  );
};

export default Header;