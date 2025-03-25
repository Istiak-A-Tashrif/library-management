export const getUrlFromUploadComponent = (formValues, fileInputName) => {
  if (formValues[fileInputName] && Array.isArray(formValues[fileInputName])) {
    const file = formValues[fileInputName][0];
    if (
      file &&
      file.status === 'done' &&
      file.response &&
      file.response.success &&
      file.response?.data?.secure_url
    ) {
      return file.response?.data?.secure_url;
    } else if (
      file &&
      file.status === 'done' &&
      file.response &&
      file.response.success &&
      file.response?.data?.url
    ) {
      return file.response?.data?.url;
    } else if (file && file.thumbUrl) {
      return file.thumbUrl;
    }
  }

  return null;
};

export const getImageUrlForCloudinaryImage = (formValues, fileInputName) => {
  if (formValues[fileInputName] && Array.isArray(formValues[fileInputName])) {
    const file = formValues[fileInputName][0];
    if (file && file.status === 'done' && file.response && file.response?.secure_url) {
      return file.response?.secure_url;
    } else if (file && file.status === 'done' && file.response && file.response?.url) {
      return file.response?.url;
    } else if (file && file.thumbUrl) {
      return file.thumbUrl;
    }
  }

  return null;
};

export const getImageUrlForCloudinaryImageMultiple = (formValues, fileInputName) => {
  if (formValues[fileInputName] && Array.isArray(formValues[fileInputName])) {
    // Map over all files and extract the URL or thumbUrl
    const urls = formValues[fileInputName]
      .map((file) => {
        if (file && file.status === 'done' && file.response && file.response.secure_url) {
          return file.response.secure_url;
        } else if (file && file.status === 'done' && file.response && file.response.url) {
          return file.response.url;
        } else if (file && file.thumbUrl) {
          return file.thumbUrl;
        }
        return undefined; // Explicitly return undefined if no valid URL or thumbUrl
      })
      .filter((url) => url !== undefined); // Filter out undefined values

    return urls.length > 0 ? urls : null; // Return the array of URLs or null if no URLs
  }

  return null;
};

export const fileUploadProps = {
  action: import.meta.env.VITE_CLOUDINARY_API,
  data: {
    upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
    cloud_name: import.meta.env.VITE_CLOUD_NAME,
  },
};

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
