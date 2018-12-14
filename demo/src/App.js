import "./App.css";

import React, { Component } from "react";
import { Route } from "react-router-dom";

//Components
import Header from "./components/Header";
import Basic from "./components/BasicExample";
import PropExample from "./components/PropExample";
import CallbackExample from "./components/CallbackExample";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <Route exact path="/" component={Header} />

        <Route path="/example/basic" component={Basic} />

        <Route path="/example/props" component={PropExample} />

        <Route path="/example/callback" component={CallbackExample} />
      </div>
    );
  }
}
