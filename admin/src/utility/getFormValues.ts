import { fieldTypes } from './constant';
import { getImageUrlForCloudinaryImage } from './upload';

const getFormValues = (formFields: any[], formValues: any) => {
  let values = {};
  const keys = Object.keys(formValues);
  if (!keys?.length) {
    return {};
  }
  keys?.map((key) => {
    const form = formFields?.find((field) => field?.name === key);
    if (form?.type === fieldTypes?.file) {
      const url = getImageUrlForCloudinaryImage(formValues, key);
      if (url !== null && url !== undefined) {
        values[key] = url;
      }
    } else if (form?.type === fieldTypes?.number) {
      values[key] = Number(formValues[key]);
    } else if (form?.type === fieldTypes?.dateTime) {
      values[key] = formValues[key];
    } else if (formValues[key] !== null && formValues[key] !== undefined) {
      values[key] = formValues[key];
    }
  });
  return values;
};

export default getFormValues;
