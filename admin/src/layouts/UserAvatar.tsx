import React from 'react';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const UserAvatarDropdown = ({ username, onLogout, onSettings }) => {
  const navigate = useNavigate(); // React Router's hook for navigation

  const { signOut } = useAuth();
  const handleMenuClick = ({ key }) => {
    if (key === 'profile') {
      navigate('/profile'); // Redirect to the profile page
    } else if (key === 'logout') {
      signOut();
    } else if (key === 'settings') {
      navigate('/settings'); // Redirect to the profile page
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-4 border-b border-gray-200" style={{ cursor: 'pointer' }}>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <div className="flex items-center cursor-pointer">
          <Space>
            <Avatar icon={<UserOutlined />} className="mr-2" />
            <span>{username}</span>
          </Space>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserAvatarDropdown;
