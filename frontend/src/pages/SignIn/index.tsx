/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Form, Button } from 'antd';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Content, AnimationContainer, Background } from './styles';
import Input from '../../components/Sign/Input';

const SignInPage: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const onFinish = async (data: any) => {
    setLoading(true);

    try {
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
      });
      await schema.validate(data);
      await signIn(data);
      history.push('dashboard');
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
        setLoading(false);
        return;
      }
      if (err.message) {
        err.message[0].toUpperCase();
        function capitalize(s: string) {
          return s[0].toUpperCase() + s.slice(1);
        }

        toast.error(capitalize(err.message));
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h1>Login</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Input name="email" placeholder="janedoe@coal.com" title="Email" />
            <Input
              isPassword
              name="password"
              placeholder="**********"
              title="Password"
            />
            <Button loading={loading} htmlType="submit">
              Login
            </Button>
          </Form>

          <a href="/signup">
            <FiArrowLeft />
            Need access? Create account!
          </a>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignInPage;
