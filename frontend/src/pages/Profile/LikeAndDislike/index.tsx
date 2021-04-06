/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React from 'react';

import ListComponent from './ListComponent';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './styles';

const LikeAndDislike: React.FC = () => {
  return (
    <Container>
      <ListComponent isLike />
      <ListComponent isDislike />
    </Container>
  );
};

export default LikeAndDislike;
