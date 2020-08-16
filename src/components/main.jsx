import React from "react";

import NavigationPanel from './navigation-panel';
import SortingPanel from './sorting-panel';
import ResultCounter from './result-counter';
import MovieCard from './movie-card';

import { moviesData } from '../constants/index';

import '../styles/main.less';

const blockName = 'main';

const Main = () => {

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
                image={item.image} 
                title={item.title} 
                genre={item.genre} 
                releaseDate={item.releaseDate}
              />
          )
        )}
      </div>
    </main>
  );
}

export default Main;
