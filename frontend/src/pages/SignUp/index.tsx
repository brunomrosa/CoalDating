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

const SignUp: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const onFinish = async (data: any) => {
    setLoading(true);
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        birth: yup.string().required(),
        password: yup.string().required().min(6),
        confirmPassword: yup.string().required().min(6),
      });
      await schema.validate(data);
      await signUp(data);
      history.push('');
    } catch (err) {
      if (err.response) {
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
          <h1>Sign Up</h1>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Input name="name" placeholder="Jane Doe" title="Name" />
            <Input name="email" placeholder="janedoe@coal.com" title="Email" />
            <Input name="birth" placeholder="1999/01/01" title="Birth" />
            <Input
              isPassword
              name="password"
              placeholder="**********"
              title="Password"
            />
            <Input
              isPassword
              name="confirmPassword"
              placeholder="**********"
              title="Confirm Password"
            />
            <Button loading={loading} htmlType="submit">
              Sign Up
            </Button>
          </Form>

          <a href="/">
            <FiArrowLeft />
            Already have a account? Login!.
          </a>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignUp;
