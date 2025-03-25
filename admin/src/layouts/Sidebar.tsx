import {
  ContactsOutlined,
  DashboardFilled,
  FileWordFilled,
  HomeOutlined,
  SettingFilled,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  MdAccountBalance,
  MdBook,
  MdNewspaper,
  MdOutlinePayment,
  MdSupport,
  MdVolunteerActivism,
} from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentKey = location.pathname + location.search || '';
    setSelectedKeys([currentKey]);

    const parentKey = menuItems.find((item) =>
      item?.children?.some((child) => child.key === currentKey),
    )?.key;

    if (parentKey) {
      setOpenKeys([parentKey]);
    } else {
      setOpenKeys([]);
    }
  }, [location.pathname, location.search]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      key: '/',
      icon: <DashboardFilled />,
    },
    {
      label: 'Books',
      key: '/books',
      icon: <MdBook />,
    },
  ];

  return (
    <div style={{ padding: '10px', backgroundColor: '#EBEBEB' }}>
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          fontSize: '13px',
          fontWeight: '600',
          backgroundColor: '#EBEBEB',
          color: '#5A4C43',
        }}
        items={menuItems}
      />
    </div>
  );
};

export default SideBar;
