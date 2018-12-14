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
import * as data from '../basic_layout.json';

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
    import * as data from '../basic_layout.json';

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
