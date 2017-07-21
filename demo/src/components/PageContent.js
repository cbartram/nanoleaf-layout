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
              {" "}<a href="#barebones">This example</a> includes the most basic
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

        <footer className="site-footer">
          <span className="site-footer-owner">
            <a href="https://github.com/cbartram/nanoleaf-layout">
              Nanoleaf Layout
            </a>{" "}
            is maintained by{" "}
            <a href="https://twitter.com/Cbartram2?lang=en">
              Christian Bartram
            </a>
          </span>

          <span className="site-footer-credits">
            This page was created by{" "}
            <a href="https://twitter.com/Cbartram2?lang=en">
              Christian Bartram
            </a>
          </span>
        </footer>
      </section>
    );
  }
}
