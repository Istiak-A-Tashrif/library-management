import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import ImageInput from '~/components/ImageInput';
import { modelsName } from '~/constants/models';
import { patch, post } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';
import {
  fileUploadProps,
  getImageUrlForCloudinaryImage,
  normFile,
} from '~/utility/upload';
import { checkSlug, convertSlugByName } from '~/utility/utils';

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

  const createChapter = useMutation({
    mutationFn: async (data) => await post(getUrlForModel(modelsName.AudioChapter), data),
    onSuccess: () => message.success('Chapters Added Successfully'),
    onError: () => message.error('Failed to add chapters'),
  });

  // Function to create chapters
  const createChapters = (audioId, chapters) => {
    if (!chapters || chapters.length === 0) return;
    chapters.forEach((chapter) => {
      console.log(chapter);

      if (chapter?.file) {
        const url = getImageUrlForCloudinaryImage(chapter, 'file');
        chapter.file = url;
      }
      createChapter.mutate({
        audio_id: audioId,
        name: chapter.name,
        file: chapter.file || null,
        type: chapter.type || 'PRIVATE',
      });
    });
  };

  const createData = useMutation({
    mutationFn: async (data) => await post(getUrlForModel(model), data.data),
    onSuccess: (response) => {
      if (response.data?.id) {
        createChapters(response.data.id, form.getFieldValue('chapters'));
      }
      onSubmitSuccess();
      form.resetFields();
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

  useEffect(() => {
    if (editedItem) {
      const val = {
        title: editedItem.title,
        language: editedItem.language,
        author: editedItem.author,
        description: editedItem.description,
        preview_file: [
          {
            uid: '-1',
            status: 'done',
            thumbUrl: editedItem.preview_file,
          },
        ],
        price: editedItem.price,
        // Add chapters prefilling
        chapters:
          editedItem.chapters?.map((chapter) => ({
            name: chapter.name,
            type: chapter.type || 'PRIVATE',
            file: chapter.file
              ? [
                  {
                    uid: '-1',
                    status: 'done',
                    thumbUrl: chapter.file,
                  },
                ]
              : undefined,
          })) || [],
      };
      form.setFieldsValue(val);
    } else {
      form.resetFields();
    }
  }, [isEditing, editedItem]);

  const onFinish = async (formValues: any) => {
    if (formValues.preview_file) {
      const url = getImageUrlForCloudinaryImage(formValues, 'preview_file');
      formValues.preview_file = url;
    }

    formValues.price = Number(formValues.price);

    delete formValues.chapters;

    if (isEditing) {
      updateData.mutate({
        ...formValues,
        id: editedItem.id,
      });
    } else {
      createData.mutate({
        data: formValues,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    const priceError = errorInfo.errorFields.find((field) => field.name[0] === 'price');
    if (priceError) {
      console.log('Price Error Details:', priceError);
    }
  };

  return (
    <Drawer
      title={isEditing ? 'Update Audio' : 'Add Audio'}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
        // backgroundColor: '#f5f5f5',
        borderRadius: 8,
      }}
    >
      <Form
        form={form}
        name="audio-form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              placeholder="Enter audio title"
              onChange={(e) =>
                form.setFieldsValue({ slug: convertSlugByName(e.target.value) })
              }
            />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input placeholder="Auto-generated slug" disabled />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Price is required',
              },
              {
                type: 'number',
                min: 0,
                message: 'Price must be a non-negative number',
              },
            ]}
          >
            <InputNumber
              type="number"
              min={0}
              precision={2}
              placeholder="Enter audio price"
              className="w-full"
            />
          </Form.Item>

          <Form.Item label="Language" name="language">
            <Input placeholder="Audio language" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Author" name="author">
            <Input placeholder="Audio author" />
          </Form.Item>

          <ImageInput name="preview_file" label="Preview Image" />
        </div>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter audio description" />
        </Form.Item>

        <Form.List name="chapters">
          {(fields, { add, remove }) => (
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Chapters</h3>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex items-center space-x-4 mb-4 pb-4 border-b">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    label="Chapter Name"
                    className="flex-grow"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Chapter title" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'file']}
                    label="File"
                    className="flex-grow"
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
                      <div className="flex flex-col items-center justify-center">
                        <UploadOutlined />
                        <span>Upload</span>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'type']}
                    label="Type"
                    className="flex-grow"
                    initialValue="PRIVATE"
                  >
                    <Select
                      options={[
                        { label: 'Private', value: 'PRIVATE' },
                        { label: 'Public', value: 'PUBLIC' },
                      ]}
                    />
                  </Form.Item>

                  <div className="self-end mb-6">
                    <MinusCircleOutlined
                      className="text-red-500 text-lg cursor-pointer"
                      onClick={() => remove(name)}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="mt-4"
              >
                Add Chapter
              </Button>
            </div>
          )}
        </Form.List>

        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={createData.isPending || updateData.isPending}
            className="px-8"
          >
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}
