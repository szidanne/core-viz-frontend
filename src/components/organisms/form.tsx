import React, { useEffect, useState } from "react";
import { FormInput } from "@/typings/components/form";
import { Form, FormInstance } from "antd";
import DynamicFormInput from "@/components/molecules/form-input";

interface Props {
  inputs: FormInput[];
  form?: FormInstance;
  onValuesChange?: (vals: { [key: string]: any }) => void;
}

const DynamicForm: React.FC<Props> = ({
  inputs,
  form,
  onValuesChange = () => {},
}) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [debouncedValues, setDebouncedValues] = useState<{
    [key: string]: any;
  }>({});

  // Debounce effect: Updates the debounced state after 2 seconds
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(values);
    }, 1000); // 1-second delay

    return () => clearTimeout(handler); // Cleanup timeout on value change
  }, [values]);

  useEffect(() => {
    onValuesChange(debouncedValues);
  }, [debouncedValues, onValuesChange]);

  return (
    <Form
      form={form}
      onValuesChange={() => {
        const currentValues = form?.getFieldsValue();
        setValues(currentValues); // Update immediately
      }}
    >
      {inputs.map((input) => (
        <DynamicFormInput {...{ input }} key={input.id} />
      ))}
    </Form>
  );
};

export default DynamicForm;
