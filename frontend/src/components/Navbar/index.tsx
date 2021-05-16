/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const Navbar: React.FC = () => {
  const history = useHistory();
  return (
    <Container>
      <div>
        <button
          onClick={() => {
            history.push('/profile');
          }}
          type="submit"
        />
      </div>
    </Container>
  );
};

export default Navbar;
