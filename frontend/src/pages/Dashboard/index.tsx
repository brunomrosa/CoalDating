import React, { useEffect } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
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

const Dashboard: React.FC = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      await api.put('/users/cords', {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

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
            <div>
              <MatchButtons type="submit">
                <ImBlocked />
              </MatchButtons>
              <MatchButtons likeButton type="submit">
                <AiFillFire />
              </MatchButtons>
            </div>
          </MainProfile>
          <SideInfo>
            <div>
              <h1>Jane Doe, 24</h1>
              <p>Scientist at MIT</p>
              <p>PhD in Robotics</p>
            </div>
            <h1>Likes</h1>
            <p>Cats</p>
            <p>Horror Movies</p>
            <p>Running</p>
            <p>Cooking</p>
            <p>Traveling</p>
            <h1>Dislikes</h1>
            <p>Birds</p>
            <p>Drama Movies</p>
            <p>Junk Food</p>
            <p>Smoking</p>
            <p>Mornings</p>
          </SideInfo>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
