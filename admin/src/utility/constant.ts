export const formTypes = {
  text: 'text',
  checkbox: 'checkbox',
  select: 'select',
  number: 'number',
  file: 'file',
  switch: 'switch',
  radio: 'radio',
  textArea: 'textArea',
  dateTime: 'dateTime',
  textEditor: 'textEditor',
  password: 'password',
};
export const fieldTypes = {
  text: 'text',
  checkbox: 'checkbox',
  select: 'select',
  number: 'number',
  file: 'file',
  switch: 'switch',
  radio: 'radio',
  textArea: 'textArea',
  dateTime: 'dateTime',
  textEditor: 'textEditor',
  password: 'password',
  textInputType: {
    text: 'text',
    email: 'email',
  },
};
export const inputType = {
  text: 'text',
  email: 'email',
};

export const reactQuillToolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

export const componentSlugs = {
  categoryList: 'category-list',
  featureList: 'feature-list',
  productCollection: 'product-collection',
};

export const componentTypes = {
  fullWidthBanner: 'FULL_WIDTH_BANNER',
  multipleColumnBanner: 'MULTIPLE_COLUMN_BANNER',
  categorySection: 'CATEGORY_SECTION',
  productCollectionSection: 'PRODUCT_COLLECTION_SECTION',
  customCollection: 'CUSTOM_COLLECTION',
  iconGroup: 'ICON_GROUP',
  fullSliderSection: 'FULL_SLIDER_SECTION',
};

export const allStatusOfOrder = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Completed', value: 'COMPLETED' },
];


export const fetchTags = {
  settings: 'settings',
  single_blog: 'single_blog',
  home_data: 'home_data',
  all_categories: 'all_categories',
  all_blog: "all_blog",
};
