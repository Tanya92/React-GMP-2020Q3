import React, {useContext} from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { headerContent } from '../store/actions/actions';
import SearchIcon from '@material-ui/icons/Search';
import Title from './title';

import { ThemeContext } from '../utils/useThemes.jsx';
import {DEFAULT_URL} from '../constants/index'

import '../styles/movie-info.less';


const blockName = 'movie-info';

const MovieInfo = ({ movieData}) => {
    const { theme, toggle, dark } = useContext(ThemeContext);
    const dispatch = useDispatch();

    const { poster_path, title, vote_average, genres, release_date, runtime, overview } = movieData;

    return (
      <div className={`${blockName}__container`} style={{backgroundColor: theme.backgroundColor}}>
        <div className={`${blockName}__header`}>
            <Title/>
            <SearchIcon className={`${blockName}__icon`} onClick={() => dispatch(headerContent())}/>
        </div>
        <button
          type="button"
          onClick={toggle}
          style={{
            backgroundColor: 'blue',
            color: theme.color,
            outline: 'none',
            marginLeft: '20px',
          }}
        >
          Toggle to {!dark ? 'Dark' : 'Light'} theme
        </button>
        <div className={`${blockName}`}>
            <img 
                src={poster_path} 
                alt={`image for ${title}`}
                className={`${blockName}-image`}
                onError={(event) => {
                  event.target.src = DEFAULT_URL;
                }}
            />
            <div className={`${blockName}__info-container`}>
                <h1 className={`${blockName}__title`}>
                    {title}
                    <div className={`${blockName}__rating`}>{vote_average}</div>
                </h1>
            
            <p className={`${blockName}__genre`}>{genres.join(', ')}</p>
            <p >
                <span className={`${blockName}__release-date`}>
                    {release_date && release_date.slice(0,4)}
                </span>
                <span className={`${blockName}__duration`}>
                    {runtime}
                </span>
            </p>
            <p className={`${blockName}__description`}>{overview}</p>
            </div>
        </div>
      </div>
    )

  }

  MovieInfo.propTypes = {
      movieData: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        title: PropTypes.string, 
        genres: PropTypes.arrayOf(PropTypes.string), 
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
        runtime: PropTypes.number,
        overview: PropTypes.string,
      }),
  };

  MovieInfo.defaultProps = {
    movieData: {
        id: 0,
        poster_path: '',
        title: '', 
        genres: [], 
        release_date: '',
        vote_average: 0,
        runtime: 0,
        overview: '',
      },
  }

  function mapStateToProps(state) {
    const {movieInfo} = state.headerReducer;
    return {movieData: movieInfo}
  }

  export default connect(mapStateToProps)(MovieInfo);