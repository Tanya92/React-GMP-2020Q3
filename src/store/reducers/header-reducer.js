import {HEADER_CONTENT, MOVIE_INFO} from '../actions/action-types';
    
export const headerReducer = (
    state={movieInfo: null},
    action) => {
    switch (action.type) {
        case HEADER_CONTENT:
        return {
            movieInfo: null,
        };
        case MOVIE_INFO:
        return {
            movieInfo: action.payload,
        };
        default:
        return state;
    }
}
    