import styled from 'styled-components';

interface InputDivProps {
  isSelected: boolean;
}
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .saveButton {
    padding: 0 16px;
    width: 325px;
    height: 73px;
    border-radius: 10px;
    background-color: #5f2eea;
    margin-top: 30px;
    color: var(--color-white);
    font-weight: 500;
    transition: background-color 0.4s;
  }
  div {
    .ant-spin-container {
      height: 300px;
    }

    ul {
      border-radius: 16px;
      width: 325px;
      height: 290px;
      overflow-x: auto;
      p {
        overflow-wrap: break-word;
      }
      button {
        margin-left: 10px;
        background: none;
        border: 0px none transparent;
      }
    }
  }

  form {
    display: flex;
  }
`;
export const InputDiv = styled.div<InputDivProps>`
  position: sticky;
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
    button {
      background: none;
      border: 0px none transparent;
    }
  }
  .InputAndButton {
    display: flex;
    flex-direction: row;
  }
  * {
    margin: 0;
    padding: 0;
  }

  .holderAndInput {
    margin-top: 10px;

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
