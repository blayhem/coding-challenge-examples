import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/card';

const Gallery = props => (
  /* presentational component */
  <div className="gallery_container">
    {props.photos.map(photo => <Card key={photo.id} photo={photo} />)}
  </div>
);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Gallery;
