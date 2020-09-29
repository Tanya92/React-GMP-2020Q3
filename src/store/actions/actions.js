import { createActions } from './create-actions-helpers';

import {
  HEADER_CONTENT, 
  MOVIE_INFO,
  GET_DATA,
  ADD_QUERY_PARAMETER,
  ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE,
  PRESS_ADD_BUTTON, PRESS_EDIT_BUTTON, PRESS_DELETE_BUTTON
} from './action-types';


export const [
    headerContent, movieInfo,
    getData, addQueryParameter,
    addMovie, editMovie, deleteMovie,
    pressAddButton, pressEditButton, pressDeleteButton
  ] = createActions([
    HEADER_CONTENT, MOVIE_INFO, 
    GET_DATA, ADD_QUERY_PARAMETER, 
    ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE, 
    PRESS_ADD_BUTTON, PRESS_EDIT_BUTTON, PRESS_DELETE_BUTTON
  ]);
  
