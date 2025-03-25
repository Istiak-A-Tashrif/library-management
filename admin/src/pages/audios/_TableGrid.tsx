/* eslint-disable */

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Image, Popconfirm, Space, Table, Tag, message } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteApi, post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE, getUrlForModel } from '~/services/api/endpoints';

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
  const KEY = `all-${model}`;

  const {
    isLoading,
    isError,
    error,
    data: fetchData,
    refetch,
  } = useQuery({
    queryKey: [KEY],
    queryFn: () =>
      post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        include: { chapters: true },
      }),
    staleTime: 0,
  });

  // const {  data: productCategories, refetch:categories } = useQuery({
  //     queryKey: ["Categories", "Products"],
  //     queryFn: () => get(getUrlForModel('ProductCategory')),
  //     staleTime: 0
  // });

  useEffect(() => {
    if (trigger) {
      refetch();
    }
  }, [trigger]);

  const deleteMutation = useMutation({
    mutationFn: async (id: any) => await deleteApi(getUrlForModel(model, id)),
    onSuccess: () => {
      message.success('Deleted Successfully');
      refetch();
    },
    onError: () => {
      message.error('Something went wrong');
    },
  });

  const handleDeleteClient = (id: any) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Language',
      dataIndex: 'language',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price: any) => price ? `$${price}` : 'Free',
    },
    {
      title: 'Chapters',
      render: (record: any) => record.chapters?.length || 0,
    },
    {
      title: 'Actions',
      render: (record: any) => (
        <Space>
          <Button onClick={() => onClickEdit(record)} type="link">
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete this book?"
            description="This action cannot be undone"
            onConfirm={() => handleDeleteClient(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  if (isError) {
    return <p>Failed to load data</p>;
  }

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={fetchData?.data}
    />
  );
}
