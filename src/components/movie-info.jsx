import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import Title from './title';

import { ThemeContext } from '../utils/useThemes.jsx';

import '../styles/movie-info.less';

const blockName = 'movie-info';

const MovieInfo = ({ headerContent, setHeaderContent}) => {
    const { theme, toggle, dark } = useContext(ThemeContext);

    const { image, title, rating, genre, releaseDate, duration, description } = headerContent;

    return (
      <div className={`${blockName}__container`} style={{backgroundColor: theme.backgroundColor}}>
        <div className={`${blockName}__header`}>
            <Title/>
            <SearchIcon className={`${blockName}__icon`} onClick={() => setHeaderContent(null)}/>
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
                src={image} 
                alt={`image for ${title}`}
                className={`${blockName}-image`}
            />
            <div className={`${blockName}__info-container`}>
                <h1 className={`${blockName}__title`}>
                    {title}
                    <div className={`${blockName}__rating`}>{rating}</div>
                </h1>
            
            <p className={`${blockName}__genre`}>{genre}</p>
            <p >
                <span className={`${blockName}__release-date`}>
                    {releaseDate.slice(0,4)}
                </span>
                <span className={`${blockName}__duration`}>
                    {duration}
                </span>
            </p>
            <p className={`${blockName}__description`}>{description}</p>
            </div>
        </div>
      </div>
    )

  }

  MovieInfo.propTypes = {
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

  MovieInfo.defaultProps = {
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


  export default MovieInfo;