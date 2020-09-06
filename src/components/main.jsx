import React from "react";
import PropTypes from 'prop-types';

import NavigationPanel from './navigation-panel';
import SortingPanel from './sorting-panel';
import ResultCounter from './result-counter';
import MovieCard from './movie-card';

import { moviesData } from '../constants/index';

import '../styles/main.less';

const blockName = 'main';

const Main = ({setHeaderContent}) => {

  return (
    <main className={blockName}>
      <div className={`${blockName}-panel-container`}>
        <NavigationPanel />
        <SortingPanel />
      </div>
      <ResultCounter />
      <div className={`${blockName}-movies-container`}>
        {moviesData.map(
          ( item, index ) => (
              <MovieCard 
                key={index} 
                movieData={item}
                setHeaderContent={setHeaderContent}
              />
          )
        )}
      </div>
    </main>
  );
}

Main.propTypes = {
  setHeaderContent: PropTypes.func,
}

Main.defaultProps = {
  setHeaderContent: () => {}
}

export default Main;
