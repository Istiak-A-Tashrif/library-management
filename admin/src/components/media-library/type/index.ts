export enum EICButtonType {
    LINK = "link",
    TEXT = "text",
    PRIMARY = "primary",
    DEFAULT ="default",
    DASHED = "dashed"
}
export enum EICButtonMode {
    ADD = "ADD",
    BACK ="BACK",
    UPLOAD = "UPLOAD"
}
export interface ICButton {
    type:EICButtonType 
    clickHandler?: () => void 
    mode: EICButtonMode
}
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';

export interface IUploadFile {
  uploadHandler: (options: RcCustomRequestOptions) => void;
}
export interface IAddFrom {
    handler: (values:{file_name:string}) =>void
}

export interface ILibrary {
    insertHandler: (selectedFiles: object[]) => void
}
export interface IMediaLibrary {
    onSelect: (selectedFiles:object[]) => void
  }
export interface IBreadCrump {
    breadcrumbs: {
        id:string
        name:string
    }[],
    handleBreadcrumbClick: (string, number) => void
}
