// @flow

import React, { Fragment } from "react";
import { GifProps } from "../../../types";

const Gif = (props: GifProps) => {
  const { url, width, height, title } = props;

  return (
    <Fragment>
      <div className="gif-container">
        <img src={url} width={width} height={height} alt={title} />
      </div>
    </Fragment>
  );
};

export default Gif;
