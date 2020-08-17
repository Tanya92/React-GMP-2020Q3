import React from "react";
import ReactDOM from "react-dom";

import Header from "./header";
import Main from "./main";
import Footer from './footer';
import ErrorBoundary from '../utils/error-boundary';

import '../styles/app.less';
import '../styles/reset.css';

const App = () => {

  return (
      <>
        <Header />
        <Main />
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <App />,
  rootElement
);