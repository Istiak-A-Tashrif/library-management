import { FolderOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { IBreadCrump } from './type'


export const BreadCrump = ({breadcrumbs, handleBreadcrumbClick}:IBreadCrump) => {
    
  return (
    <Breadcrumb style={{cursor: "pointer" }}>
        {breadcrumbs.map((crumb, index) => (
          <Breadcrumb.Item key={crumb.id} onClick={() => handleBreadcrumbClick(crumb.id, index)}>
              {index === 0 ? "All media" : <>
              <FolderOutlined style={{ fontSize: '12px' }} /> {crumb.name.toUpperCase()}
            </>}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
  )
}

