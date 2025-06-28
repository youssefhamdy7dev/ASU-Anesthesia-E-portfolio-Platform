import { useEffect } from "react";
import { Input as $Input, InputProps } from "@nextui-org/react";
import { UseFormType } from "@/src/hooks/useForm";

type InputType = Omit<Partial<InputProps>, "onChange"> & {
  state: UseFormType;
};

const Input: React.FC<InputType> = ({ state, ...$props }) => {
  const { set, data, errors } = state,
    { name, color, css, type, ...props } = $props,
    onChange = (e) => {
      const value = e.target.value;
      if (name) {
        set({ data: { [name]: value } });
      }
    },
    hasData = name && data && data[name],
    hasError = name && errors && errors[name],
    mainProps = {
      color,
      onChange: onChange,
    };

  Object.assign(mainProps, {
    color: hasError ? "error" : color,

    css: {
      ...css,
      $$inputBorderColor: hasError
        ? "$colors$error"
        : hasData
        ? "$colors$success"
        : "$colors$border",
    },
  });

  Object.assign(mainProps, {
    helperColor: hasError && "error",
    helperText: hasError,
  });

  useEffect(() => {
    if (typeof name === "string") {
      set({ data: { [name]: props.value || null } });
    }
  }, [name]);

  return <$Input {...props} type={type} {...mainProps} />;
};
export default Input;
