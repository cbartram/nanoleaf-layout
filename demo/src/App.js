import "./App.css";

import React, { Component } from "react";
import {Route} from 'react-router-dom';

//Components
import Header from "./components/Header";
import Basic from "./components/BasicExample";
import PropExample from "./components/PropExample";


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container-fluid">
          <Route exact path="/" component={Header}>
              <Header />
          </Route>

          <Route path="/example/basic" component={Basic} >
            <Basic/>
          </Route>

          <Route path="/example/props" component={PropExample} >
            <Basic/>
          </Route>

        </div>
    );
  }
}
