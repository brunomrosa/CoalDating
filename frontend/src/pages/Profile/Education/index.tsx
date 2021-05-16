/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

import { toast } from 'react-toastify';
import { Container } from './styles';
import Input from '../../../components/Sign/Input';
import api from '../../../services/api';

const Education: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [education, setEducation] = useState({
    last_institution: '',
    education_level: '',
    id: 0,
  });

  useEffect(() => {
    loadEducation();
  }, [loading]);

  const loadEducation = async () => {
    const response = await api.get('/educations');
    setEducation(response.data);
    form.setFieldsValue({
      last_institution: education.last_institution,
      education_level: education.education_level,
    });
    setLoading(false);
  };

  const onFinish = async (data: any) => {
    setLoading(true);

    if (education) {
      data.id = education.id;
      await api.put('/educations', data);
      toast.success('Education Updated');
    }
    if (!education) {
      await api.post('/educations', data);
      toast.success('Education Updated');
    }

    await loadEducation();
  };

  return (
    <Container>
      <Form
        initialValues={education}
        form={form}
        name="basic"
        onFinish={onFinish}
      >
        <Input
          name="last_institution"
          placeholder="Coal School of Love"
          title="Last Institution"
        />
        <Input
          name="education_level"
          placeholder="PhD"
          title="Education Level/Title"
        />

        <Button loading={loading} htmlType="submit">
          Update Info
        </Button>
      </Form>
    </Container>
  );
};

export default Education;
