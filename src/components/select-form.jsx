import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles'; 

import FormControl from '@material-ui/core/FormControl';
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
      }
    },
    option: {
      border: 'none',
      borderRadius: '5px',
      background: 'none',
      cursor: 'pointer',
      minWidth: '100px'
    }
})

const SelectForm = ({ title }) => {
  const [value, setValue] = useState(title);
  const classes = useStyles();

   const handleChange = event => setValue(event.target.value)

    return (
        <FormControl>
            <Select value={value} onChange={handleChange} className={classes.select}>
                <MenuItem value="1" className={classes.option}>option 1</MenuItem>
                <MenuItem value={`${title}`} className={classes.option}>{title}</MenuItem>
                <MenuItem value="3" className={classes.option}>option 3</MenuItem>
            </Select>
        </FormControl>
    )
}

SelectForm.propTypes = {
  title: PropTypes.string
};

SelectForm.defaultProps = {
  title: ''
};

export default SelectForm;