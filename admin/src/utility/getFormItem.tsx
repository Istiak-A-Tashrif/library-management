import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Row, Select, Switch, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ReactQuill from "react-quill";
import { API_FILE_UPLOAD } from "~/services/api/endpoints";
import { fieldTypes, inputType, reactQuillToolbarOptions } from "~/utility/constant";
import { fileUploadProps } from "./upload";


const getFormItem = (field: any) => {
    const [fileList, setFileList] = useState([]);
    const type = field?.type
    const label = field?.label
    const normFile = (e) => {
        // console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    switch (type) {
        case fieldTypes?.text:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <Input
                        type={field?.inputType ?? fieldTypes?.textInputType?.text}
                    />
                </Form.Item>
            )
        case fieldTypes?.number:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <Input type="number" />
                </Form.Item>
            )
        case fieldTypes?.checkbox:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <Checkbox.Group>
                        <Row>
                            {
                                field?.options?.map(option =>
                                    <Checkbox value={option?.value} style={{ lineHeight: '32px' }}>
                                        {option?.label}
                                    </Checkbox>
                                )
                            }
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            )
        case fieldTypes?.file:
            return (
              <Form.Item
                name={field.name}
                label={label}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={field.rules ?? []}
              >
                <Upload
                  accept=".jpg, .jpeg, .png"
                  defaultFileList={[...fileList]}
                  name="file"
                  {...fileUploadProps}
                  maxCount={1}
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            );
        case fieldTypes?.select:
            return (
                <Form.Item
                    name={field.name}
                    label={label}
                    rules={field.rules ?? []}
                >
                    <Select placeholder={label}>
                        {
                            field?.options?.map(option =>
                                <Select.Option value={option?.value} >{option?.label}</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item >
            )
        case fieldTypes?.switch:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    valuePropName="checked"
                    rules={field.rules ?? []}
                >
                    <Switch />
                </Form.Item>
            )
        case fieldTypes?.radio:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <Radio.Group>
                        {
                            field?.options?.map(option =>
                                <Radio value={option?.value}>{option?.label}</Radio>
                            )
                        }
                    </Radio.Group>
                </Form.Item>
            )
        case fieldTypes?.textArea:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <TextArea rows={4} />
                </Form.Item>
            )
        case fieldTypes?.dateTime:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <DatePicker placeholder={field?.placeholder ?? label} />
                </Form.Item>
            )
        case fieldTypes?.textEditor:
            return (
                <Form.Item
                    label={label}
                    name={field.name}
                    rules={field.rules ?? []}
                >
                    <ReactQuill
                        theme="snow"
                        modules={{
                            toolbar: reactQuillToolbarOptions,
                        }}
                    />
                </Form.Item>
            )
        case fieldTypes?.password:
            return (
                <Form.Item
                    label="Password"
                    name="password"
                    rules={field.rules ?? []}
                >
                    <Input.Password />
                </Form.Item>
            )

        default:
            return <></>
    }

}

export default getFormItem;