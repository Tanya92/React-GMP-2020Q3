import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles'; 

import { FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    select: {
      width: '200px',
      color: '#fff',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      textAlign: 'center',
      background: 'none',
      '&:before': {
        borderBottom: 'none',
        content: ''
      },
      '& .MuiSvgIcon-root': {
        fill: '#f65261',
    },
    },
    option: {
      border: 'none',
      borderRadius: '5px',
      background: 'none',
      cursor: 'pointer',
      minWidth: '100px'
    }
})

const SelectForm = ({ title, selectItems }) => {
  const [value, setValue] = useState(title);
  const classes = useStyles();

   const handleChange = useCallback(() => setValue(event.target.value), [event]);

    return (
        <FormControl>
            <Select value={value} onChange={handleChange} className={classes.select}>
              {selectItems.map((item, index) => (
                <MenuItem  key={`${item}${index}`} value={item} className={classes.option}>{item}</MenuItem>
              ))}
            </Select>
        </FormControl>
    )
}

SelectForm.propTypes = {
  title: PropTypes.string,
  selectItems: PropTypes.arrayOf(PropTypes.string),
};

SelectForm.defaultProps = {
  title: '',
  selectItems: [],
};

export default SelectForm;