import './App.css'

import React, {Component} from 'react'
import NanoleafLayout from '../../es/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { ChromePicker } from 'react-color';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import * as API from '../../es/api/layout';


let data = {
    'numPanels': 10,
    'sideLength': 150,
    'positionData': [{
        'panelId': 1,
        'x': 100,
        'y': 100,
        'o': 0,
        'color': "#00ff00",
        'strokeColor': "#2a91fa"
    }, {
        'panelId': 200,
        'x': 25,
        'y': -29,
        'o': 240,
        'color': "#2a91fa",
        'strokeColor': "#00ff00"

    }, {
        'panelId': 30,
        'x': 174,
        'y': -29,
        'o': 120,
        'color': "#ff199f",
        'strokeColor': "#defa42"

    }, {
        'panelId': 4,
        'x': 99,
        'y': 13,
        'o': 180,
        'color': "#ff8522",
        'strokeColor': "#3be8fa"

    }, {
        'panelId': 50,
        'x': 99,
        'y': -159,
        'o': 0,
        'color': "#4bffd5",
        'strokeColor': "#fa2817"

    }, {
        'panelId': 600,
        'x': 25,
        'y': -116,
        'o': 60,
        'color': "#000000",
        'strokeColor': "#fa18f5"

    }]
};

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xOffset: 0,
            yOffset: 0,
            onDraw: 0,
            panelSpacing: 1.37,
            width: 1000,
            height: 1000,
            showIds: true,
            strokeWidth: 2,
            rotation: 0,
            hovering: false,
            opacity: 1,
        }
    }

    layoutToString = () => {
        return (`
					<NanoleafLayout 
						data={data}
						xOffset={${this.state.xOffset}}
						yOffset={${this.state.yOffset}}
						height={${this.state.height}}
						width={${this.state.width}}
						panelSpacing={${this.state.panelSpacing}}
						showId={${this.state.showIds}}
						strokeWidth={${this.state.strokeWidth}}
						rotation={${this.state.rotation}}
						opacity={${this.state.opacity}}
					    />
				`);
    };

    handleXOffset = (value) => {
        if(value !== null && value !== '' && value !== '-') {
            this.setState({xOffset: parseInt(value)});
        }
    };

    handleYOffset = (value) => {
        if(value !== null && value !== '' && value !== '-') {
            this.setState({yOffset: parseInt(value)});
        }
    };

    handleCanvasHeight = (value) => {
        this.setState({height: parseInt(value)});
    };

    handleCanvasWidth = (value) => {
        this.setState({width: parseInt(value)});
    };

    handlePanelSpacing = (value) => {
        if(value !== null && value !== '') {
            this.setState({panelSpacing: parseFloat(value)});
        }
    };

    handleStrokeWidth = (value) => {
        if(value !== null && value !== '') {
            this.setState({strokeWidth: parseInt(value)});
        }
    };

    handleToggle = (value) => {
        this.setState({showIds: value});
    };

    handleSlider = (value) => {
        this.setState({rotation: value});
    };

    handleSliderOpacity = (value) => {
        this.setState({opacity: value});
    };

    render () {
        return (
            <div>
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <Card>
                          <CardHeader
                              title="Control Panel"
                              subtitle="Control Nanoleaf-Layout"
                          />
                          <CardActions>
                            <TextField
                                hintText="X Offset"
                                onChange={(e, value) => this.handleXOffset(value)}
                            />
                            <TextField
                                hintText="Y Offset"
                                onChange={(e, value) => this.handleYOffset(value)}
                            />
                            <TextField
                                hintText="Canvas Height"
                                onChange={(e, value) => this.handleCanvasHeight(value)}
                            />
                            <TextField
                                hintText="Canvas Width"
                                onChange={(e, value) => this.handleCanvasWidth(value)}
                            />
                            <TextField
                                hintText="Panel Spacing"
                                onChange={(e, value) => this.handlePanelSpacing(value)}
                            />
                            <TextField
                                hintText="Stroke Width"
                                onChange={(e, value) => this.handleStrokeWidth(value)}
                            />
                            <Toggle defaultToggled={this.state.showIds} label="Show Ids" style={{marginTop:10}} onToggle={(e, value) => this.handleToggle(value)} />
                            <Slider
                                min={0}
                                max={360}
                                step={1}
                                value={this.state.rotation}
                                onChange={(e, value) => this.handleSlider(value)}
                            />
                              <Slider
                                  min={.1}
                                  max={1.0}
                                  step={.1}
                                  value={this.state.opacity}
                                  onChange={(e, value) => this.handleSliderOpacity(value)}
                              />
                          </CardActions>
                        </Card>
                      </div>
                      <div className="col-md-4">
                        <Card>
                          <CardHeader
                              title="Code Output"
                              subtitle="Live Nanoleaf layout Code"
                          />
                          <CardText>
											<pre>
												<code className="language-javascript hljs">
													{this.layoutToString()}
												</code>
											</pre>
                          </CardText>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </MuiThemeProvider>
              <NanoleafLayout
                  data={data}
                  xOffset={this.state.xOffset}
                  yOffset={this.state.yOffset}
                  height={this.state.height}
                  width={this.state.width}
                  panelSpacing={this.state.panelSpacing}
                  showId={this.state.showIds}
                  strokeWidth={this.state.strokeWidth}
                  rotation={this.state.rotation}
                  opacity={this.state.opacity}
                  onHover={data => console.log('Hovering!')}
                  onClick={data => console.log('Clicked!')}
                  onDraw={svg => console.log('Drawing!')}
              />
            </div>
        );
    }
}
