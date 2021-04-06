/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import React, { useState } from 'react';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
