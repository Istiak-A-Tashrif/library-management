import {Avatar, Dropdown, Flex, Layout, Menu, Space, theme} from 'antd';
import React, {useState} from 'react';
import {LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu

export default function HeaderNav() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleMenuClick = ({ key }) => {
        if (key === 'profile') {
            navigate('/profile'); // Redirect to the profile page
        } else if (key === 'logout') {
            // Add your logout logic here
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
	    <Header style={{ padding: 0, background: '#F1F1F1' }}>
          {/*{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}*/}
            {/*<div>{rightContent}</div>*/}
            <Flex justify={'flex-end'} style={{paddingRight: 10}}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Space>
                        <Avatar
                            style={{ cursor: 'pointer' }}
                            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" // replace with the user's actual avatar URL
                            alt="User Avatar"
                        />
                        Admin
                    </Space>
                </Dropdown>
            </Flex>
        </Header>
	);
}
