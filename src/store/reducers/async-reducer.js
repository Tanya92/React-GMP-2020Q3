import {GET_DATA, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE} from '../actions/action-types';

export const asyncReducer = (
  state={
    data: null, 
    isGoodResponse: true
  },
  action
  ) => {  

  switch (action.type) {
    case GET_DATA:
      return {
        data: action.payload,
        isGoodResponse: false, 
      };  
    case ADD_MOVIE:
      return {
        ...state,
        isGoodResponse: true  
      };
    case EDIT_MOVIE:
      return {
        ...state,
        data: null,
        isGoodResponse: true 
      };
    case DELETE_MOVIE:
      return {
        ...state,
        isGoodResponse: true 
    };    
    default:
      return state;
  }
}
  