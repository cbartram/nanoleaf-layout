var React = require('react');
var ReactDOM = require('react-dom');
var NanoleafLayout = require('nanoleaf-layout');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { ChromePicker } from 'react-color';


let data = {
	'numPanels': 10,
	'sideLength': 150,
	'positionData': [{
		'panelId': 1,
		'x': 100,
		'y': 100,
		'o': 0,
	}, {
		'panelId': 2,
		'x': 25,
		'y': -29,
		'o': 240,
	}, {
		'panelId': 3,
		'x': 174,
		'y': -29,
		'o': 120,
	}, {
		'panelId': 4,
		'x': 99,
		'y': 13,
		'o': 180,
	}, {
		'panelId': 5,
		'x': 99,
		'y': -159,
		'o': 0,
	}, {
		'panelId': 6,
		'x': 25,
		'y': -116,
		'o': 60,
	}]
};

var App = React.createClass({
	
		getInitialState() {
			return {
				xOffset: 0,
				yOffset: 0,
				onDraw: 0,
				panelSpacing: 1.37,
				strokeColor: '#FFFFFF',
				canvasWidth: 500,
				canvasHeight: 500,
			};
		},

	layoutToString() {
		return (`
					<NanoleafLayout 
						data={data}
						xOffset={${this.state.xOffset}}
						yOffset={${this.state.yOffset}}
						canvasHeight={${this.state.canvasHeight}}
						canvasWidth={${this.state.canvasWidth}}
						panelSpacing={${this.state.panelSpacing}}
					/>
				`);
	},
	
	handleXOffset(value) {
		this.setState({xOffset: parseInt(value)});	
	},
	
	handleYOffset(value) {
		this.setState({yOffset: parseInt(value)});
	},
	
	handleCanvasHeight(value) {
		this.setState({canvasHeight: parseInt(value)});
	},
	
	handleCanvasWidth(value) {
		this.setState({canvasWidth: parseInt(value)});
	},

	handlePanelSpacing(value) {
		this.setState({panelSpacing: parseFloat(value)});
	},
	
	handleColorChange(color) {
		this.setState({strokeColor: color.hex}, () => {
			
		});	
	},
	
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
											<ChromePicker
												color={this.state.color}
												disableAlpha
												onChangeComplete={(color) => { this.handleColorChange(color); }}
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
					canvasHeight={this.state.canvasHeight}
					canvasWidth={this.state.canvasWidth}
					panelSpacing={this.state.panelSpacing}
					onDraw={(v) => { }}
					strokeColor={this.state.strokeColor}
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
