import React, { useState, useCallback }from 'react';
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {addQueryParameter} from '../store/actions/actions';

import {SORT_BY, selectItems} from '../constants/index';

import { FormControl, Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles'; 

const blockName = 'sorting-panel';

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
      minWidth: '100px',
      color: '#000000',
      fontSize: '1.5rem',
      '&:hover': {
        backgroundColor: '#f65261'
      }
    },
    input: {
        color: '#ffffff',
        fontSize: '1.5rem',
        cursor: 'pointer',
    },
})

const SortingPanel = ({ sortValue, sortOrder }) => {
  const [selectValue, setSelectValue] = useState(sortValue);
  const dispatch = useDispatch();
  const classes = useStyles();

   const handleChange = useCallback(event => {
    if (event.target.value === 'cancel sorting') {
        dispatch(addQueryParameter({sortBy: undefined, sortOrder: ''}))
        setSelectValue('')
    } else {
        dispatch(addQueryParameter({sortBy: event.target.value, sortOrder: 'asc'}))
        setSelectValue(event.target.value)
    }
    
   }, [event]);

    return (
        <div className={blockName}>
            <p className={`${blockName}__description`}>{SORT_BY} {(sortOrder)}</p>
            <FormControl className={classes.formControl}>
                <Select 
                    value={selectValue} 
                    onChange={handleChange} 
                    className={classes.select}
                    input={<Input className={classes.input}></Input> }
                    inputProps={{
                        className: classes.input,
                    }}
                >  
                    {selectItems.map((item, index) => (
                        <MenuItem key={`${item}${index}`} value={item} className={classes.option}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div> 
    )
}

SortingPanel.propTypes = {
    sortValue: PropTypes.string,
    sortOrder: PropTypes.string,
}
  
SortingPanel.defaultProps = {
    sortValue: '',
    sortOrder: '',
}

function mapStateToProps (state) {
    return {
       sortValue: state.queryReducer.sortBy,
       sortOrder: state.queryReducer.sortOrder
    }
}

export default connect(mapStateToProps)(SortingPanel);