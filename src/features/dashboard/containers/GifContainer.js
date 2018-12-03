// @flow
import React, { Component } from "react";
import type { GifContainerProps } from "../../../types";
import { Gif } from "../components";

const Row = ({ children }: Array<node> | node): JSX.Element => (
  <div className="row">{children}</div>
);

const Col = ({ children }: Array<node> | node): JSX.Element => (
  <div className="col-lg-3">{children}</div>
);

export default class GifContainer extends Component<any, GifContainerProps> {
  constructor(props) {
    super(props);
    this.state = {
      gifs: props.gifs
    };
  }

  componentWillReceiveProps(props) {
    this.props = { ...props };
  }

  render() {
    const { gifs } = this.props;

    return (
      <div className="container-fluid">
        <Row>
          {gifs.length > 0 &&
            gifs.map(gif => {
              const {
                id,
                title,
                images: {
                  original: { url }
                }
              } = gif;
              return (
                <Col key={id}>
                  <Gif title={title} width="100%" url={url} />
                </Col>
              );
            })}
        </Row>
      </div>
    );
  }
}
