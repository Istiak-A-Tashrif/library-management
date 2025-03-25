export const getAttributesForProduct = (attributes) => {
  const groupedAttributes = attributes.reduce((acc, option) => {
    const { attribute_id, Attribute, AttributeOption } = option;

    if (!acc[attribute_id]) {
      acc[attribute_id] = {
        attribute_name: Attribute?.name,
        attribute_type: Attribute?.type,
        attribute_id: attribute_id,
        options: [],
      };
    }

    const optionExists = acc[attribute_id].options.some(
      (opt) => opt.option_id === AttributeOption.id,
    );

    if (!optionExists) {
      acc[attribute_id].options.push({
        label: AttributeOption?.name,
        value: AttributeOption?.option,
        option_id: AttributeOption.id,
      });
    }

    return acc;
  }, {});

  const result = Object.values(groupedAttributes);

  return result;
};


export const isPreRegisterEnabled = ({
  pre_reg_end_date,
  is_pre_reg_enabled,
}: any) => {
  const nowDate = new Date();

  const isEndTimeOver = new Date(pre_reg_end_date) < nowDate;

  if (!isEndTimeOver && is_pre_reg_enabled ) {
    return true;
  }

  return false;
};