import { Button } from 'antd';
import { EICButtonMode, ICButton } from './type';
import { ArrowLeftOutlined, FolderAddOutlined, UploadOutlined } from '@ant-design/icons';


export const CButton = ({clickHandler,mode,type}:ICButton) => {
    let label = ""
    let icon = <ArrowLeftOutlined/>
    switch(mode) {
        case EICButtonMode.ADD: {
            icon = <FolderAddOutlined />
            break
        }
        case EICButtonMode.UPLOAD: {
            label = "Upload"
            icon = <UploadOutlined />
            break
        }
    }
  return (
    <Button icon = {icon}type={type || "primary"} onClick={clickHandler}>
        {label}
    </Button>
  )
}

