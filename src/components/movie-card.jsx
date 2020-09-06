import React, { useState, useCallback, useEffect, Suspense }  from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles'; 

import Button from '@material-ui/core/Button';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const MyButton = React.lazy(() => import('./my-button'));
const MovieFormDialog = React.lazy(() => import('./movie-form-dialog'));

import '../styles/movie-card.less';


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
    },
    menu: {
        'MuiList-root': {
            backgroundColor: '#555555',
          }
    },
    button: {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        '&:hover': {
            color: '#f65261'
        }
        
    }
})


const MovieCard = ({ movieData, setHeaderContent }) => {
    const [anchorEl, setAnchorEl] = useState('');
    const [isOpenedEditForm, setOpenedEditForm] = useState(false);
    const [isOpenedDeleteForm, setOpenedDeleteForm] = useState(false);
    const { image, title, genre, releaseDate } = movieData;

    const classes = useStyles();

    useEffect(() => {
        if (isOpenedEditForm) {
            document.title = 'Edit form';
        }
        if (isOpenedDeleteForm) {
            document.title = 'Delete form';
        }
        if (anchorEl) {
            document.title = 'Menu button';
        }
        return () => document.title = 'React 2020Q3'
    })

    const handleClickMenuButton = useCallback(event => setAnchorEl(event.currentTarget), [event]);

    const handleCloseMenuButton = () => setAnchorEl(null);
    
    const handleOpenEditForm = () => setOpenedEditForm(true);
    const handleCloseEditForm = () => setOpenedEditForm(false);

    const handleOpenDeleteForm = () => setOpenedDeleteForm(true);
    const handleCloseDeleteForm = () => setOpenedDeleteForm(false);
  
    return (
        <div className={blockName}>
            <div className={`${blockName}-image-container`} >
                <img 
                    src={image} 
                    alt={`image for ${title}`}
                    className={`${blockName}-image`}
                    onClick={() => setHeaderContent(movieData)}
                />
                <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClickMenuButton} className={classes.menuButton}>
                    <MoreVertIcon />
                </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenuButton} 
                        className={classes.menu} 
                    >
                        <MenuItem onClick={handleCloseMenuButton} className={classes.option}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <MyButton 
                                    className={classes.button} 
                                    title='Edit'
                                    onClick={handleOpenEditForm} 
                                    icon={<EditIcon style={{marginRight: '5px'}}/>}
                                />
                            </Suspense>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <MovieFormDialog 
                                        formTitle='edit'
                                        isOpenedForm={isOpenedEditForm} 
                                        handleCloseForm={handleCloseEditForm} 
                                        movieData={movieData}
                                    />
                                </Suspense>
                               
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenuButton} className={classes.option}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <MyButton 
                                    className={classes.button} 
                                    title='Delete'
                                    onClick={handleOpenDeleteForm} 
                                    icon={<DeleteIcon style={{marginRight: '5px'}}/>}
                                />
                            </Suspense>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <MovieFormDialog 
                                        formTitle='delete'
                                        isOpenedForm={isOpenedDeleteForm} 
                                        handleCloseForm={handleCloseDeleteForm} 
                                        movieData={movieData}
                                    />
                                </Suspense>
                        </MenuItem> 
                    </Menu>
            </div>
            <div className={`${blockName}-info`}>
                <span className={`${blockName}-info__title`}>{title}</span>
                <span className={`${blockName}-info__release-date`}>{releaseDate.slice(0,4)}</span>
                <span className={`${blockName}-info__genre`}>{genre}</span>
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string, 
        genre: PropTypes.string, 
        releaseDate: PropTypes.string
      }),
    setHeaderContent: PropTypes.func,
};

MovieCard.defaultProps = {
    movieData: {
        id: 'MO7412OTH',
        image: 'https://squarefaction.ru/files/game/13938/cover/reservoir-dogs-bloody-days_1bf73424.jpg',
        title: 'Reservoir Dogs',
        genre: 'Oscar Winning Movie',
        releaseDate: '1992-04-01',
    },
    setHeaderContent: () => {}
};

export default MovieCard;