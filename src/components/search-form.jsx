import React from 'react';

import Button from './button';
import { FormControl, Input } from '@material-ui/core';

const blockName = 'search-form';

const SearchForm = () => {
    return (
        <FormControl className={blockName}>
            <h1 className={`${blockName}__info`}> FIND YOUR MOVIE </h1>
            <Input name='search-movie' type="text" className={`${blockName}__input`} placeholder='What do you want to watch?'></Input>
            <Button className={`${blockName}__search-button`} title='SEARCH' type='submit'/>
        </FormControl>
    )
}

export default SearchForm;