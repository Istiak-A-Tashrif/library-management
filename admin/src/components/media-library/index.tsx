import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styles from './MediaLibrary.module.css'; 
import { Library } from './library';

export const MediaLibrary = ({ onSelect }) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  useEffect(() => {
    onSelect(selectedImages)
  }, [selectedImages])

  return (
    <div>
      <div>
        <a onClick={() => setIsShow(!isShow)}>Add Image</a>
      </div>
      <Modal
        title="Media Library"
        visible={isShow}
        onCancel={() => setIsShow(false)}
        footer={null}
        width="80%"
        className={styles.modal}
      >
        <Library
          insertHandler={(selectedFiles) => {
            setSelectedImages([...selectedFiles]);
            setIsShow(!isShow);
          }}
        />
      </Modal>
      <div className={styles.imageList}>
        {selectedImages.map((image, index) => (
          <div key={index} className={styles.imageItem}>
            <img src={image.file_url} alt={`Selected ${index}`} />
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};