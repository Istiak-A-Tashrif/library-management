import { Button, Form, Input } from 'antd'
import { IAddFrom } from './type'



export const AddForm = ({handler}:IAddFrom) => {
  return (
    <Form onFinish={handler}>
        <Form.Item
            name="file_name"
            label="Folder Name"
            rules={[{ required: true, message: 'Please input the folder name!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
        </Form.Item>
    </Form>
  )
}

