/**
 * Created by g6vc on 7/21/17.
 */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PageContent from "./PageContent";

export default class Header extends Component {
  render() {
    return (
      <div>
        <section className="page-header">
          <h1 className="project-name">Nanoleaf Layout</h1>
          <h2 className="project-tagline">
            Nanoleaf Layout Usage and Examples
          </h2>

          <a href="https://github.com/cbartram/nanoleaf-layout" className="btn">
            View Project on GitHub
          </a>

          <Link to="/basic" className="btn">
            View Basic Examples
          </Link>

          <a href="#docs" className="btn">
            Getting Started Docs
          </a>
        </section>
        <PageContent />
      </div>
    );
  }
}
