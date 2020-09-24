import React, { useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationPanel from './navigation-panel';
import SortingPanel from './sorting-panel';
import ResultCounter from './result-counter';
import MovieCard from './movie-card';
import Loading from './loading';

import '../styles/main.less';
import { getDataRequest } from "../utils/requests";

const blockName = 'main';

 
const Main = ({ moviesData, queryObject }) => {
  const dispatch = useDispatch();
  console.log(moviesData)
  useEffect(() => {
    getDataRequest(queryObject)(dispatch)
  }, [queryObject])

  return (
    <main className={blockName}>
      <div className={`${blockName}-panel-container`}>
        <NavigationPanel />
        <SortingPanel />
      </div>
      {moviesData ? 
      <>
        <ResultCounter />
        <div className={`${blockName}-movies-container`}>
          {moviesData?.map(
            ( item, index ) => (
                <MovieCard 
                  key={index} 
                  movieData={item}
                />
            )
          )}
        </div>
      </> :
        <Loading />
      }
    </main>
  );
}

Main.propTypes = {
  moviesData: PropTypes.array,
  queryObject: PropTypes.object,
}

Main.defaultProps = {
  moviesData: [],
  queryObject: {},
}

function mapStateToProps (state) {
  return {
    moviesData: state.getDataReducer.data,
    queryObject: state.queryReducer
  }
}
export default connect(mapStateToProps)(Main);
