/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Container } from './styles';
import Input from '../../../components/Sign/Input';
import Slider from '../../../components/Sign/Slider';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const PersonalInfo: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    name: '',
    email: '',
    birth: '',
    min_age: 0,
    max_age: 100,
  });
  const { signOut } = useAuth();
  useEffect(() => {
    loadUser();
  }, [loading]);

  const loadUser = async () => {
    const response = await api.get('/users');
    setUser(response.data);

    form.setFieldsValue({
      name: user.name,
      email: user.email,
      birth: new Date(user.birth).toLocaleDateString('en-US'),
      age: [user.min_age, user.max_age],
    });
    setLoading(false);
  };

  const onFinish = async (data: any) => {
    setLoading(true);

    data.min_age = data.age[0];
    data.max_age = data.age[1];

    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
        birth: yup.string().required(),
      });
      await schema.validate(data);
      await api.put('/users', data);
      toast.success('Profile Updated');
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
      <Form initialValues={user} form={form} name="basic" onFinish={onFinish}>
        <Input name="name" placeholder="Jane Doe" title="Name" />
        <Input name="email" placeholder="janedoe@coal.com" title="Email" />
        <Input name="birth" placeholder="1999/01/01" title="Birth" />
        <Slider name="age" title="Age Range" placeholder="Age" />
        <Input
          isPassword
          name="password"
          placeholder="**********"
          title="Password"
        />

        <Button loading={loading} htmlType="submit">
          Update Info
        </Button>
        <Button
          onClick={() => {
            signOut();
          }}
          loading={loading}
        >
          Sign Out
        </Button>
      </Form>
    </Container>
  );
};

export default PersonalInfo;
