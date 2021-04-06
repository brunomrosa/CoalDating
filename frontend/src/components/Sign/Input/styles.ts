import styled from 'styled-components';

interface InputDivProps {
  isSelected: boolean;
}

export const InputDiv = styled.div<InputDivProps>`
  margin-bottom: 15px;
  display: flex;
  width: 325px;
  height: 73px;
  border-radius: 16px;

  ${props =>
    props.isSelected
      ? `background: #FCFCFC; border: 2px solid #5f2eea;`
      : `background: #EFF0F6; border: 2px hidden #5f2eea;`}
  transition: 1s;
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
      font-weight: 400;
    }
    input {
      color: #14142b;
      width: 200px;
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
