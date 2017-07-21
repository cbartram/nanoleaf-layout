/**
 * Created by g6vc on 7/21/17.
 */
import React, { Component } from "react";

export default class PageContent extends Component {
  render() {
    return (
      <section className="main-content">
        <h1 id="header-1">
          <a href="#header-1" />Page Guide
        </h1>
        <p>
          This page is the central hub to hold all the documentation as well as
          live examples of the Nanoleaf Layout in action. Check out the links to
          some examples below
        </p>
        <h2>Examples</h2>
        <ul>
          <h3>Bare Bones Basic Example</h3>
          <li>
            <p>
              <a href="#barebones">This example</a> includes the most basic
              version of the nanoleaf layout in action
            </p>
          </li>

          <h3>Nanoleaf React Props</h3>
          <li>
            <p>
              <a href="#stroke">This example</a> shows of how to use the
              nanoleaf props to position, style, and track the status of your
              nanoleaf accordingly.
            </p>
          </li>

          <h3>Using onClick and onHover events</h3>
          <li>
            <p>
              <a href="#stroke">This example</a> includes onClick and onHover
              events so you can add more interactivity to your nanoleaf. This
              example showcases how users can click directly onto the Nanoleaf
              to select and un-select tiles.
            </p>
          </li>

          <h3>Dynamically Updating your Nanoleaf using NodeJS & Express</h3>
          <li>
            <p>
              <a href="#stroke">This example</a> shows you how to utilize a
              NodeJS & Express server to handle dynamic changes to your nanoleaf
              and how the nanoleaf-layout package is flexible enough to
              accomodate any changes the user makes!
            </p>
          </li>

          <h3>Nanoleaf Tile Grouping</h3>
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
          takes your physical Nanoleaf layout and displays it in
          <strong>any</strong> 2D application. Nanoleaf Layout will take in the
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
        <h3>React Projects</h3>
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

        <h3 id="nonreactprojects">Non React Projects</h3>
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

        <h3 id="data-prop">
          The Data Prop
        </h3>
        <p>
          By Default the Nanoleaf-Layout React Component only requires 1 prop to function. As you might have guessed this
          is the <code>data</code> prop.
        </p>

        <p>
          The data prop originates from the Nanoleaf OpenAPI which comes from the Aurora company themselves not this library. Please see the Nanoleaf Aurora Developer Documentation for more information on
          the nanoleafs layout JSON data. To summarize the JSON structure of a single layout element looks like this coming directly from the Nanoleaf OpenAPI
        </p>

        <p>
          Its simple to control the stroke width and color of the Nanoleaf with
          the <code>strokeWidth</code> and <code>strokeColor</code> but
          sometimes you may want to control the actual color of the panels
          themselves.
        </p>
        <p>
          Nanoleaf layout achieves this through a color property in each of the
          elements in the <code>positionData</code> array.
        </p>
        <p>
          By default the Nanoleaf OpenAPI returns the nanoleaf layout data
          <strong>without</strong> a color property so it looks something like
          this
        </p>
        CODE GOES HERE
        <p>
          By adding a Hexadecimal color code property into the position data it
          will tell nanoleaf-layout to change the color of that particular
          panel. You can do the same thing with the <code>strokeColor</code>
          property to control the stroke color of the panel instance.
          <strong>strokeColor</strong> is no longer a valid or supported prop as
          of version <code>2.1.2</code>
        </p>
        <p>The new positionData will look something like this</p>
        CODE GOES HERE
        <p>
          This allows one to explicitly set and update the color of each panel
          quickly and easily!
        </p>
        <p>
          Please see the next section titled Properties below for information
          about all the nanoleaf-layout properties, their default values, and
          their descriptions.
        </p>
        <h3 id="properties">Properties</h3>
        <h3 id="svgobject">SVG Object</h3>
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
        <h3 id="notes">Notes</h3>
        <p>Please ensure that your data property is formatted correctly, </p>
        <p>
          Nanoleaf Layout will automatically search for the
          <code>positionData</code> key in the given data set which must be an
          array of tiles (even if only one or no tiles exists). The best way to
          ensure that the data is correct is to make a GET request to your
          nanoleaf for its layout information.
        </p>
        <p>
          You can do this simply in the
          <a href="https://www.getpostman.com/">Postman App</a>. Find the IP
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
