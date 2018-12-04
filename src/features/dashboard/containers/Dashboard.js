// @flow
import React, { Component } from "react";
import { Transition } from "react-transition-group";
import { debounce } from "lodash";

import { Navbar, SearchForm } from "../components";
import { ImageContainer } from "../../image-handler/containers";
import type { DashboardState } from "../../../types";
import giphyService from "../../../giphyService";
import { onScrollEvent } from "../../../utils";

const duration = 1000;

const imageContainerStyle = {
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

const imageContainerTransitions = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0, display: "none" }
};

export default class Dashboard extends Component<any, DashboardState> {
  constructor() {
    super();
    this.state = {
      images: [],
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
    onScrollEvent(this.getImages, fn => {
      fn.call(this);
    });
  }

  onSearchClick(e: { target: { name: string, value: any } }) {
    e.preventDefault();
    this.setState({ images: [], loading: true }, () => this.getImages());
  }

  onSearchFormChanged(e: { target: { name: string, value: any } }) {
    const {
      target: { value: searchQuery }
    } = e;

    this.setState({
      searchQuery
    });
  }

  getImages = debounce(async () => {
    const { searchQuery, limit, offset } = this.state;

    try {
      const { data: imgs } = await giphyService({ searchQuery, limit, offset });

      this.setState(prevState => ({
        images: [...prevState.images, ...imgs],
        offset: prevState.offset + limit,
        loading: false
      }));
    } catch (error) {
      this.setState({ error });
      throw Error("No images founds");
    }
  }, 0);

  render() {
    const { images, error, loading } = this.state;
    const show = images.length > 0 && !loading;

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
                  ...imageContainerStyle,
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
                  ...imageContainerStyle,
                  ...imageContainerTransitions[state]
                }}
                className="content"
              >
                <ImageContainer images={images} />
              </div>
            )}
          </Transition>
        </div>
      </div>
    );
  }
}
