import styled from 'styled-components';

interface ButtonProps {
  likeButton?: boolean;
}

interface ImgProps {
  url?: string;
}
export const Container = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
`;

export const Content = styled.div`
  margin-top: 50px;
  display: flex;
  width: 1020px;
  height: 630px;
  border-radius: 10px;
  flex-direction: row;
`;

export const SpotifyAlbums = styled.div`
  width: 240px;
  height: 630px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 10px;
    margin: 5px;
    width: 200px;
    height: 200px;
  }
`;

export const SideInfo = styled.div`
  width: 240px;
  height: 630px;
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
  }
  p {
    font-size: 24px;
    margin: 0;
  }
`;

export const MainProfile = styled.div`
  width: 480px;
  height: 630px;
  margin: 0px 30px;
`;

export const ImgBackground = styled.div<ImgProps>`
  width: 480px;
  height: 630px;
  background-size: 480px 630px;
  border-radius: 10px;
  background-image: url(${props =>
    props.url
      ? props.url
      : 'https://images.pexels.com/photos/789812/pexels-photo-789812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'});
  display: flex !important;
  justify-content: space-evenly;
  align-items: flex-end;
  li button {
    background: red;
  }
`;
export const MatchButtons = styled.button<ButtonProps>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: none;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: ${props => (props.likeButton ? 'green;' : 'red;')};
    width: 50px;
    height: 60px;
  }
`;
