import {GET_DATA} from '../actions/action-types';

export const getDataReducer = (
  state={data: null},
  action
  ) => {  
    
  switch (action.type) {
    case GET_DATA:
      return {
        data: action.payload
      };
    default:
      return state;
  }
}
  