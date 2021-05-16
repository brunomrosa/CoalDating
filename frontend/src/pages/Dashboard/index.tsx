/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
import { Carousel } from 'antd';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Container,
  Content,
  SpotifyAlbums,
  MainProfile,
  SideInfo,
  MatchButtons,
  ImgBackground,
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
    area: string;
  };
}

const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userInfoInterface>();
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      await api.put('/users/cords', {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
    loadUser();
  }, []);
  const loadUser = async () => {
    const response = await api.get('/users/find');
    setUserInfo(response.data);
  };

  const handleLike = async (target: any) => {
    console.log(target);
    const data = {
      user_one: user.id,
      user_two: target,
      user_one_liked: true,
    };
    const response = await api.post('/likes', data);
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
            <Carousel className="carousel" effect="fade">
              {userInfo?.user.photos ? (
                userInfo?.user.photos?.map(photo => (
                  <ImgBackground url={photo.url}>
                    <MatchButtons
                      onClick={() => {
                        loadUser();
                      }}
                      type="submit"
                    >
                      <ImBlocked />
                    </MatchButtons>
                    <MatchButtons
                      onClick={() => {
                        handleLike(userInfo.user.id);
                      }}
                      likeButton
                      type="submit"
                    >
                      <AiFillFire />
                    </MatchButtons>
                  </ImgBackground>
                ))
              ) : (
                <ImgBackground>
                  <MatchButtons
                    onClick={() => {
                      loadUser();
                    }}
                    type="submit"
                  >
                    <ImBlocked />
                  </MatchButtons>
                  <MatchButtons
                    onClick={() => {
                      handleLike(userInfo?.user?.id);
                    }}
                    likeButton
                    type="submit"
                  >
                    <AiFillFire />
                  </MatchButtons>
                </ImgBackground>
              )}
            </Carousel>
          </MainProfile>
          <SideInfo>
            <div>
              <h1>
                {userInfo?.user.name},&nbsp; {userInfo?.user.age}
              </h1>

              <p>
                {userInfo?.job
                  ? `${userInfo?.job.currently_title} at 
                ${userInfo?.job.currently_company}`
                  : 'No working info'}
              </p>
              <p>
                {userInfo?.education
                  ? `${userInfo?.education.education_level} in ${userInfo?.education.area}`
                  : `No education info`}
              </p>
            </div>
            <h1>Likes</h1>
            {userInfo?.user?.likes?.map(like => (
              <p>{like}</p>
            ))}
            <h1>Dislikes</h1>
            {userInfo?.user?.dislikes?.map(dislike => (
              <p>{dislike}</p>
            ))}
          </SideInfo>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
