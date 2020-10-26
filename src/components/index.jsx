import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../store/reducers/root-reducer';
import thunk  from 'redux-thunk';

import App from './app';


import PageNotFound from './page-not-found';

const rootElement = document.getElementById("root");

export const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState())

const Index = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App}/>
                <Route path='/error' render={() => <PageNotFound errorMessage='404'/>}/> 
            </Switch> 
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
    <Index />,
  rootElement
);

