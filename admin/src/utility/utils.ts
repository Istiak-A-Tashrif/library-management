export const checkBoxTreeConverterData = (data) => {
  const treeData = [];
  const idMap = {};

  data?.forEach((item) => {
    idMap[item?.id] = { ...item, children: [] };
  });

  data?.forEach((item) => {
    if (item?.parentId === null) {
      treeData.push(idMap[item?.id]);
    } else {
      idMap[item?.parentId]?.children?.push(idMap[item?.id]);
    }
  });

  return treeData;
};

export const convertSlugByName = (name) => {
  const slug = String(name)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return slug;
};

export const checkSlug = (str) => {
  const validCharacters = /^[a-z0-9_-]+$/;
  const doesNotStartOrEndWithHyphenUnderscore = /^[^-_].*[^-_]$/;
  return validCharacters.test(str) && doesNotStartOrEndWithHyphenUnderscore.test(str);
};
export function convertTreeArray(data = [], parentId = null, level = 1, maxLevel = 3) {
  const result = [];

  for (let item of data) {
    if (item?.parent_id === parentId) {
      const node: any = {
        value: item?.id,
        title: item?.name,
      };

      if (level < maxLevel) {
        const children = convertTreeArray(data, item?.id, level + 1, maxLevel);
        if (children?.length > 0) {
          node.children = children;
        }
      }

      result.push(node);
    } else if (level === maxLevel) {
      for (let parentNode of result) {
        if (parentNode?.children) {
          for (let child of parentNode?.children) {
            if (child?.value === item?.id) {
              if (!child?.children) {
                child.children = [];
              }
              child?.children.push({
                value: item?.id,
                title: item?.name,
              });
            }
          }
        }
      }
    }
  }

  return result;
}

export const getAttributeIdsFromVariations = (data = [], attributes) => {
  if (attributes === null || attributes === undefined) return [];
  const arr = [];
  data.map((i) => {
    i?.ProductVariationOption?.map((i) => {
      if (!arr.includes(i.attribute_id)) {
        arr.push(i.attribute_id);
      }
    });
  });

  return arr;

  /*console.log('arr', arr);
  return attributes.filter( i => {
    console.log({i});
    if (arr.includes(i.id)) return i;
  });*/
};

export const getAttributebyIds = (arrayOfids = [], attributes) => {
  if (attributes === null || attributes === undefined) return [];
  return attributes.filter((i) => {
    if (arrayOfids.includes(i.id)) return i;
  });
};

export const convertVariation = (getedVeriation = []) => {
  const converted = getedVeriation?.map((item) => {
    const value: any = {
      image: item?.image,
      stock: item?.stock,
      sku: item?.sku,
      price: item?.price,
    };

    let attributeOption = [];

    for (let i = 0; i < item?.ProductVariationOption.length; i++) {
      const element = item?.ProductVariationOption[i];

      const optionValue = {
        attribute_id: element?.Attribute?.id,
        attribute_option_id: element?.AttributeOption?.id,
        option: element?.AttributeOption?.name,
        attribute: element?.Attribute?.name,
      };

      attributeOption.push(optionValue);
    }

    value.options = attributeOption;
    value.variation_name = attributeOption?.map((op) => op?.option)?.join(' / ');
    value.option_ids = attributeOption?.map((op) => op?.attribute_option_id)?.join('_');

    return value;
  });

  return converted;
};

export function cleanCoordinate(coordinate) {
  return coordinate?.replaceAll(/[^0-9-.]/g, '');
}

const handelUploadImageInCloudinary = async (event) => {
  const file = event?.target?.files[0];
  if (!file) return;

  const imageData = new FormData();
  imageData.append('file', file);
  imageData?.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
  imageData?.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);

  const res = await fetch(import.meta.env.VITE_CLOUDINARY_API, {
    method: 'POST',
    body: imageData,
  });

  const uploadImage = await res.json();
  return uploadImage;
};

export function convertCapitalizeText(text) {
  return text
    ?.replace(/([a-z])([A-Z])/g, '$1 $2')
    ?.split(/_| /)
    ?.map((word) => {
      return word === word.toUpperCase()
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    ?.join(' ');
}

