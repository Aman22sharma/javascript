import React from "react";
import { Card, Image } from "react-bootstrap";
import LazyLoad from "react-lazyload";

const CardImage = ({ festival }) => {
  return (
    <>
      {festival.image && festival.image.url ? (
        <div className="text-center bg-secondary">
          <LazyLoad
            once
            debounce={true}
            throttle={true}
            height={300}
            placeholder={
              <Image
                fluid
                src="https://media.giphy.com/media/OiC5BKaPVLl60/giphy.gif"
                alt="Loading Festival"
              />
            }
          >
            <Card.Img
              src={`https://secure.toronto.ca/${festival.image.url}`}
              alt={festival.image.altText}
              className="rounded-0"
            />
          </LazyLoad>
        </div>
      ) : (
          <div className="text-center bg-secondary">
            <LazyLoad
              once
              debounce={true}
              throttle={true}
              height={300}
              placeholder={
                <Image
                  fluid
                  src="https://media.giphy.com/media/OiC5BKaPVLl60/giphy.gif"
                  alt="Loading Festival"
                />
              }
            >
              <Card.Img
                src="https://media.giphy.com/media/3o7WTDH9gYo71TurPq/giphy.gif"
                alt="Image does not exist for this festival"
              />
            </LazyLoad>
          </div>
        )}
    </>
  );
};

export default CardImage;
