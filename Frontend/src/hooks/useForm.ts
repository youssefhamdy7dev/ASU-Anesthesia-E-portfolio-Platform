import { useState } from "react";

type ResetType = "all" | "data" | "errors";
type Form = {
  data?: any;
  errors?: any;
};
export type UseFormType = Form & {
  set: (form: Form) => void;
  reset: (type: ResetType) => void;
};

export default function useForm(
  init: Form & { onChange?: (data) => void } = {},
) {
  const [formData, setFormData] = useState<Form>({
      data: init.data || {},
      errors: init.errors || {},
    }),
    [changedData, setChangedData] = useState({}),
    onChange = init.onChange,
    reset = (type: ResetType) => {
      switch (type) {
        case "all":
          setChangedData({});
          setFormData({ data: {}, errors: {} });
          break;
        case "data":
          setChangedData({});
          setFormData({ data: {}, errors: formData.errors });
          break;
        case "errors":
          setFormData({ data: formData.data, errors: {} });

          break;
      }
    },
    set = (newData: Form) => {
      const data = { ...formData.data, ...newData.data },
        errors = newData.errors ? newData.errors : formData.errors;
      setChangedData(data);
      setFormData({
        data,
        errors,
      });
    };
  onChange && onChange(changedData);

  return {
    data: formData.data,
    errors: formData.errors,
    set,
    reset,
    hasErrors: Object.keys(formData.errors as []).length > 0,
  };
}
