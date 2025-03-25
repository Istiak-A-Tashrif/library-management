/* eslint-disable */

import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Drawer, Form, Input, Switch, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { patch, post } from '~/services/api/api';
import { API_FILE_UPLOAD, getUrlForModel } from '~/services/api/endpoints';
import {
  fileUploadProps,
  getImageUrlForCloudinaryImage,
  getUrlFromUploadComponent,
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
    if (formValues.image) {
      const url = getImageUrlForCloudinaryImage(formValues, 'image');
      formValues.image = url;
    }

    if (formValues.experience) {
      formValues.experience = Number(formValues.experience);
    }

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
        name: editedItem?.name,
        slug: editedItem?.slug,
        // is_homePage: editedItem?.is_homePage,

        image: [
          {
            uid: '-1',
            status: 'done',
            thumbUrl: editedItem?.image,
          },
        ],
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
        title={isEditing ? 'Update Brand' : 'Add Brand'}
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
            label="Name"
            name="name"
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
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              accept=".jpg, .jpeg, .png"
              // defaultFileList={[...fileList]}
              name="file"
              {...fileUploadProps}
              maxCount={1}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
