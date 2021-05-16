/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import React from 'react';

import { Container } from './styles';
import PhotoWall from './PhotoWall';

const Photos: React.FC = () => {
  return (
    <Container>
      <PhotoWall />
    </Container>
  );
};

export default Photos;
