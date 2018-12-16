<p align="center">
  <img src="./resources/images/logo.png" />
</p>

# Nanoleaf Layout

[![Build Status](https://travis-ci.org/cbartram/nanoleaf-layout.svg?branch=development)](https://travis-ci.org/cbartram/nanoleaf-layout)
[![NPM version](https://img.shields.io/npm/v/nanoleaf-layout.svg)](https://www.npmjs.com/package/nanoleaf-layout)
[![Coverage Status](https://coveralls.io/repos/github/cbartram/nanoleaf-layout/badge.svg?branch=development)](https://coveralls.io/github/cbartram/nanoleaf-layout?branch=development)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](#badge)


Nanoleaf Layout is the **only** package on NPM which takes your physical Nanoleaf layout and displays
it in any 2D application. Nanoleaf Layout will take in the confusing `X,Y` coordinates and Orientation that comes from Nanoleaf's 
OpenAPI and converts it into a useful 2D graphic visual which you can use in your React application! 

Nanoleaf is a revolutionary smart lighting product which is fun and easy to use! It can be connected into different patterns with varying effects and colors.
Their development documentation can be fairly confusing for developers when it comes to how their layout data is organized so I created this library to make it easy for developers to mimic the
Nanoleaf's physical layout on a screen. Ultimately this helps open up new doors that allow users to intuitively interact with their Nanoleaf
on a computer, phone, or tablet!

With this React Component and API you can visualize colors, position, orientation and even hook into hover and click events for the Nanoleaf layout!

Check out our Demo & Examples section to see the layout in action.

## Demo & Examples

You can edit the values in the panel during the demo to see how the nanoleaf layout changes and updates! 

Live demo: [http://cbartram.github.io/nanoleaf-layout-demo](http://cbartram.github.io/nanoleaf-layout-demo/)

To build the examples locally clone this repository, `cd` into the directory's root and simply run:

```
npm install
```

Since this is just a react component you will need to include it in a React project before you can see its full effects. If you would
like to see a demo of the component in Action checkout the [Nanoleaf Layout Live Demo](http://cbartram.github.io/nanoleaf-layout-demo/)

## Installation

The easiest way to use nanoleaf-layout is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

To install from NPM simply run:

```
npm install --save nanoleaf-layout
```

## Usage

Nanoleaf is super easy to use in any React **or non React** project!

After installing `nanoleaf-layout` from NPM be sure to include it in your React Component by doing `import NanoleafLayout from 'nanoleaf-layout/lib/NanoleafLayout'`

Now your all set to include the component in your `render()` method! Below is a **bare minimum** example of Nanoleaf in action!

```jsx
import React, {Component} from 'react'
import NanoleafLayout from "nanoleaf-layout/lib/NanoleafLayout";

let data = {
  sideLength: 150,
  numPanels: 1,
  positionData: [
    {
        panelId: 107,
        x: -74,
        y: 43,
        o: 180
    },
  ],
};

export default class App extends Component {
  render() {
    return (
      <NanoleafLayout
        data={data}
        //Other props can go here to customize the layout!
      />;
    );
  }
}
```

The only property which is required for Nanoleaf to function is the `data` property. The data set **must** include a property 
called `positionData` and its values must be an array of layout objects (even if its an empty array). The data object
tells the nanoleaf-layout how the physical nanoleaf is positioned with a set of X,Y Coordinates and Orientation.

The best way to ensure that your `data` prop is formatted correctly is to make a REST API call to your nanoleaf requesting information
from it. From here you can easily pass the data right into the React Component

To make a REST call to your nanoleaf send a GET request to `http://YOUR_NANOLEAF_IP/api/v1/YOUR_AUTH_TOKEN/`

### Changing Panel and Stroke Colors

Its simple to control the stroke width and color of the Nanoleaf with the `strokeWidth` and `strokeColor` but sometimes you
may want to control the actual color of the panels themselves.

Nanoleaf layout achieves this through a color property in each of the elements in the `positionData` array.
By default the Nanoleaf OpenAPI returns the nanoleaf layout data **without** a color property so it looks something like this

```
{
  sideLength: 150,
  numPanels: 9,
  positionData: [
    {
      panelId: 1,
      x: 100,
      y: 100,
      o: 180,
    },
    ...
  ],
};
```

By adding a Hexadecimal color code property into the position data it will tell nanoleaf-layout to change the color of that particular panel.
You can do the same thing with the `strokeColor` property to control the stroke color of the panel instance.

The new positionData will look something like this

```
 {
  sideLength: 150,
  numPanels: 9,
  positionData: [
    {
      panelId: 1,
      x: 100,
      y: 100,
      o: 180,
      color: '#00ff00',
      strokeColor: '#B2EEF0'
    },
    {
      panelId: 2,
      x: 120,
      y: -50,
      o: 180,
      color: '#ffd033',
      strokeColor: '#B2EEF0'
    },
  ],
};
```

This allows one to explicitly set and update the color of each panel quickly and easily! 
Please see the next section titled Properties below for information about all the nanoleaf-layout properties, their default values, and their descriptions.

### Properties

| **Property Name** | **Property Type** | **Default Value**                                                  | **Property Description**                                                                                                                                                                                                                                              | **Example**                                                                                                                                                 |
|-------------------|:-----------------:|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`            | Object            | None this property is **required** for nanoleaf-layout to function | The panel data received from the Nanoleaf OpenAPI GET request made to `/api/v1/YOUR_API_KEY/` Its comprised of a `panelData` key and an array of panel objects see the example in the next column                                                                     | ```  {  layoutData: [       {         panelId: 1,         x: 100,        y: 100,        o: 180,        color: '#00FF00'        }       ........   ]  }  ``` |
| `onDraw`          | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs **each time** a new panel is drawn. It will return an array of data representing physical points where each corner of the equilateral triangle is location. e.g `[100.792, 200.11, -380.90]`                                           | `<NanoleafLayout onDraw={(data) => { console.log(data) }}`                                                                                                  |
| `onHover`         | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs when any of the panels are hovered over. The callback returns a SVG Object see the SVG object section for more details                                                                                                                                               | `<NanoleafLayout onHover={(data) => {}} />`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |                                         
| `onClick`         | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs when any of the panels are clicked. The callback returns a SVG Object see the SVG object section for more details                                                                                                                                               | `<NanoleafLayout onClick={(data) => {}} />`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `onExit`          | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs when a mouse exits a panels area. The callback returns a SVG Object see the SVG object section for more details                                                                                                                                               | `<NanoleafLayout onExit={(data) => {}} />`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `svgStyle`        | Object            | {}                                                                 | React Object representing the Style of the SVG JSX element.                                                                                                                                                                                                              | `<NanoleafLayout svgStyle={{ opacity: .5 }} />`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `gStyle`        | Object            | {}                                                                 | React Object representing the Style of the G JSX element.                                                                                                                                                                                                              | `<NanoleafLayout gStyle={{ color: 'green' }} />`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `development`        | boolean            | false                                                                 | Shows Developer information like true 0 offset position and centroid of each triangle in the Nanoleaf Layout                                                                                                                                                                                                              | `<NanoleafLayout developer />`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |



### Styling the Nanoleaf Layout

Nanoleaf Layout gives developers full control over how each individual panel is styled. The layout itself is made up of an `<svg>` object and several nested `<g>` objects
within it. You can control the individual style by passing the `svgStyle` or `gStyle` props to the Nanoleaf Layout like so:

```jsx
<NanoleafLayout
    data={...}
    svgStyle={{backgroundColor: 'blue'}}
    gStyle={{ border: '3px' }}
/>
``` 

### Callback's and Events

With Nanoleaf Layout you can hook into events such as `onClick`, `onHover`, and `onDraw` to take action within your application.

For example lets say you wanted to execute a piece of code only when the panel with the panel ID of `4` is clicked.
You can easily accomplish this with just a few lines of code!
 
```jsx
import NanoleafLayout from "nanoleaf-layout/lib/nanoleaf-layout";
import React, {Component} from 'react';

let data = {
  positionData: [
    {
      panelId: 1,
      x: 100,
      y: 100,
      o: 180,
    },
  ],
};

export default class App extends Component {

  handlePanelFourClick = id => {
    //Is the panel id 4?
    id === 4 ? console.log('Panel 4 has been clicked!') : console.log('Wrong Panel Clicked!');
  };

  render() {
    return (
      <NanoleafLayout
        data={data}
        onClick={data => {
          this.handlePanelFourClick(data.id.id); //Hook into the onClick event, data is the SVG Object being returned
        }}
      />
    );
  }
}
```

### More Examples

#### Update panel **3's** color from lime green to white if its hovered over!

 ```jsx
 import NanoleafLayout from "nanoleaf-layout/lib/nanoleaf-layout";
import React, {Component} from 'react';

let data = {
  sideLength: 150,
  numPanels: 9,
  positionData: [
    {
      panelId: 3,
      x: 100,
      y: 100,
      o: 180,
      color: "#00ff00"
    },
    {
      panelId: 4,
      x: 120,
      y: -50,
      o: 180,
      color: "#ffd033"
    }
  ]
};

export default class App extends Component {

  handlePanelThreeClick = (id, data) => {
    if (id === 3) {
      //Get the Key in the position data array for the color we want to update
      let key = data.positionData.findIndex(x => x.panelId == id);

      //Update the color!
      data[key].color = "#FFFFFF";
    } else {
      console.log("Wrong Panel...");
    }
  };
  render() {
    return (
      <NanoleafLayout
        data={data}
        onHover={svg => {
          this.handlePanelThreeClick(svg.id.id, data);
        }} //Hook into the onHover event, svg is the SVG Object being returned and data is the position data
      />
    );
  }
}

```

### Notes

Please ensure that your data property is formatted correctly, 

Nanoleaf Layout will automatically search for the `positionData` key in the given data set which must be an array of tiles (even if only one or no tiles exists).
The best way to ensure that the data is correct is to make a GET request to your nanoleaf for its layout information. 

You can do this simply in the [Postman App](https://www.getpostman.com/). Find the IP address of your nanoleaf and make a GET
request to its IP for example. `http://172.17.193.17:16021/api/v1/YOUR_API_TOKEN/`

If you are passing this information directly into the nanoleaf layout component make sure you map over it first and add any additional `color` or `strokeColor` props to each object!

For more information about how to get this data check out the Nanoleaf Developer Documentation.

## Whats New

As of version `2.0.0` Nanoleaf layout has been completely rewritten in an SVG format instead of using HTML 5's Canvas.
This means its much more flexible from a development perspective and it brings new features like event hooks!

You can now hook into `onClick` `onExit` and `onHover` Mouse events for each and every panel. Panels in the nanoleaf layout have
been synchronized and each provides a unique SVG object in a callback function which includes all the information about the panel
that's being interacted with!

Let me know what you think about Nanoleaf Layout by submitting issues to the Github repo or contributing!

[Nanoleaf Layout Github](https://github.com/cbartram/nanoleaf-layout)

## License

MIT General Use License

Copyright (c) 2017 Christian Bartram.

