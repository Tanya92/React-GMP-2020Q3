import React, {useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Header from "./header";
import Main from "./main";
import Footer from './footer';
import ErrorBoundary from '../utils/error-boundary';

import '../styles/app.less';
import '../styles/reset.css';

const App = () => {
  const [headerContent, setHeaderContent] = useState(null);
  
  useEffect(() => {
    if (headerContent) {
        document.title = 'Movie info';
    }
    return () => document.title = 'React 2020Q3'
})

  return (
      <>
        <Header headerContent={headerContent} setHeaderContent={setHeaderContent}/>
        <Main setHeaderContent={setHeaderContent}/>
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