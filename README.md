# Nanoleaf Layout

[![Build Status](https://travis-ci.org/cbartram/nanoleaf-layout.svg?branch=master)](https://travis-ci.org/cbartram/nanoleaf-layout)
[![NPM version](https://img.shields.io/npm/v/nanoleaf-layout.svg)](https://www.npmjs.com/package/nanoleaf-layout)
[![codecov](https://codecov.io/gh/cbartram/nanoleaf-layout/branch/development/graph/badge.svg)](https://codecov.io/gh/cbartram/nanoleaf-layout)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](#badge)


Introducing Nanoleaf Layout! The **only** package on NPM which takes your physical Nanoleaf layout and displays
it in **any** 2D application. Nanoleaf Layout will take in the confusing `X,Y` coordinates and Orientation that comes from Nanoleaf's 
OpenAPI and converts it into a useful 2D graphic visual which you can place in your application! 

With this API you can visualize colors, position, orientation and even hook into hover and click events for the Nanoleaf layout!

Lets dive in and see how it works!

## Demo & Examples

You can edit the values in the panel during the demo to see how the nanoleaf layout changes and updates! 

Live demo: [cbartram.github.io/nanoleaf-layout](http://cbartram.github.io/nanoleaf-layout/)

To build the examples locally clone this repository, `cd` into the directory's root and simply run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

You will see a simple 6 panel layout and how Nanoleaf Layout correctly renders it on screen!
To edit the web application look in the `/example` directory and modify the `example.js` file. 


## Installation

The easiest way to use nanoleaf-layout is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone **commonJS build** by including `lib/index.js` in your page (e.g. `import NanoleafLayout from 'lib/index'`). 

However, if you would rather use the ES6 Build you can include it by importing from the `es/` directory. (e.g. `import NanoleafLayout from 'es/index`)

If you use this, make sure you have already included React, and it is available as a global variable as Nanoleaf Layout is therefore a React component and React is a dependency.

```
npm install nanoleaf-layout --save
```


## Usage

Nanoleaf is super easy to use in any React project!

After installing `nanoleaf-layout` from NPM be sure to include it in your React Component by doing `import NanoleafLayout from 'nanoleaf-layout/lib/nanoleaf-layout'`

**Ensure you import NanoleafLayout from the /lib/nanoleaf-layout directory** as this includes the trans-piled production ready source code.

Now your all set to include the component in your `render()` method. Below is a **bare minimum** example of Nanoleaf in action!

```jsx
import React, {Component} from 'react'
import NanoleafLayout from "nanoleaf-layout/lib/nanoleaf-layout";

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

### Changing Panel Colors

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

By adding a Hexadecimal color code property into the position data it will tell nanoleaf-layout to change the color of that particular panel

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
    },
    {
      panelId: 2,
      x: 120,
      y: -50,
      o: 180,
      color: '#ffd033',
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
| `panelSpacing`    | Integer           | 1.37                                                               | Defines how much space is between each panel. A greater value will put **less** space in between panels. 1.37 is the recommended and default value.                                                                                                                   | `<NanoleafLayout panelSpacing={1.37} />`                                                                                                                    |
| `strokeColor`     | String            | #FFFFFF                                                            | Hexadecimal color code defining what color the stroke should be on the panels. This must include the `#` sign                                                                                                                                                         | `<NanoleafLayout strokeColor={'#00FF00'} />`                                                                                                                 |
| `onDraw`          | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs **each time** a new panel is drawn. It will return an array of data representing physical points where each corner of the equilateral triangle is location. e.g `[100.792, 200.11, -380.90]`                                           | `<NanoleafLayout onDraw={(data) => { console.log(data) }}`                                                                                                  |
| `xOffset`         | Integer           | 0                                                                  | Integer value to offset on the X axis. A higher xOffset value will shift the entire graphic to the left (in the positive X direction) This property is required, however, if you dont need any x offset then a value of 0 can be specified                            | `<NanoleafLayout xOffset={120} />`                                                                                                                          |
| `yOffset`         | Integer           | 0                                                                  | Integer value to offset on the Y axis. A higher yOffset value will shift the entire graphic down (in the positive Y direction because of the HTML canvas's grid) This property is required, however, if you dont need any Y offset then a value of 0 can be specified | `<NanoleafLayout yOffset={120} />`                                                                                                                          |
| `canvasWidth`     | Integer           | 1000                                                               | Integer value to define the maximum width of the HTML canvas onto which all graphics will be displayed. This property is a required value greater than 0                                                                                                              | `<NanoleafLayout canvasWidth={500} />`                                                                                                                      |
| `canvasHeight`    | Integer           | 1000                                                               | Integer value to define the maximum height of the HTML canvas. This property is a required property greater than 0                                                                                                                                                    | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `showId`          | Boolean           | false                                                              | Boolean value that when true tells the Nanoleaf-layout to display their respective panelIds which identifies each panel uniquely.                                                                                                                                                   | `<NanoleafLayout showId={true}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `strokeWidth`     | Integer           | 2                                                                  | Integer value that defines how wide the stroke is on the outside of each triange. The larger the number the wider the stroke.                                                                                                                                                | `<NanoleafLayout strokeWidth={5}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `rotation`        | Integer           | 0                                                                  | Integer value that defines how the canvas should rotate to display the layout. This **must** be an integer value **between 0 and 360**. The entire layout will rotate clockwise as the value increases                                                                                                                                                | `<NanoleafLayout rotation={180}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `onHover`         | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs when any of the panels are hovered over. The callback returns a SVG Object see the SVG object section for more details                                                                                                                                               | `<NanoleafLayout onHover={(data) => {}}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |                                         
| `onClick`         | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs when any of the panels are clicked. The callback returns a SVG Object see the SVG object section for more details                                                                                                                                               | `<NanoleafLayout onClick={(data) => {}}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `onExit`          | Function          | Callback function with an empty body. `(data) => { }`              | Callback function which occurs when a mouse exits a panels area. The callback returns a SVG Object see the SVG object section for more details                                                                                                                                               | `<NanoleafLayout onExit={(data) => {}}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |
| `opacity`         | Integer           | 1                                                                  | Integer value between .1 and 1.0 which defines how opaque the entire layout becomes. .1 will make the layout barely visible whereas 1.0 will make it completely opaque.                                                                                                                                           | `<NanoleafLayout opacity={.5}`                                                                                                                        |                                                                                                                                                  | `<NanoleafLayout canvasHeight={500}`                                                                                                                        |



### SVG Object

The SVG object makes it extremely easy to understand what data the nanoleaf layout is referring too.
It acts as a container for all the information a developer needs when he/she is interacting with the data surrounding
any of the panels.

The properties include: 

- `topPoint` The x and y coordinate of the top point of the panel as an array of values. The x coordinate is the 0th position and the y coordinate is the 1st position
- `leftPoint` The x and y coordinate of the left point the of the panel as an array. The x coordinate is the 0th position and the y coordinate is the 1st position
- `rightPoint` The x and y coordinate of the right point the of the panel as an array. The x coordinate is the 0th position and the y coordinate is the 1st position
- `rotated` Boolean true if the panel was rotate (if its upside down) and false if it is upright.
- `color` Hexadecimal color code of the panel
- `path` The SVG path of the panel used to draw on the DOM
- `id` The panel's unique identifier plain and simple
- `panelID` **Object** (not just the panel id) containing the id of the panel, as well as the x and y coordinates of the `panelID` which is drawn onto the actual panel. This contains the data which is used in the `showId` prop and determines
 where to draw the panels ID on top of the panel itself.
 
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

Simply take the `PanelLayout {...}` portion of the response and pass it into the `<NanoleafLayout />` component.

For more information about how to get this data check out the Nanoleaf Developer Documentation.

**AS OF VERSION 2.1.0** Nanoleaf has been renamed to index.js so this could potentially break your code. 
When you are importing Nanoleaf ensure you change your code to import  `index.js` instead of `nanoleaf-layout.js` (e.g. `import NanoleafLayout from 'lib/index'`)


## Whats New

As of version `2.0.0` Nanoleaf layout has been completely rewritten in an SVG format instead of using HTML 5's Canvas.
This means its much more flexible from a development perspective and it brings new features like event hooks!

You can now hook into `onClick` `onExit` and `onHover' Mouse events for each and every panel. Panels in the nanoleaf layout have
been synchronized and each provides a unique SVG object in a callback function which includes all the information about the panel
that's being interacted with! See the SVG Object above! 

Let me know what you think about nanoleaf layout by submitting issues to the Github repo or contributing!

[Nanoleaf Layout Github](https://github.com/cbartram/nanoleaf-layout)

## License

MIT General Use License

Copyright (c) 2017 Christian Bartram.

