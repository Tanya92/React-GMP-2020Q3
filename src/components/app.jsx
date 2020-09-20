import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Header from "./header";
import Main from "./main";
import Footer from './footer';
import ErrorBoundary from '../utils/error-boundary';

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../store/reducers/root-reducer';
import thunk  from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState())

import '../styles/app.less';
import '../styles/reset.css';

const App = () => (
  <Provider store={store}>
    <Header />
    <Main />
    <ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  </Provider>
)

const rootElement = document.getElementById("root");

ReactDOM.render(
  <App />,
  rootElement
);