/**
 * Created by g6vc on 7/21/17.
 */
import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <section className="page-header">
        <h1 className="project-name">Nanoleaf Layout</h1>
        <h2 className="project-tagline">
          Nanoleaf Layout Usage and Examples
        </h2>

        <a href="https://github.com/cbartram/nanoleaf-layout" className="btn">
          View Project on GitHub
        </a>

        <a href="#examples" className="btn">
          View Basic Examples
        </a>
        <a href="#docs" className="btn">
          Getting Started Docs
        </a>
      </section>
    );
  }
}
