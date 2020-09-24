import { combineReducers } from 'redux';
import { getDataReducer } from './get-data-reducer';
import {headerReducer} from './header-reducer';
import {queryReducer} from './query-reducer';

export const rootReducer = combineReducers({
    headerReducer,
    getDataReducer,
    queryReducer
})
