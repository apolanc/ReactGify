// @flow
import React, { Component } from "react";
import { shuffle } from "lodash";

import type { ImageContainerProps } from "../../../types";
import { Image } from "../components";
import { Modal, Slider } from "../../../common";

const Row = ({ children }: Array<node> | node): JSX.Element => (
  <div className="row">{children}</div>
);

const Col = ({ children }: Array<node> | node): JSX.Element => (
  <div className="col-lg-2 col-md-3 col-sm-4 col-4">{children}</div>
);

export default class ImageContainer extends Component<
  any,
  ImageContainerProps
> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.onImageClick = this.onImageClick.bind(this);
  }

  componentWillReceiveProps(props) {
    this.props = { ...props };
  }

  onImageClick() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const { images } = this.props;
    const { showModal } = this.state;

    return (
      <div className="container-fluid">
        <Row>
          {images.length > 0 &&
            images.map(image => {
              const {
                id,
                title,
                images: {
                  original_still: { url }
                }
              } = image;
              return (
                <Col key={id}>
                  <Image
                    title={title}
                    width="100%"
                    url={url}
                    onImageClick={this.onImageClick}
                  />
                </Col>
              );
            })}
        </Row>
        <Modal
          show={showModal}
          component={Slider}
          onHide={this.onImageClick}
          gifs={shuffle(images).slice(0, 15)}
        />
      </div>
    );
  }
}
