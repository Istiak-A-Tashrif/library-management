/* eslint-disable */

import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Drawer, Form, Input, InputNumber, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { patch, post } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';
import {
  fileUploadProps,
  getImageUrlForCloudinaryImage
} from '~/utility/upload';
import { checkSlug, convertSlugByName } from '~/utility/utils';

// @ts-ignore
export default function DrawerForm({
  title,
  model,
  onClose,
  open,
  onSubmitSuccess,
  isEditing,
  editedItem,
  ...props
}) {
  const [form] = Form.useForm();
  const [slugName, setSlugName] = useState(true);

  const createData = useMutation({
    mutationFn: async (data) => await post(getUrlForModel(model), data.data),
    onSuccess: (response) => {
      message.success('Saved Successfully');
      form.resetFields();
      onSubmitSuccess();
    },
    onError: () => {
      message.error('Something went wrong');
    },
  });

  const updateData = useMutation({
    mutationFn: async (data: any) => await patch(getUrlForModel(model, data.id), data),
    onSuccess: (response) => {
      message.success('Updated Successfully');
      form.resetFields();
      onSubmitSuccess(true);
    },
    onError: () => {
      message.error('Something went wrong');
    },
  });

  const onFinish = async (formValues: any) => {
    console.log(formValues);
    
    if (formValues.preview_File) {
      const url = getImageUrlForCloudinaryImage(formValues, 'preview_File');
      formValues.preview_File = url;
    }
    formValues.price = Number(formValues.price);

    if (isEditing) {
      updateData.mutate({
        ...formValues,
        id: editedItem.id,
      });
    } else {
      // @ts-ignore
      createData.mutate({
        data: formValues,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handelGenerateSlug = (e) => {
    let name: string = e.target.value;
    const slug = convertSlugByName(name);
    const val = {
      slug: slug,
    };
    form.setFieldsValue(val);
  };

  const handelCheckSlug = (e) => {
    const slug = checkSlug(e.target.value);
    setSlugName(slug);
  };

  useEffect(() => {
    if (editedItem) {
      const val = {
        title: editedItem.title,
        language: editedItem.language,
        author: editedItem.author,
        description: editedItem.description,
        preview_File: [
          {
            uid: '-1',
            status: 'done',
            thumbUrl: editedItem.preview_File,
          },
        ],
        price: editedItem.price,
      };
      form.setFieldsValue(val);
    } else {
      form.resetFields();
    }
  }, [isEditing]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  // console.log({ states })

  return (
    <>
      <Drawer
        title={isEditing ? 'Update Book' : 'Add Book'}
        width={600}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input onChange={handelGenerateSlug} />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              {
                validator(_, value) {
                  if (slugName === false) {
                    return Promise.reject('Please provide a valid slug');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input onChange={handelCheckSlug} />
          </Form.Item>
          <Form.Item
            label="Language"
            name="language"
            // rules={[{ required: true, message: 'This field is required' }]}
          >
            {' '}
            <Input />{' '}
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            // rules={[{ required: true, message: 'This field is required' }]}
          >
            {' '}
            <Input />{' '}
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            // rules={[{ required: true, message: 'This field is required' }]}
          >
            {' '}
            <Input.TextArea />{' '}
          </Form.Item>
          <Form.Item
            name="preview_File"
            label="Preview File"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="file"
              {...fileUploadProps}
              maxCount={1}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            {' '}
            <InputNumber  type='number' min={0} style={{ width: '100%' }} />{' '}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createData.isPending || updateData.isPending}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
