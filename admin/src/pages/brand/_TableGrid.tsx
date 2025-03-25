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
        where: {},
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
    },
    // {
    //   title: 'Is Home Page',
    //   render: (record: any) => {
    //     if (record.is_homePage) {
    //       return <Tag color="green">Yes</Tag>;
    //     }
    //     return <Tag color="orange">No</Tag>;
    //   },
    // },
    {
      title: 'Image',
      render: (record: any) => {
        return <Image width={50} height={50} src={record?.image} />;
      },
    },
    {
      title: 'Actions',
      render: (record: any) => {
        return (
          <Space>
            <Button onClick={() => onClickEdit(record)} type={'link'}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete this item?"
              description="This action cannot be undone"
              onConfirm={() => handleDeleteClient(record.id)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type={'link'}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
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
