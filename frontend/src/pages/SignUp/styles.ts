import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import SignUpImage from '../../assets/SignUpImage.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  background-color: var(--primary-initial-bg);
  width: 100%;
  max-width: 700px;
  @media screen and (max-width: 798px) {
    max-width: 500px;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const InputDiv = styled.div`
  display: flex;
  width: 325px;
  height: 73px;
  background: #eff0f7;
  border-radius: 16px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 22px 24px;
    width: 72px;
    height: 68px;
    left: 0px;
    top: calc(50% - 68px / 2 + 0.4px);
  }
  * {
    margin: 0;
    padding: 0;
  }

  .holderAndInput {
    p {
      margin-top: 10px;
      color: #6e7191;
      font-weight: 500;
    }
    input {
      font-weight: 400;
      color: #14142b;
      width: 325px;
      height: 20px;
    }
    display: flex;
    height: 68px;
    justify-content: flex-start;
    align-self: flex-start;
    flex-direction: column;

    display: flex;
  }
`;

export const AnimationContainer = styled.div`
  width: 480px;
  height: 549px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  img {
    height: 75px;
    width: 75px;
    position: relative;
    right: 20px;
  }

  form {
    p {
      font-size: 15px;
      color: var(--secondary-initial-text);
    }

    button {
      padding: 0 16px;
      width: 325px;
      height: 73px;
      border-radius: 10px;
      background-color: #5f2eea;
      margin-top: 30px;
      color: var(--color-white);
      font-weight: 500;
      transition: background-color 0.4s;

      &:hover {
        background: ${shade(0.2, '#3C8ACB')};
      }
    }

    a {
      color: var(--secondary-initial-text);
      display: block;
      margin-top: 10px;
      transition: color 0.2s;
      font-size: 15px;

      svg {
        margin-right: 8px;
      }

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: var(--secondary-color);
    display: block;
    margin-top: 24px;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#64C77C')};
    }
  }

  @media screen and (max-width: 458px) {
    form {
      width: 350px;
    }
  }

  @media screen and (max-width: 378px) {
    form {
      width: 320px;
    }
  }

  @media screen and (max-width: 328px) {
    form {
      width: 300px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpImage}) no-repeat center;
  background-color: var(--secondary-initial-bg);
`;
