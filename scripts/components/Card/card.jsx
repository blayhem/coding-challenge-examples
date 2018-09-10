import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
  /* presentational component */
  <div className="gallery__card">
    <a href={props.photo.links.html}>
      <img src={props.photo.urls.regular} alt={props.photo.description} />
    </a>
    <p className="attribution">
      <span role="img" aria-label="camera">
        📷
      </span>
      by {props.photo.user.name}
    </p>
  </div>
);

Card.propTypes = {
  photo: PropTypes.shape({ id: 0, links: [], urls: [], description: '', user: {} }).isRequired
};

export default Card;
