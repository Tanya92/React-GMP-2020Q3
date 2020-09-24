import {ADD_QUERY_PARAMETER} from '../actions/action-types';

export const queryReducer = (
    state={ 
        filter : undefined,
        sortBy: '',
        sortOrder: ''
    },
    action) => {
    switch (action.type) {
        case ADD_QUERY_PARAMETER:
        return {
            ...state,
            ...action.payload
        };
        default:
        return state;
    }
}