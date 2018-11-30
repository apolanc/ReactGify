// @flow
import React, { Component } from "react";

import { Navbar, SearchForm } from "../components";
import GifContainer from "./GifContainer";
import type { DashboardState } from "../../../types";
import giphyService from "../../../giphyService";

export default class Dashboard extends Component<any, DashboardState> {
  constructor() {
    super();
    this.state = {
      gifs: [],
      offset: 0,
      limit: 18,
      hasMore: true,
      searchQuery: "",
      error: ""
    };

    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchFormChanged = this.onSearchFormChanged.bind(this);
  }

  componentDidMount() {
    window.onscroll = () => {
      const { hasMore, searchQuery } = this.state;

      if (!hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.getGifs(searchQuery);
      }
    };
  }

  onSearchClick(e: { target: { name: string, value: any } }) {
    e.preventDefault();
    this.getGifs();
  }

  onSearchFormChanged(e: { target: { name: string, value: any } }) {
    const {
      target: { value: searchQuery }
    } = e;
    this.setState({
      searchQuery,
      gifs: []
    });
  }

  async getGifs() {
    const { searchQuery, limit, offset } = this.state;

    try {
      const { data: gfs } = await giphyService({ searchQuery, limit, offset });

      this.setState(prevState => ({
        gifs: [...prevState.gifs, ...gfs],
        offset: prevState.offset + limit
      }));
    } catch (error) {
      this.setState({ error });
      throw Error("No gifs founds");
    }
  }

  render() {
    const { gifs, error } = this.state;

    return (
      <div className="wrapper">
        <div className="main-panel">
          <Navbar />
          <SearchForm
            onClick={this.onSearchClick}
            handleChange={this.onSearchFormChanged}
          />
          {error && <p>{error}</p>}
          {!!gifs.length && (
            <div className="content">
              <GifContainer gifs={gifs} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
