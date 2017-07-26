/**
 * Created by christianbartram on 7/21/17.
 */
import React, { Component } from "react";
import NanoleafLayout from "../../../src/index";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

import { Link } from "react-router-dom";
import Highlight from "react-highlight";

let data = {
  numPanels: 6,
  sideLength: 150,
  positionData: [
    {
      panelId: 1,
      x: 100,
      y: 100,
      o: 0
    },
    {
      panelId: 200,
      x: 25,
      y: -29,
      o: 240
    },
    {
      panelId: 30,
      x: 174,
      y: -29,
      o: 120
    },
    {
      panelId: 4,
      x: 99,
      y: 13,
      o: 180
    },
    {
      panelId: 50,
      x: 99,
      y: -159,
      o: 0
    },
    {
      panelId: 600,
      x: 25,
      y: -116,
      o: 60
    }
  ]
};

export default class BasicExample extends Component {
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
              <NanoleafLayout data={data} useViewbox={true} />
            </div>
            <div className="col-md-6">
              <Highlight className="javascript">
                {`
    import React, {Component} from 'react';
    import NanoleafLayout from "../../../src/index";

    let data = {
        numPanels: 6,
        sideLength: 150,
        positionData: [
            {
                panelId: 1,
                x: 100,
                y: 100,
                o: 0,
            },
            {
                panelId: 200,
                x: 25,
                y: -29,
                o: 240,
            },
            {
                panelId: 30,
                x: 174,
                y: -29,
                o: 120,
            },
            {
                panelId: 4,
                x: 99,
                y: 13,
                o: 180,
            },
            {
                panelId: 50,
                x: 99,
                y: -159,
                o: 0,
            },
            {
                panelId: 600,
                x: 25,
                y: -116,
                o: 60,
            }
        ]
    };

    export default class BasicExample extends Component {

        render() {
            return (
                <div>
                    <NanoleafLayout data={data}/>
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
