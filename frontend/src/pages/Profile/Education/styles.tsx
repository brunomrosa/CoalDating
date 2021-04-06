import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
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
  }
`;
