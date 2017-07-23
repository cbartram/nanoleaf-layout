import "./App.css";

import React, { Component } from "react";
import {Route} from 'react-router-dom';

//Components
import Header from "./components/Header";
import Basic from "./components/BasicExample";
import PropExample from "./components/PropExample";

let data = {
  numPanels: 10,
  sideLength: 150,
  positionData: [
    {
      panelId: 1,
      x: 100,
      y: 100,
      o: 0,
      color: "#00ff00",
      strokeColor: "#2a91fa"
    },
    {
      panelId: 200,
      x: 25,
      y: -29,
      o: 240,
      color: "#2a91fa",
      strokeColor: "#00ff00"
    },
    {
      panelId: 30,
      x: 174,
      y: -29,
      o: 120,
      color: "#ff199f",
      strokeColor: "#defa42"
    },
    {
      panelId: 4,
      x: 99,
      y: 13,
      o: 180,
      color: "#ff8522",
      strokeColor: "#3be8fa"
    },
    {
      panelId: 50,
      x: 99,
      y: -159,
      o: 0,
      color: "#4bffd5",
      strokeColor: "#fa2817"
    },
    {
      panelId: 600,
      x: 25,
      y: -116,
      o: 60,
      color: "#000000",
      strokeColor: "#fa18f5"
    }
  ]
};

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
