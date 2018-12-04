// @flow

import React, { Fragment } from "react";
import { ImageProps } from "../../../types";

const Image = (props: ImageProps) => {
  const { url, width, height, title, onImageClick } = props;

  return (
    <Fragment>
      <div
        className="image-container"
        onKeyDown={() => null}
        role="button"
        onClick={() => onImageClick()}
        tabIndex={-10}
      >
        <img src={url} width={width} height={height} alt={title} />
      </div>
    </Fragment>
  );
};

export default Image;
