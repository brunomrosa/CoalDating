import React from 'react';
import { Tabs } from 'antd';

import { Container } from './styles';

import PersonalInfo from './PersonalInfo';
import LikeAndDislike from './LikeAndDislike';
import Photos from './Photos';
import Education from './Education';
import Job from './Job';

const Profile: React.FC = () => {
  const { TabPane } = Tabs;
  return (
    <Container>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Personal Info" key="1">
          <PersonalInfo />
        </TabPane>
        <TabPane tab="Job" key="2">
          <Job />
        </TabPane>
        <TabPane tab="Education" key="3">
          <Education />
        </TabPane>
        <TabPane tab="Likes & Dislikes" key="4">
          <LikeAndDislike />
        </TabPane>
        <TabPane tab="Photos" key="5">
          <Photos />
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default Profile;
