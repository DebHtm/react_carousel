import React from 'react';
import './Carousel.scss';
import { useRef, useState } from 'react';

type CarouselProps = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const frameWidth = frameSize * itemWidth;
  const stepPx = step * itemWidth;
  const trackWidth = images.length * itemWidth;

  const maxOffset = Math.min(0, frameWidth - trackWidth);

  const handleNext = () => {
    setOffset(prev =>
      infinite ? prev - stepPx : Math.max(prev - stepPx, maxOffset),
    );
  };

  const handlePrev = () => {
    setOffset(prev => (infinite ? prev + stepPx : Math.min(prev + stepPx, 0)));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list"
        ref={frameRef}
        style={{ width: frameWidth }}
      >
        <ul
          className="Carousel__track"
          style={{
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms ease`,
            width: trackWidth,
          }}
        >
          {images.map(img => (
            <li
              className="Carousel__item"
              key={img}
              style={{ width: itemWidth }}
            >
              <img src={img} alt="" width={itemWidth} height={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__button">
        <button data-cy="prev" onClick={handlePrev}>
          Prev
        </button>
        <button data-cy="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
