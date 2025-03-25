import { ArrowLeftOutlined, FolderOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Modal, Row, Spin, message } from 'antd';
import axios from 'axios';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '~/configs';
import { AddForm } from './add-form';
import { BreadCrump } from './bread-crumb';
import { CButton } from './button';
import styles from './MediaLibrary.module.css';
import { EICButtonMode, EICButtonType, ILibrary } from './type';
import { UploadFile } from './upload-file';
import { findFolderById } from './utils/find-folder-by-id';

export const Library = ({ insertHandler }: ILibrary) => {
  const [parentId, setParentId] = useState('root');
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: 'root', name: 'Home' }]);

  const fetchData = async (id) => {
    setLoading(true);
    try {
      // Simulate an API call
      const items = await axios.get(`${SERVER_URL}/api/v1/media-library/tree`);
      const data =
        id === 'root'
          ? items.data.data
          : findFolderById(items.data.data, id)?.children || [];
      setMediaData(data);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData(parentId);
    })();
  }, [parentId, refetch]);

  const handleAddFolder = async (values) => {
    setLoading(true);
    try {
      const newFolderData = {
        file_name: values.file_name,
        file_type: 'FOLDER',
        parentId: parentId.toString(),
      };
      await axios.post(`${SERVER_URL}/api/v1/media-library/add`, newFolderData);
      message.success('Folder added successfully');
      setRefetch(!refetch);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error.message);
      message.error('Failed to add folder');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (options: RcCustomRequestOptions) => {
    const { file, onSuccess, onError, onProgress } = options;
    setLoading(true);
    try {
      const newFileData = {
        file_type: 'FILE',
        file: file,
        parentId: parentId.toString(),
      };
      await axios.post(`${SERVER_URL}/api/v1/media-library/add`, newFileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess(null, file);
      message.success('File uploaded successfully');
      setRefetch(!refetch);
    } catch (error) {
      onError(error);
      message.error('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const showAddFolderModal = () => {
    setIsModalVisible(true);
  };

  const handleBreadcrumbClick = (id, index) => {
    setParentId(id);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const handleGoBack = () => {
    const newBreadcrumbs = breadcrumbs.slice(0, -1);
    const lastCrumb = newBreadcrumbs[newBreadcrumbs.length - 1];
    setParentId(lastCrumb.id);
    setBreadcrumbs(newBreadcrumbs);
  };

  const handleItemClick = (item) => {
    if (item.file_type === 'FOLDER') {
      setParentId(item.id);
      setBreadcrumbs([...breadcrumbs, { id: item.id, name: item.file_name }]);
    } else if (item.file_type === 'FILE') {
      setSelectedFiles((prevSelected) => {
        if (prevSelected.some((file) => file.id === item.id)) {
          return prevSelected.filter((file) => file.id !== item.id);
        } else {
          return [...prevSelected, item];
        }
      });
    }
  };

  const renderMediaItem = (item) => (
    <Col key={item.id} xs={8} sm={8} md={8} lg={4} xl={4} className={styles.mediaItem}>
      <Card
        className={styles.card}
        hoverable
        onClick={() => handleItemClick(item)}
        style={{
          borderColor: selectedFiles.some((file) => file.id === item.id) ? 'blue' : '',
        }}
      >
        {item.file_type === 'FOLDER' ? (
          <FolderOutlined style={{ fontSize: '64px' }} />
        ) : (
          <img src={item.file_url} alt={item.file_name} className={styles.image} />
        )}
        <p className={styles.fileName}>{item.file_name}</p>
      </Card>
    </Col>
  );

  return (
    <div>
      {/* <BreadCrump breadcrumbs={breadcrumbs} handleBreadcrumbClick={handleBreadcrumbClick}/> */}
      {parentId !== 'root' && (
        <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
          Go Back
        </Button>
      )}
      <CButton
        type={EICButtonType.PRIMARY}
        clickHandler={showAddFolderModal}
        mode={EICButtonMode.ADD}
      />

      <UploadFile uploadHandler={handleUpload} />
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row>
          {mediaData.length ? mediaData.map(renderMediaItem) : <h1>No File Found</h1>}
        </Row>
      )}
      <Modal
        title="Add Folder"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddForm handler={handleAddFolder} />
      </Modal>

      <div className={styles.insertBtn}>
        <Button type="primary" onClick={() => insertHandler(selectedFiles)}>
          Insert
        </Button>
      </div>
    </div>
  );
};
