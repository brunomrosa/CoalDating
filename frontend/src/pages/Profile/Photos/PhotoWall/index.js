import React from 'react';
import api from '../../../../services/api';
import { Upload, Modal } from 'antd';
import { Container } from './styles';
import { PlusOutlined } from '@ant-design/icons';

class PicturesWall extends React.Component {
  componentWillMount() {
    this.loadFiles();
    console.log(this.state.fileList);
  }

  loadFiles = async () => {
    const response = await api.get('/files');

    this.setState({ fileList: response.data });
  };
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = ({ fileList }) => this.setState({ fileList });
  handleRemove = async file => {
    if (file.response) {
      await api.delete(`/files/${file.response.name}`);
    } else {
      await api.delete(`/files/${file.name}`);
    }
  };
  render() {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('@Coal:token'),
    };
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Container>
        <Upload
          headers={headers}
          onRemove={this.handleRemove}
          action="http://localhost:3333/files"
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Container>
    );
  }
}

export default PicturesWall;
