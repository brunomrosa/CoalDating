import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

import { toast } from 'react-toastify';
import { Container } from './styles';
import Input from '../../../components/Sign/Input';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const Job: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [job, setJob] = useState({
    currently_company: '',
    currently_title: '',
    id: 0,
  });

  useEffect(() => {
    loadJob();
  }, [loading]);

  const loadJob = async () => {
    const response = await api.get('/jobs');
    setJob(response.data);
    form.setFieldsValue({
      currently_company: job.currently_company,
      currently_title: job.currently_title,
    });
    setLoading(false);
  };

  const onFinish = async (data: any) => {
    setLoading(true);

    if (job) {
      data.id = job.id;
      await api.put('/jobs', data);
      toast.success('Job Updated');
    }
    if (!job) {
      console.log('!job');
      await api.post('/jobs', data);
      toast.success('Job Updated');
    }

    await loadJob();
  };

  return (
    <Container>
      <Form initialValues={job} form={form} name="basic" onFinish={onFinish}>
        <Input
          name="currently_company"
          placeholder="Coal Dating"
          title="Currently Company"
        />
        <Input
          name="currently_title"
          placeholder="Developer"
          title="Currently Title"
        />

        <Button loading={loading} htmlType="submit">
          Update Info
        </Button>
      </Form>
    </Container>
  );
};

export default Job;
