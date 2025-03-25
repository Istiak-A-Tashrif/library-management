import { Upload } from 'antd';
import { CButton } from './button';
import { EICButtonMode, EICButtonType, IUploadFile } from './type';

export const UploadFile = ({ uploadHandler }: IUploadFile) => {
  return (
    <Upload
      accept=".jpg, .jpeg, .png"
      name="file"
      customRequest={uploadHandler}
      showUploadList={false}
    >
      <CButton mode={EICButtonMode.UPLOAD} type={EICButtonType.DEFAULT} />
    </Upload>
  );
};
