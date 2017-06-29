# Nanoleaf Layout

Introducing Nanoleaf Layout! The **only** package on NPM which takes your physical Nanoleaf layout and displays
it in **any** 2D application. Nanoleaf Layout will take in the confusing `X,Y` coordinates and Orientation that comes from Nanoleaf's 
OpenAPI and convert it into a useful 2D graphic visual which you can place in your application! 

This visual helps show the user what their current Nanoleaf layout looks like even if they are half way across the world! 

## Demo & Examples

You can edit the values in the panel during the demo to see how it changes the nanoleaf layout! 

Live demo: [cbartram.github.io/nanoleaf-layout](http://cbartram.github.io/nanoleaf-layout/)

To build the examples locally clone this repository, `cd` into the directory's root and simply run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

You will see a simple 6 panel layout and how Nanoleaf Layout correctly renders it on screen!


## Installation

The easiest way to use nanoleaf-layout is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `lib/nanoleaf-layout.js` in your page (e.g. `import NanoleafLayout from 'nanoleaf-layout/lib/nanleaf-layout'`). 
If you use this, make sure you have already included React, and it is available as a global variable as Nanoleaf Layout is a React component and React is a dependency.

```
npm install nanoleaf-layout --save
```


## Usage

Nanoleaf is super easy to use in any React project!

After installing `nanoleaf-layout` from NPM be sure to include it in your React Component by doing 

**Ensure you import NanoleafLayout from the /lib/nanoleaf-layout directory** as this includes the transpiled source code.

`import NanoleafLayout from 'nanoleaf-layout/lib/nanoleaf-layout'`

Now your all set to include the component in your `render()` method!

```
let data = {
	layoutData: [
		{
			panelId: 1,
			x: 100,
			y: 100,
			o: 180
		}
		...
	]
};

<NanoleafLayout
	data={data}
/>
```

The only property which is required for Nanoleaf to function is the `data` property. The data set **must** include a property 
called `layoutData` and its values must be an array of layout objects. 

Please see the next section titled Properties for information about all the nanoleaf-layout properties, their default values, and their descriptions.

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

### Notes

Please ensure that your data property is formatted correctly, 

Nanoleaf Layout will automatically search for the `layoutData` key in the given data set which must be an array of tiles (even if only one tile exists).
The best way to ensure that the data is correct is to make a GET request to your nanoleaf for its layout information. 

You can do this simply in the [Postman App](https://www.getpostman.com/). Find the IP address of your nanoleaf and make a GET
request to its IP for example. `http://172.17.193.17:16021/api/v1/YOUR_API_TOKEN/`

Simply take the `PanelLayout {...}` portion of the response and pass it into the `<NanoleafLayout />` component.

For more information about how to get this data check out the Nanoleaf Developer Documentation.


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT General Use License

Copyright (c) 2017 Christian Bartram.

