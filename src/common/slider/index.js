// @flow
import React, { Component } from "react";

type SlideType = {
  image: string
};

const Slide = ({ image }: SlideType) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };
  return <div className="slide" style={styles} />;
};

type LeftArrowType = {
  goToPrevSlide: () => void
};

const LeftArrow = (props: LeftArrowType) => {
  const { goToPrevSlide } = props;
  return (
    <div
      className="backArrow arrow"
      role="button"
      tabIndex={-10}
      onClick={goToPrevSlide}
      onKeyPress={() => null}
    >
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
    </div>
  );
};

type RightArrowType = {
  goToNextSlide: () => void
};

const RightArrow = (props: RightArrowType) => {
  const { goToNextSlide } = props;
  return (
    <div
      className="nextArrow arrow"
      onKeyPress={() => null}
      onClick={goToNextSlide}
      role="button"
      tabIndex={-10}
    >
      <i className="fa fa-arrow-right fa-2x" aria-hidden="true" />
    </div>
  );
};

type SliderProps = {
  gifs: array<any>
};

export default class Slider extends Component<any, SliderProps> {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      translateValue: 0
    };
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentWillReceiveProps(props) {
    this.props = { ...props };
  }

  slideWidth = () => document.querySelector(".slide").clientWidth;

  prevSlide() {
    const { currentIndex } = this.state;

    if (currentIndex === 0) return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  }

  nextSlide() {
    const { currentIndex } = this.state;
    const { gifs } = this.props;

    if (currentIndex === gifs.length - 1) {
      this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    } else {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -this.slideWidth()
      }));
    }
  }

  render() {
    const { translateValue } = this.state;
    const { gifs } = this.props;

    return (
      <div className="slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: "transform ease-out 0.45s"
          }}
        >
          {gifs.map(gif => {
            const {
              images: { downsized }
            } = gif;
            return <Slide image={downsized.url} key={gif.id} />;
          })}
        </div>

        <LeftArrow goToPrevSlide={this.prevSlide} />

        <RightArrow goToNextSlide={this.nextSlide} />
      </div>
    );
  }
}
