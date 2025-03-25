import { Breadcrumb, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const Title = Typography.Title;

function itemRender(route, params, routes, paths) {
    const isLast = routes.indexOf(route) === routes.length - 1;

    if (isLast) {
        return <span style={{ color: 'rgba(0, 0, 0, 1)' }}>{route.title}</span>;
    }

    return <Link to={route.href}>{route.title}</Link>;
}


function PageTitle({title, breadcrumbs, rightSection}) {
    return (
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginBottom: '16px' }}>
                <Title style={{fontSize: '20px'}}>
                    {title}
                </Title>
                <Breadcrumb
                    style={{fontSize: '12px'}}
                    separator="/"
                    items={breadcrumbs}
                    itemRender={itemRender}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                }}
            >
                {rightSection}
            </div>
        </Space>
    );
}

export default PageTitle;
