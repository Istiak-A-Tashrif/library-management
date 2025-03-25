import React from 'react';
import { Form, Upload } from 'antd';
import { fileUploadProps } from '~/utility/upload';
import { UploadOutlined } from '@ant-design/icons';

interface ImageInputProps {
  name: string;
  label?: string;
  // onClick: () => void;
  // disabled?: boolean; // Optional prop
}

const ImageInput: React.FC<ImageInputProps> = ({ name, label }) => {
  const l = label
    ? label
    : name.replace('_', ' ').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form.Item
        label={l}
        name={name}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          accept=".jpg, .jpeg, .png"
          className="featured-image"
          name="file"
          {...fileUploadProps}
          maxCount={1}
          listType="picture-card"
        >
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <UploadOutlined />
            Upload
          </span>
        </Upload>
      </Form.Item>
    </>
  );
};

export default ImageInput;
