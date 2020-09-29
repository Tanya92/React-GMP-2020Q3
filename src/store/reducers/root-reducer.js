import { combineReducers } from 'redux';
import { asyncReducer } from './async-reducer';
import {headerReducer} from './header-reducer';
import {queryReducer} from './query-reducer';
import {titleReducer} from './title-reducer'; 

export const rootReducer = combineReducers({
    headerReducer,
    asyncReducer,
    queryReducer,
    titleReducer
})
