import React from "react";
import { Input, Select, Radio, Checkbox, Form } from "antd";
import { FormInput } from "@/typings/components/form";

interface DynamicFormInputProps {
  input: FormInput;
}

const DynamicFormInput: React.FC<DynamicFormInputProps> = ({
  input: { type, placeholder, options, id, tooltip, label },
}) => {
  const renderInput = () => {
    switch (type) {
      case "text":
        return <Input placeholder={placeholder} />;
      case "textarea":
        return <Input.TextArea placeholder={placeholder} rows={4} />;
      case "color":
        return <Input type="color" />;
      case "select":
        return (
          <Select
            placeholder={placeholder}
            allowClear
            optionFilterProp="label"
            options={options}
            showSearch
          />
        );
      case "radio":
        return (
          <Radio.Group>
            {options?.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group>
            {options?.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Form.Item
      key={id}
      label={label}
      name={id}
      tooltip={tooltip}
      className="!mb-4"
    >
      {renderInput()}
    </Form.Item>
  );
};

export default DynamicFormInput;
