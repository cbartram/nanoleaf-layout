require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var NanoleafLayout = require('nanoleaf-layout');

var data = {
	"numPanels": 10,
	"sideLength": 150,
	"positionData": [{
		"panelId": 1,
		"x": 100,
		"y": 100,
		"o": 0
	}, {
		"panelId": 2,
		"x": 25,
		"y": -29,
		"o": 240
	}, {
		"panelId": 3,
		"x": 174,
		"y": -29,
		"o": 120
	}, {
		"panelId": 4,
		"x": 99,
		"y": 13,
		"o": 180
	}, {
		"panelId": 5,
		"x": 99,
		"y": -159,
		"o": 0
	}, {
		"panelId": 6,
		"x": 25,
		"y": -116,
		"o": 60
	}]
};

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(NanoleafLayout, {
				data: data,
				xOffset: 0,
				yOffset: 0,
				canvasWidth: 875,
				canvasHeight: 1000
			})
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"nanoleaf-layout":undefined,"react":undefined,"react-dom":undefined}]},{},[1]);
