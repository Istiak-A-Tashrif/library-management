import React from 'react';
import { Tabs, Form, Input, Button, Avatar, Upload, message, Card } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

// Function to handle profile form submission
const handleProfileSubmit = (values) => {
  message.success('Profile updated successfully');
};

// Function to handle password form submission
const handlePasswordSubmit = (values) => {
  message.success('Password updated successfully');
};

const ProfilePage = () => {
  return (
    <Card title="Profile Settings" bordered={false}>
      <Tabs defaultActiveKey="1">
        {/* Profile Information Tab */}
        <TabPane tab="Profile Information" key="1">
          <Form
            name="profileForm"
            layout="vertical"
            onFinish={handleProfileSubmit}
            initialValues={{
              name: 'John Doe', // Populate with user's current name
              email: 'johndoe@example.com', // Populate with user's current email
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Profile Image" name="image">
              <Upload
                accept=".jpg, .jpeg, .png"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={(file) => {
                  // Handle image upload logic here (e.g., upload to server or use cloud service)
                  return false; // Prevent auto-upload, handle it manually if needed
                }}
              >
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  src="https://www.example.com/avatar.jpg" // replace with user's current avatar URL
                />
                <Button icon={<UploadOutlined />}>Change Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* Password Update Tab */}
        <TabPane tab="Change Password" key="2">
          <Form name="passwordForm" layout="vertical" onFinish={handlePasswordSubmit}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[{ required: true, message: 'Please enter your current password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter current password"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm new password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ProfilePage;
