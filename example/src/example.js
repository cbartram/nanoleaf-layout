var React = require('react');
var ReactDOM = require('react-dom');
var NanoleafLayout = require('nanoleaf-layout');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { ChromePicker } from 'react-color';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';


let data = {
	'numPanels': 10,
	'sideLength': 150,
	'positionData': [{
		'panelId': 1,
		'x': 100,
		'y': 100,
		'o': 0,
		'color': "#00ff00"
	}, {
		'panelId': 2,
		'x': 25,
		'y': -29,
		'o': 240,
        'color': "#2a91fa"
	}, {
		'panelId': 3,
		'x': 174,
		'y': -29,
		'o': 120,
        'color': "#ff199f"
	}, {
		'panelId': 4,
		'x': 99,
		'y': 13,
		'o': 180,
        'color': "#ff8522"
	}, {
		'panelId': 5,
		'x': 99,
		'y': -159,
		'o': 0,
        'color': "#4bffd5"
	}, {
		'panelId': 6,
		'x': 25,
		'y': -116,
		'o': 60,
        'color': "#000000"
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
				width: 1000,
				height: 1000,
				showIds: true,
				strokeWidth: 2,
				rotation: 0,
				hovering: false,
			};
		},

	layoutToString() {
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
					    />
				`);
	},
	
	handleXOffset(value) {
			if(value !== null && value !== '' && value !== '-') {
                this.setState({xOffset: parseInt(value)});
            }
	},
	
	handleYOffset(value) {
        if(value !== null && value !== '' && value !== '-') {
            this.setState({yOffset: parseInt(value)});
        }
	},
	
	handleCanvasHeight(value) {
		this.setState({height: parseInt(value)});
	},
	
	handleCanvasWidth(value) {
		this.setState({width: parseInt(value)});
	},

	handlePanelSpacing(value) {
        if(value !== null && value !== '') {
            this.setState({panelSpacing: parseFloat(value)});
        }
	},
	
	handleColorChange(color) {
		this.setState({strokeColor: color.hex}, () => {
			
		});	
	},

	handleStrokeWidth(value) {
        if(value !== null && value !== '') {
            this.setState({strokeWidth: parseInt(value)});
        }
	},

	handleToggle(value) {
		this.setState({showIds: value});
	},

	handleSlider(value) {
		this.setState({rotation: value});
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
											<ChromePicker
												color={this.state.strokeColor}
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
					height={this.state.height}
					width={this.state.width}
					panelSpacing={this.state.panelSpacing}
					strokeColor={this.state.strokeColor}
					showId={this.state.showIds}
					strokeWidth={this.state.strokeWidth}
					rotation={this.state.rotation}
					onHover={(data) => {console.log('Hovering....')}}
					onClick={(data) => {console.log('Clicked!')}}
					onDraw={(svg) => {console.log('Drawing....')}}
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
