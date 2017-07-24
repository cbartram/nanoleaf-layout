/**
 * Created by christianbartram on 7/21/17.
 */
//React & Routing
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

//Custom Components
import Highlight from "react-highlight";
import NanoleafLayout from "../../../src/index";

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

export default class PropExample extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Nanoleaf Layout"
            iconElementRight={<FlatButton label={<Link to="/">Home</Link>} />}
          />
          <div className="row">
            <div className="col-md-6">
              <NanoleafLayout
                data={data}
                xOffset={-150}
                yOffset={130}
                rotation={180}
                opacity={0.8}
                panelSpacing={1.35}
                showId
              />
            </div>
            <div className="col-md-6">
              <Highlight className="javascript">
                {`
    import React, {Component} from 'react';
    import NanoleafLayout from "../../../src/index";

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


    export default class BasicExample extends Component {

        render() {
            return (
                <div>
                    <NanoleafLayout
                        data={data}
                        xOffset={-150}
                        yOffset={130}
                        rotation={180}
                        opacity={.8}
                        panelSpacing={1.35}
                        showId
                     />
                </div>
            );
        }
    }
                               `}
              </Highlight>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
