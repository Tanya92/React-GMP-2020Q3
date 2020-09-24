import { createActions } from './create-actions-helpers';

import {
  HEADER_CONTENT, 
  MOVIE_INFO,
  GET_DATA,
  ADD_QUERY_PARAMETER,
} from './action-types';


export const [
    headerContent, movieInfo,
    getData, addQueryParameter
  ] = createActions([HEADER_CONTENT, MOVIE_INFO, GET_DATA, ADD_QUERY_PARAMETER]);
  
