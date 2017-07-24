/**
 * Created by g6vc on 7/21/17.
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class PageContent extends Component {

  render() {
    return (
      <section className="main-content">
        <h2>Page Guide</h2>
        <p>
          This page is the central hub to hold all the documentation as well as
          live examples of the Nanoleaf Layout in action. Check out the links to
          some examples below
        </p>
        <h2>Examples</h2>
        <ul>
          <h4>Bare Bones Basic Example</h4>
          <li>
            <p>
              <Link to="/example/basic">This example</Link> includes the most basic
              version of the nanoleaf layout in action
            </p>
          </li>

          <h4>Nanoleaf React Props</h4>
          <li>
            <p>
              <a href="/example/props">This example</a> shows of how to use the
              nanoleaf props to position, style, and track the status of your
              nanoleaf accordingly.
            </p>
          </li>

          <h4>Using onClick and onHover events</h4>
          <li>
            <p>
              <a href="/example/callback">This example</a> includes onClick and onHover
              events so you can add more interactivity to your Nanoleaf. This
              example showcases how users can click directly onto the Nanoleaf
              to select and un-select tiles.
            </p>
          </li>

          <h4>Dynamically Updating your Nanoleaf using NodeJS & Express</h4>
          <li>
            <p>
              <a href="#stroke">This example</a> shows you how to utilize a
              NodeJS & Express server to handle dynamic changes to your nanoleaf
              and how the nanoleaf-layout package is flexible enough to
              accomodate any changes the user makes!
            </p>
          </li>

          <h4>Nanoleaf Tile Grouping</h4>
          <li>
            <p>
              <a href="#stroke">This example</a> makes it extremely easy to
              implement groups of panels which users can select, modify and
              interact with!
            </p>
          </li>
        </ul>
        <h1>Usage & Documentation</h1>
        <p>
          Nanoleaf Layout is the <strong>premier</strong> package on NPM which
          takes your physical Nanoleaf layout and displays it in any 2D application. Nanoleaf Layout will take in the
          confusing <code>X,Y</code> coordinates and Orientation that comes from
          Nanoleafs OpenAPI and converts it into a useful 2D graphic visual
          which you can place in your application!
        </p>
        <p>
          Nanoleaf is a revolutionary smart lighting product which is fun and
          easy to use! It can be connected into different patterns with varying
          effects and colors. Their development documentation can be fairly
          confusing for developers when it comes to how their layout data is
          organized so I created this Library to make it easy for developers to
          mimic the Nanoleafs physical layout on a screen. Ultimately this
          helps open up new doors that allow users to intuitively interact with
          their nanoleaf on a computer, phone, or tablet!
        </p>
        <p>
          With this API you can visualize colors, position, orientation and even
          hook into hover and click events for the Nanoleaf layout!
        </p>
        <p>
          Check out our Demo &amp; Examples section to see the layout in action.
        </p>
        <h2 id="demoexamples">Installation</h2>
        <p>
          The easiest way to use nanoleaf-layout is to install it from NPM and
          include it in your own React build process (using Browserify and Webpack)
        </p>
        <p>
          You can also use the standalone <strong>commonJS build</strong> by
          including <code>lib/index.js</code> in your page (e.g.<code>import NanoleafLayout from 'lib/index'</code>).
        </p>
        <p>
          However, if you would rather use the ES6 Build you can include it by
          importing from the <code>es/</code> directory. (e.g.<code>import NanoleafLayout from 'es/index'</code>)
        </p>
        <p>
          If you use this, make sure you have already included React, and it is
          available as a global variable as Nanoleaf Layout is therefore a React
          component and React is a dependency.
        </p>
        <pre>
          <code>npm install nanoleaf-layout --save</code>
        </pre>
        <h2 id="usage">Usage</h2>
        <p>
          Nanoleaf is a piece of cake to include and use in any React, Angular, Vue, or plain ole javascript project! Nanoleaf-Layout provides you with a simple API (only one method) to allow you to implement the layout in
          quickly and efficiently
        </p>
        <h4>React Projects</h4>
        <blockquote>
          <p>
            After installing <code>nanoleaf-layout</code> from NPM be sure to
            include it in your React Component<code>import NanoleafLayout from 'nanoleaf-layout/lib/nanoleaf-layout'</code>
          </p>
          <p>
            Ensure you import NanoleafLayout from the <code>/lib/nanoleaf-layout</code> directory as this includes the transpiled production ready source code.
          </p>
          <p>
            Now your all set to include the component in your
            <code>render()</code> method. Check out the <a href="#">Bare Minumum Example</a> of Nanoleaf in action!
          </p>
        </blockquote>

        <h4 id="nonreactprojects">Non React Projects</h4>
        <blockquote>
          <p>
           First import the API <code>import * as Nanoleaf from './es/api/layout.js'</code>
          </p>
          <p>
            Not: We must import <code>*</code> all method(s) in the API because it is
            not a React Component.
          </p>
          <p>
            Call <code>Nanoleaf.draw(x, y, orientation, color, id, height, width)</code>
            and it will return an SVG object (see documentation on SVG Objects
            below) with all the data you need to draw the panel correctly on
            screen.
          </p>
          <p>Happy Coding!</p>
        </blockquote>

        <h4 id="data-prop">
          The Data Prop
        </h4>
        <p>
          By Default the Nanoleaf-Layout React Component only requires 1 prop to function. As you might have guessed this
          is the <code>data</code> prop.
        </p>

        <p>
            The data prop originates from the Nanoleaf OpenAPI which comes from the Aurora company themselves not this library. Please see the <a href="https://forum.nanoleaf.me/docs/openapi">Nanoleaf Aurora Developer Documentation</a> for more information on
          the nanoleafs layout JSON data.
        </p>

          <p> To summarize this is what the JSON structure of a single layout element looks like  coming directly from the Nanoleaf OpenAPI</p>

          <div className="language-js highlighter-rouge">
              <pre className="highlight">
                  <code>
                      {
                          `
                 {
                    numPanels: 10,
                    sideLength: 150,
                    positionData: [
                       {
                          panelId: 1,
                          x: 100,
                          y: 100,
                          o: 0,
                       },
                     ]
                 }
                `
                      }
                  </code>
              </pre>
          </div>



          <p>The Nanoleaf Layout package iterates over each element in the positionData array to determine where and how
              to draw each triangle its essential that the <code>x, y and o</code> properties are never modified as it will
              distort the structure of your Nanoleaf layout.

          </p>

          <p>The layout can accept two additional properties within the <code>positionData</code> array they are:</p>

          <ul>
              <li><code>color: '#FFFFFF'</code></li>
              <li><code>strokeColor: '#00FF00'</code></li>
          </ul>

          <p>When these two properties are applied the color or the strokeColor of the individual nanoleaf-layout panel will be changed. See the below example</p>

          <div className="language-js highlighter-rouge">
              <pre className="highlight">
                  <code>
                      {
                          `
                 {
                    numPanels: 10,
                    sideLength: 150,
                    positionData: [
                       {
                          panelId: 1,
                          x: 100,
                          y: 100,
                          o: 0,
                          color: '#FFFFFF',
                          strokeColor: '#00FF00',
                       },
                     ]
                 }
                `
                      }
                  </code>
              </pre>
          </div>

          <p>In the above example the panel with the ID of <code>1</code> would have a white fill and a lime green stroke color</p>
        <p>
          This allows one to explicitly set and update the color of each panel
          quickly and easily!
        </p>
        <p>
          Please see the next section titled Properties below for information
          about all the nanoleaf-layout properties, their default values, and
          their descriptions.
        </p>
        <h4 id="properties">Properties</h4>
          <p>This section defines all the React props the nanoleaf-layout package accepts; It describes their name, type, and their details</p>

          <table>
              <thead>
                <tr>
                    <th>Property Name</th>
                    <th>Property Type</th>
                    <th>Default Property Value</th>
                    <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td><code>data</code></td>
                    <td>Object</td>
                    <td>None this property is required for nanoleaf-layout to function</td>
                    <td>The panel data received from the Nanoleaf OpenAPI GET request made to /api/v1/YOUR_API_KEY/ Its comprised of a panelData key and an array of panel objects see the example in the next column</td>
                </tr>
                <tr>
                    <td><code>panelSpacing</code></td>
                    <td>Double</td>
                    <td>2.00</td>
                    <td>Defines how much space is between each panel. This property is inversely proportional and as such a greater value will put less space in between panels. 2.00 is the recommended and default value.</td>
                </tr>
                <tr>
                    <td><code>xOffset</code></td>
                    <td>Integer</td>
                    <td>0</td>
                    <td>Integer value to offset on the X axis. A higher xOffset value will shift the entire graphic to the left (in the positive X direction)</td>
                </tr>
                <tr>
                    <td><code>yOffset</code></td>
                    <td>Integer</td>
                    <td>0</td>
                    <td>Integer value to offset on the Y axis. A higher yOffset value will shift the entire graphic down (in the positive Y direction)</td>
                </tr>
                <tr>
                    <td><code>width</code></td>
                    <td>Integer</td>
                    <td>1000</td>
                    <td>Integer value to define the maximum width of the HTML SVG element onto which the graphic will be displayed. This property is a required value greater than 0</td>
                </tr>
                <tr>
                    <td><code>height</code></td>
                    <td>Integer</td>
                    <td>1000</td>
                    <td>Integer value to define the maximum height of the HTML SVG element onto which the graphic will be displayed. This property is a required value greater than 0</td>
                </tr>
                <tr>
                    <td><code>showId</code></td>
                    <td>Boolean</td>
                    <td>false</td>
                    <td>Boolean value that when true tells the Nanoleaf-layout to display the respective panelIds as text on top of the panel's layout which identifies each panel uniquely</td>
                </tr>
                  <tr>
                     <td><code>strokeWidth</code></td>
                      <td>Integer</td>
                      <td>2</td>
                      <td>Integer value that defines how wide the stroke is on the outside of each panel. The larger the number the wider the stroke.</td>
                  </tr>
                <tr>
                    <td><code>rotation</code></td>
                    <td>Integer</td>
                    <td>0</td>
                    <td>Integer value that defines how the canvas should rotate to display the layout. This must be an integer value between 0 and 360. The entire layout will rotate clockwise as the value increases</td>
                </tr>
                <tr>
                    <td><code>opacity</code></td>
                    <td>Double</td>
                    <td>1</td>
                    <td>Integer value between .1 and 1.0 which defines how opaque the entire layout becomes. .1 will make the layout barely visible whereas 1.0 will make it completely opaque.</td>
                </tr>
              </tbody>
          </table>

          <p>The following table describes the callback functions which developers can hook into to add additional interactivity to their nanoleaf layouts!</p>

          <table>
              <thead>
              <tr>
                  <th>Property Name</th>
                  <th>Property Type</th>
                  <th>Default Property Value</th>
                  <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td><code>onDraw</code></td>
                  <td>Function</td>
                  <td>Callback function with an empty body. (data) => { }</td>
                  <td>Callback function which occurs each time a new panel is drawn. It will return an array of data representing physical points where each corner of the equilateral triangle is location. e.g [100.792, 200.11, -380.90]</td>
              </tr>
              <tr>
                  <td><code>onHover</code></td>
                  <td>Function</td>
                  <td>Callback function with an empty body. (data) => { }</td>
                  <td>Callback function which occurs when any of the panels are hovered over. The callback returns a SVG Object see the SVG object section for more details</td>
              </tr>
              <tr>
                  <td><code>onClick</code></td>
                  <td>Function</td>
                  <td>Callback function with an empty body. (data) => { }</td>
                  <td>Callback function which occurs when any of the panels are clicked. The callback returns a SVG Object see the SVG object section for more details</td>
              </tr>
              <tr>
                  <td><code>onExit</code></td>
                  <td>Function</td>
                  <td>Callback function with an empty body. (data) => { }</td>
                  <td>Callback function which occurs when a mouse exits a panels area. The callback returns a SVG Object see the SVG object section for more details</td>
              </tr>
              </tbody>
          </table>


        <h4 id="svgobject">SVG Object</h4>
        <p>
          The SVG object makes it extremely easy to understand what data the
          nanoleaf layout is referring too. It acts as a container for all the
          information a developer needs when he/she is interacting with the data
          surrounding any of the panels.
        </p>
        <p>The properties include: </p>
        <ul>
          <li>
            <p>
              <code>topPoint</code> The x and y coordinate of the top point of
              the panel as an array of values. The x coordinate is the 0th
              position and the y coordinate is the 1st position
            </p>
          </li>

          <li>
            <p>
              <code>leftPoint</code> The x and y coordinate of the left point
              the of the panel as an array. The x coordinate is the 0th position
              and the y coordinate is the 1st position
            </p>
          </li>

          <li>
            <p>
              <code>rightPoint</code> The x and y coordinate of the right point
              the of the panel as an array. The x coordinate is the 0th position
              and the y coordinate is the 1st position
            </p>
          </li>

          <li>
            <p>
              <code>rotated</code> Boolean true if the panel was rotate (if its
              upside down) and false if it is upright.
            </p>
          </li>

          <li>
            <p>
              <code>color</code> Hexadecimal color code of the panels body
            </p>
          </li>

          <li>
            <p>
              <code>selected</code> This property is a simple boolean value
              which can be used in an application to state whether or not the
              panel is currently selected by the user. This can easily be used
              to determine if the panel should be "acted upon" by a users
              actions. For instance: If <code>selected</code> is false for the
              panel with the ID <code>5</code> and the user changes the color of
              the Nanoleaf then you can choose to change the color of every
              other panel except for <code>5</code> using the
              <code>selected</code> property.
            </p>
          </li>

          <li>
            <p>
              <code>strokeColor</code> Hexadecimal color code for the panels
              currently set stroke
            </p>
          </li>

          <li>
            <p>
              <code>path</code> The SVG path of the panel used to draw on the
              DOM
            </p>
          </li>

          <li>
            <p>
              <code>id</code> The panels unique identifier plain and simple
            </p>
          </li>

          <li>
            <p>
              <code>panelID</code> <strong>Object</strong> (not just the panel
              id) containing the id of the panel, as well as the x and y
              coordinates of the <code>panelID</code> which is drawn onto the
              actual panel. This contains the data which is used in the
              <code>showId</code> prop and determines where to draw the panels
              ID on top of the panel itself.
            </p>

            <p>
              For example lets say you wanted to execute a piece of code only
              when the panel with the panel ID of <code>4</code> is clicked. You
              can easily accomplish this with just a few lines of code!
            </p>
          </li>
        </ul>
        <h4 id="notes">Notes</h4>
        <p>Please ensure that your data property is formatted correctly, </p>
        <p>
          Nanoleaf Layout will automatically search for the
          <code>positionData</code> key in the given data set which must be an
          array of tiles (even if only one or no tiles exists). The best way to
          ensure that the data is correct is to make a GET request to your
          nanoleaf for its layout information.
        </p>
        <p>
          You can do this simply in the <a href="https://www.getpostman.com/">Postman App</a>. Find the IP
          address of your nanoleaf and make a GET request to its IP for example.
          <code>http://172.17.193.17:16021/api/v1/YOUR_API_TOKEN/</code>
        </p>
        <p>
          Simply take the <code>PanelLayout</code> portion of the response and
          pass it into the <code>&lt;NanoleafLayout /&gt;</code> component.
        </p>
        <p>
          For more information about how to get this data check out the Nanoleaf
          Developer Documentation.
        </p>
        <p>
          <strong>AS OF VERSION 2.1.0</strong> Nanoleaf has been renamed to
          index.js so this could potentially break your code. When you are
          importing Nanoleaf ensure you change your code to import
          <code>index.js</code> instead of <code>nanoleaf-layout.js</code> (e.g.
          <code>import NanoleafLayout from 'lib/index'</code>)
        </p>
        <h2 id="whatsnew">Whats New</h2>
        <p>
          As of version <code>2.0.0</code> Nanoleaf layout has been completely
          rewritten in an SVG format instead of using HTML 5s Canvas. This
          means its much more flexible from a development perspective and it
          brings new features like event hooks!
        </p>
        <p>
          You can now hook into <code>onClick</code> <code>onExit</code> and
          onHover Mouse events for each and every panel. Panels in the
          nanoleaf layout have been synchronized and each provides a unique SVG
          object in a callback function which includes all the information about
          the panel thats being interacted with! See the SVG Object above!
        </p>
        <p>
          Let me know what you think about nanoleaf layout by submitting issues
          to the Github repo or contributing!
        </p>
        <p>
          <a href="https://github.com/cbartram/nanoleaf-layout">
            Nanoleaf Layout Github
          </a>
        </p>
        <footer className="site-footer">
          <span className="site-footer-owner">
            <a href="https://github.com/cbartram/nanoleaf-layout">
              Nanoleaf Layout
            </a>
            is maintained by
            <a href="https://twitter.com/Cbartram2?lang=en">
              Christian Bartram
            </a>
          </span>

          <span className="site-footer-credits">
            This page was created by
            <a href="https://twitter.com/Cbartram2?lang=en">
              Christian Bartram
            </a>
          </span>
        </footer>
      </section>
    );
  }
}
