import React from "react";

import Header from "./header";
import Main from "./main";

import "../styles/styles.less";

export default class App extends React.Component {

    render() {
        return (
            <div className="app">
              <Header info='Header Class Component' />
              <Main />
            </div>
          );
    }
}