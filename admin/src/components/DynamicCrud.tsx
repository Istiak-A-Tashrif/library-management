/* eslint-disable */
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { deleteApi, get, patch, post } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';
import { fieldTypes } from '~/utility/constant';
import { getLabelFromName } from '~/utility/form';
import getFormItem from '~/utility/getFormItem';
import getFormValues from '~/utility/getFormValues';
import getSetFormValues from '~/utility/getSetFormValues';
import { getHeader } from '~/utility/helmet';
import PageTitle from './PageTitle';

const DrawerForm = ({
  title,
  onClose,
  open,
  onSubmitSuccess,
  isEditing,
  editedItem,
  useFields,
  ...props
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { formFields, KEY, drawerTitle, drawerTitleEdit, model } = useFields();

  const createData = useMutation({
    mutationFn: async (data: any) => await post(getUrlForModel(model), data),
    onSuccess: (response) => {
      message.success('Saved Successfully');
      form.resetFields();
      onSubmitSuccess();
      queryClient.invalidateQueries({ queryKey: [KEY] });
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
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: () => {
      message.error('Something went wrong');
    },
  });

  const onFinish = async (formValues: any) => {
    const values = await getFormValues(formFields, formValues);
    if (isEditing) {
      updateData.mutate({
        ...values,
        id: Number(editedItem.id),
      });
    } else {
      // @ts-ignore
      createData.mutate(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (editedItem) {
      const values = getSetFormValues(formFields, editedItem);
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [editedItem]);

  return (
    <>
      <Drawer
        title={isEditing ? drawerTitleEdit : drawerTitle}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {formFields?.map((field) => {
            const type = field.type ?? fieldTypes?.text;
            const label = field.label ?? getLabelFromName(field.name);
            return getFormItem({ ...field, type, label });
          })}
          <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
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
};

const TableGrid = ({ trigger, onClickEdit, onSubmitSuccess, useFields, ...props }) => {
  const { tableFields, KEY, model } = useFields();
  const {
    isLoading,
    isError,
    error,
    data: fetchData,
    refetch,
  } = useQuery({
    queryKey: [KEY],
    queryFn: () => get(getUrlForModel(model)),
  });

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

  let columns = [];
  tableFields
    .filter((i) => i.table)
    .map((field) => {
      const type = field.type ?? 'text';
      const label = field.label ?? getLabelFromName(field.name);
      if (field.render) {
        columns.push({
          title: label,
          render: field.render,
        });
      } else if (type === 'text') {
        columns.push({
          title: label,
          dataIndex: field.name,
        });
      } else if (type === fieldTypes?.switch) {
        columns.push({
          title: label,
          render: (record: any) => {
            return (
              <>
                {record[field?.name] ? (
                  <Tag color="green">Yes</Tag>
                ) : (
                  <Tag color="red">No</Tag>
                )}
              </>
            );
          },
        });
      } else if (type === fieldTypes?.textEditor) {
        columns.push({
          title: label,
          render: (record: any) => {
            return (
              <>
                <div dangerouslySetInnerHTML={{ __html: record[field?.name] }} />
              </>
            );
          },
        });
      } else if (type === fieldTypes.file) {
        columns.push({
          title: label,
          render: (record: any) => {
            return <Image width={70} src={record[field?.name]} />;
          },
        });
      } else {
        columns.push({
          title: label,
          dataIndex: field.name,
        });
      }
    });

  columns.push({
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
          <Link to={`details/${record.id}`}>
            <Button type="primary" ghost>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      );
    },
  });

  if (isError) {
    return <p>Failed to load data</p>;
  }

  return (
    <>
      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={fetchData?.data}
      />
    </>
  );
};

const { Title } = Typography;

const DynamicCrud = ({ fields, model }) => {
  const useFields = () => {
    const title = `${model}s`;
    const drawerTitle = `Add ${model}`;
    const drawerTitleEdit = `Edit ${model}`;
    const KEY = `all-${model}`;
    const FIELDS = fields;

    let tableFields = [];
    let formFields = [];
    FIELDS?.map((field) => {
      if (field?.table) {
        tableFields.push(field);
      }
      formFields.push(field);
    });

    return {
      model,
      title,
      drawerTitle,
      drawerTitleEdit,
      KEY,
      formFields,
      tableFields,
    };
  };

  const { drawerTitle, title } = useFields();
  const [trigger, setTrigger] = useState(0);
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const showDrawer = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedItem(null);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  };

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger((trigger) => trigger + 1);
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    }
  };

  return (
    <>
      {getHeader(title)}
      <DrawerForm
        title={drawerTitle}
        onClose={onClose}
        open={open}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
        useFields={useFields}
      />
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <Title level={2}>{title}</Title> */}

        {/* <div style={{ marginBlock: '16px' }}>
          <Title style={{ fontSize: '20px' }}>{title}</Title>
          <Breadcrumb
            separator="/"
            items={[
              {
                title: 'Dashboard',
                href: '/#/',
              },
              {
                title: title,
              },
            ]}
          />
        </div> */}

        <PageTitle
          title={title}
          breadcrumbs={[
            {
              title: 'Dashboard',
              href: '/',
            },
            {
              title: title,
            },
          ]}
          rightSection={null}
        />

        <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
          Add News
        </Button>
      </Space>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <TableGrid
            trigger={trigger}
            onClickEdit={onClickEdit}
            onSubmitSuccess={onSubmitSuccess}
            useFields={useFields}
          />
        </Col>
      </Row>
    </>
  );
};

export default DynamicCrud;
