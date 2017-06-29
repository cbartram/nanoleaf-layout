var React = require('react');
var ReactDOM = require('react-dom');
var NanoleafLayout = require('nanoleaf-layout');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

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
				onDraw: false,
				panelSpacing: 1.37,
				strokeColor: '#FFFFFF',
				canvasWidth: 500,
				canvasHeight: 500,
			};
		},

	
	getNanoleafLayout() {
		//Gets the string representation of the Nanoleaf layout	
		return (<NanoleafLayout
			data={data}
			xOffset={this.state.xOffset}
		/>);
	},
	
	handleXOffset(value) {
		this.setState({xOffset: parseInt(value)});		
	},
	
	render () {
		return (
			<div>
				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<div>
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
							</CardActions>
						</Card>
						{this.getNanoleafLayout()}
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
