/* eslint-disable */
import { Layout, theme } from 'antd';
import { Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CenterLoader from '~/components/CenterLoader';
import UserAvatarDropdown from '~/layouts/UserAvatar';
import routes from '../routes';
import './index.css';
import NotFound from './NotFound';
import DashboardSidebar from './Sidebar';
const { Content, Sider, Footer } = Layout;
const DefaultLayout = ({ children }: any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
  };

  const handleSettings = () => {
    // Implement settings navigation logic
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider
        className="custom-scrollbar"
        width={250}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#EBEBEB',
          overflow: 'auto', // Enable scrolling inside the Sider if necessary
        }}
      >
        <div style={{ padding: 10 }}>
          <UserAvatarDropdown
            username="John Doe"
            onLogout={handleLogout}
            onSettings={handleSettings}
          />
        </div>
        <DashboardSidebar />
      </Sider>
      <Layout
        style={{
          marginLeft: 250,
          height: '100vh',
          overflow: 'hidden', // Prevent double scrollbars
        }}
      >
        <div
          className="custom-scrollbar"
          style={{
            padding: 15,
            backgroundColor: '#F1F1F1',
            overflowY: 'auto', // Allow scrolling for the Content
          }}
        >
          <Content
            style={{
              marginBottom: 10,
              minHeight: 'calc(100vh - 110px)',
            }}
          >
            <Suspense fallback={<CenterLoader />}>
              <Routes>
                {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route key={idx} path={route.path} element={<route.element />} />
                    )
                  );
                })}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: '#F1F1F1' }}>
            ©{new Date().getFullYear()}
          </Footer>
        </div>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
