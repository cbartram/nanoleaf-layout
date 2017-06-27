var React = require('react');
var ReactDOM = require('react-dom');
var NanoleafLayout = require('nanoleaf-layout');

var App = React.createClass({
	render () {
		return (
			<div>
				<NanoleafLayout />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
