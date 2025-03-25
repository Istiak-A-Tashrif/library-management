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
    // {
    //   label: 'Categories',
    //   key: '/categories',
    //   icon: <BiCategory />,
    // },
    // {
    //   label: 'Products',
    //   key: 'products-menu',
    //   icon: <ProductFilled />,
    //   children: [
    //     {
    //       label: 'All Products',
    //       key: '/products',
    //     },
    //     {
    //       label: 'Add Product',
    //       key: '/products/add-new-product',
    //     },
    //     {
    //       label: 'Add Product(Bulk)',
    //       key: '/add-product-bulk',
    //     },
    //     {
    //       label: 'Attribute & Options',
    //       key: '/attribute-and-options',
    //     },
    //     {
    //       label: 'Brand',
    //       key: '/brand',
    //     },
    //     {
    //       label: 'Collections',
    //       key: '/product-collections',
    //     },
    //   ],
    // },
    // {
    //   label: 'Inventory',
    //   key: '/inventory',
    //   icon: <PieChartFilled />,
    // },
    // {
    //   label: 'Orders',
    //   key: 'orders',
    //   icon: <ShoppingFilled />,
    //   children: [
    //     {
    //       label: 'Add order',
    //       key: '/orders/add-order',
    //     },
    //     {
    //       label: 'Active',
    //       key: '/orders?status=active',
    //     },
    //     {
    //       label: 'Past',
    //       key: '/orders?status=past',
    //     },
    //   ],
    // },
    // {
    //   label: 'Customer',
    //   key: '/customer',
    //   icon: <ContactsFilled />,
    // },
    {
      label: 'Teams',
      key: '/teams',
      icon: <TeamOutlined />,
    },
    {
      label: 'Organizer',
      key: '/organizer',
      icon: <FileWordFilled />,
      children: [
        {
          label: 'Registered Organizer',
          key: '/organizer?organizer-status=accepted',
        },
        {
          label: 'Organizer Requests',
          key: '/request-organizers?organizer-status=pending',
        },
      ],
    },
    {
      label: 'Volunteers',
      key: '/volunteers',
      icon: <MdVolunteerActivism />,
    },
    // {
    //   label: 'Volunteers',
    //   key: 'volunteers-menu',
    //   icon: <MdVolunteerActivism />,
    //   children: [
    //     {
    //       label: 'Volunteers',
    //       key: '/volunteers',
    //     },
    //     // {
    //     //   label: 'Join Requests',
    //     //   key: '/volunteer-requests',
    //     // },
    //   ],
    // },
    {
      label: 'Blogs',
      key: 'blogs-menu',
      icon: <FileWordFilled />,
      children: [
        {
          label: 'Posts',
          key: '/blogs',
        },
        {
          label: 'Categories',
          key: '/blogs/categories',
        },
        {
          label: 'Tags',
          key: '/blogs/tags',
        },
      ],
    },
    // {
    //   label: 'Media',
    //   key: '/media',
    //   icon: <PictureFilled />,
    // },
    {
      label: 'User',
      key: '/user',
      icon: <UserOutlined />,
    },

    {
      label: 'Event',
      key: '/event',
      icon: <FileWordFilled />,
      children: [
        {
          label: 'Events',
          key: '/events',
        },
        {
          label: 'Categories',
          key: '/categories',
        },
      ],
    },
    {
      label: 'Home Page',
      key: 'home-page-sec',
      icon: <HomeOutlined />,
      children: [
        {
          label: 'Sliders',
          key: '/sliders',
        },
        // {
        //   label: 'Categories',
        //   key: '/categories',
        // },
        {
          label: 'Banners',
          key: '/banners',
        },
        {
          label: 'Marque Images',
          key: '/marque-images',
        },
        {
          label: 'Join Now Images',
          key: '/join-now',
        },
        {
          label: 'Features',
          key: '/features',
        },
        {
          label: 'FAQ',
          key: '/faq',
        },
      ],
    },
    {
      label: 'Settings',
      key: 'settings-menu',
      icon: <SettingFilled />,
      children: [
        {
          label: 'General settings',
          key: '/settings',
        },
        // {
        //   label: 'Menus',
        //   key: '/settings/menus',
        // },
        {
          label: 'Notification Templates',
          key: '/Notification-template',
        },
        {
          label: 'About Us Images',
          key: '/about-us',
        },
        // {
        //   label: 'Static pages',
        //   key: '/static-pages',
        // },
        // {
        //   label: 'Store location',
        //   key: '/storeLocation',
        // },
      ],
    },
    {
      label: 'Accounts',
      key: 'accounts',
      icon: <MdAccountBalance />,
      children: [
        {
          label: 'Accounts Summary',
          key: '/accounts-summary',
        },
        {
          label: 'Withdraw Requests',
          key: '/withdraw-requests',
        },
      ],
    },
    {
      label: 'Support Tickets',
      key: '/support-tickets',
      icon: <MdSupport />,
    },
    {
      label: 'Newsletter',
      key: '/newsletter',
      icon: <MdNewspaper />,
    },
    {
      label: 'Contact Us',
      key: '/contacts',
      icon: <ContactsOutlined />,
    },
    {
      label: 'Admins',
      key: '/admins',
      icon: <ContactsOutlined />,
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
