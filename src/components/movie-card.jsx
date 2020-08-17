import React, { useState }  from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles'; 

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/movie-card.less';
import { Menu } from '@material-ui/core';

const blockName = 'movie-card';

const useStyles = makeStyles({
    menuButton: {
        position: 'absolute',
        top: '30px',
        right: '30px',
        width: '50px',
        minWidth: '50px',
        height: '50px',
        display: 'flex',
        backgroundColor: '#d8d2d2',
        border: 'none',
        borderRadius: '50%',
        fontsize: '24px',
        opacity: '0',
        '&:hover': {
            backgroundColor: '#d8d2d2',
            opacity: '1'
        }
    }
})

const MovieCard = ({ image, title, genre, releaseDate }) => {
    const [anchorEl, setAnchorEl] = useState('');
    const classes = useStyles();

    console.log('anchorEl', anchorEl)

    const handleClick = event => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null);
    
    return (
        <div className={blockName}>
            <div className={`${blockName}-image-container`}>
                <img 
                    src={image} 
                    alt={`image for ${title}`}
                    className={`${blockName}-image`}
                />
                <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} className={classes.menuButton}>
                    <MoreVertIcon />
                </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose} 
                        
                    >
                        <MenuItem onClick={handleClose} className={classes.option}>
                            <EditIcon/> Edit
                        </MenuItem>
                        <MenuItem onClick={handleClose} className={classes.option}>
                            <DeleteIcon/> Delete
                        </MenuItem>
                    </Menu>
            </div>
            <div className={`${blockName}-info`}>
                <span className={`${blockName}-info__title`}>{title}</span>
                <span className={`${blockName}-info__release-date`}>{releaseDate}</span>
                <span className={`${blockName}-info__genre`}>{genre}</span>
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string, 
    genre: PropTypes.string, 
    releaseDate: PropTypes.number
};

MovieCard.defaultProps = {
    image: 'https://cdn.ananasposter.ru/image/cachewebp/catalog/poster/film/99/1506-1000x830.webp',
    title: 'Pulp fiction',
    genre: 'Action & Adventure',
    releaseDate: 1994,
};

export default MovieCard;