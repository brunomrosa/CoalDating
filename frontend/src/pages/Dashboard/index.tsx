import React, { useEffect, useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
import { Carousel } from 'antd';
import api from '../../services/api';
import {
  Container,
  Content,
  SpotifyAlbums,
  MainProfile,
  SideInfo,
  MatchButtons,
} from './styles';
import Navbar from '../../components/Navbar';

interface userInfoInterface {
  user: {
    id: string;
    name: string;
    email: string;
    lat: number;
    lon: number;
    likes: string[];
    dislikes: string[];
    photos: { url: string }[];
    age: number;
  };
  job: {
    id: string;
    user_id: string;
    currently_company: string;
    currently_title: string;
  };
  education: {
    id: string;
    user_id: string;
    education_level: string;
    last_institution: string;
  };
}

const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userInfoInterface>();

  useEffect(() => {
    loadUser();
    navigator.geolocation.getCurrentPosition(async function (position) {
      await api.put('/users/cords', {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);
  const loadUser = async () => {
    const response = await api.get('/users/find');
    setUserInfo(response.data);
  };
  return (
    <>
      <Navbar />
      <Container>
        <Content>
          <SpotifyAlbums>
            <img
              alt="My Test"
              src="https://i.scdn.co/image/ab67616d0000b27355e36b0dc5b0ef008fc85319"
            />
            <img
              alt="My Test"
              src="https://i.scdn.co/image/ab67616d0000b27355e36b0dc5b0ef008fc85319"
            />
            <img
              alt="My Test"
              src="https://i.scdn.co/image/ab67616d0000b27355e36b0dc5b0ef008fc85319"
            />
          </SpotifyAlbums>
          <MainProfile>
            {/* <div>
              <MatchButtons type="submit">
                <ImBlocked />
              </MatchButtons>
              <MatchButtons likeButton type="submit">
                <AiFillFire />
              </MatchButtons>
            </div> */}
            <Carousel effect="fade">
              {userInfo?.user.photos?.map(photo => (
                <div>
                  <img src={photo.url} width={480} height={630} />
                </div>
              ))}
            </Carousel>
          </MainProfile>
          <SideInfo>
            <div>
              <h1>
                {userInfo?.user.name},{userInfo?.user.age}
              </h1>
              <p>
                {userInfo?.job.currently_title} at{' '}
                {userInfo?.job.currently_company}
              </p>
              <p> 
{' '}
{userInfo?.education.education_level} in Robotics</p>
            </div>
            <h1>Likes</h1>
            {userInfo?.user.likes.map(like => (
              <p>{like}</p>
            ))}
            <h1>Dislikes</h1>
            {userInfo?.user.dislikes.map(dislike => (
              <p>{dislike}</p>
            ))}
          </SideInfo>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
