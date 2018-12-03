// @flow
import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { debounce } from "lodash";

import { Navbar, SearchForm } from "../components";
import GifContainer from "./GifContainer";
import type { DashboardState } from "../../../types";
import giphyService from "../../../giphyService";
import { onScrollEvent } from "../../../utils";

const duration = 1000;

const gifContainerStyle = {
  transition: `opacity ${duration}ms`
};

const loadingStyle = {
  marginLeft: "50%",
  marginRight: "50%",
  marginTop: "10%",
  position: "absolute"
};

const loaderTransitions = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
};

const gifContainerTransitions = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
};

export default class Dashboard extends Component<any, DashboardState> {
  constructor() {
    super();
    this.state = {
      gifs: [],
      offset: 0,
      limit: 18,
      searchQuery: "",
      error: "",
      loading: false
    };

    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchFormChanged = this.onSearchFormChanged.bind(this);
  }

  componentDidMount() {
    onScrollEvent(this.getGifs, fn => {
      fn.call(this);
    });
  }

  onSearchClick(e: { target: { name: string, value: any } }) {
    e.preventDefault();
    this.setState({ gifs: [], loading: true }, () => this.getGifs());
  }

  onSearchFormChanged(e: { target: { name: string, value: any } }) {
    const {
      target: { value: searchQuery }
    } = e;

    this.setState({
      searchQuery
    });
  }

  getGifs = debounce(async () => {
    const { searchQuery, limit, offset } = this.state;

    try {
      const { data: gfs } = await giphyService({ searchQuery, limit, offset });

      this.setState(prevState => ({
        gifs: [...prevState.gifs, ...gfs],
        offset: prevState.offset + limit,
        loading: false
      }));
    } catch (error) {
      this.setState({ error });
      throw Error("No gifs founds");
    }
  }, 0);

  render() {
    const { gifs, error, loading } = this.state;
    const show = gifs.length > 0 && !loading;

    return (
      <div className="wrapper">
        <div className="main-panel">
          <Navbar />
          <SearchForm
            onClick={this.onSearchClick}
            handleChange={this.onSearchFormChanged}
          />
          {error && <p>{error}</p>}
          <Transition in={loading} timeout={duration}>
            {state => (
              <div
                style={{
                  ...loadingStyle,
                  ...gifContainerStyle,
                  ...loaderTransitions[state]
                }}
                className="fa fa-spinner fa-spin fa-5x"
              />
            )}
          </Transition>
          <Transition in={show} timeout={duration}>
            {state => (
              <div
                style={{
                  ...gifContainerStyle,
                  ...gifContainerTransitions[state]
                }}
                className="content"
              >
                <GifContainer gifs={gifs} />
              </div>
            )}
          </Transition>
        </div>
      </div>
    );
  }
}
