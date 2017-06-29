var React = require('react');
var ReactDOM = require('react-dom');
var NanoleafLayout = require('nanoleaf-layout');

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
	render () {
		return (
			<div>
				<NanoleafLayout
					data={data}
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
