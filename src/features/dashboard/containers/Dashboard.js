// @flow
import React, { Component } from "react";

import { Navbar, SearchForm } from "../components";
import type { DashboardState } from "../../../types";
import giphyService from "../../../giphyService";

export default class Dashboard extends Component<any, DashboardState> {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      gifs: {
        data: []
      },
      searchQuery: "",
      error: ""
    };

    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchFormChanged = this.onSearchFormChanged.bind(this);
  }

  componentDidMount() {}

  async onSearchClick(e) {
    e.preventDefault();
    const { searchQuery } = this.state;

    try {
      const gifs = await giphyService({ searchQuery });
      this.setState({ gifs });
    } catch (error) {
      this.setState({ error });
    }
  }

  onSearchFormChanged(e) {
    const {
      target: { value: searchQuery }
    } = e;
    this.setState({
      searchQuery
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main-panel">
          <Navbar />
          <SearchForm
            onClick={this.onSearchClick}
            handleChange={this.onSearchFormChanged}
          />
          <div className="content">
            <p>Im the content</p>
          </div>
        </div>
      </div>
    );
  }
}
