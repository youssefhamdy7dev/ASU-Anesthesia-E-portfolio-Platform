import { useState, useRef, useMemo, useEffect } from "react";
import {
  Dropdown as $Dropdown,
  DropdownProps,
  DropdownMenuProps,
  Text,
} from "@nextui-org/react";
import { UseFormType } from "@/src/hooks/useForm";

type DropdownType = DropdownProps & {
  state: UseFormType;
  name: string;
  placeholder?: string;
  btnWidth?: string;
  dropdownWidth?: string;
  selectionMode?: DropdownMenuProps["selectionMode"];
};

export const Dropdown: React.FC<DropdownType> = ({
  state,
  children,
  placeholder,
  name,
  btnWidth,
  dropdownWidth,
  selectionMode = "single",
  ...props
}) => {
  const { set, data, errors } = state,
    hasData = name && data && data[name],
    hasError = name && errors && errors[name],
    value = hasData || placeholder,
    dropdown = useRef<HTMLUListElement>(null),
    selectedValue = useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${value}"]`)?.textContent ||
        value,
      [value],
    ),
    onSelect = (a: any) => {
      const id = a.currentKey;
      if (name) {
        set({ data: { [name]: id } });
      }
    };

  useEffect(() => {
    if (name) {
      set({ data: { [name]: null } });
    }
  }, [name]);
  return (
    <>
      <$Dropdown {...props}>
        <$Dropdown.Button
          flat
          color={hasError && "error"}
          css={{
            w: btnWidth,
            justifyContent: "space-between",
          }}
        >
          {selectedValue}
        </$Dropdown.Button>
        <$Dropdown.Menu
          css={{ minWidth: dropdownWidth || "100%" }}
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode={selectionMode}
          selectedKeys={value}
          onSelectionChange={onSelect}
          ref={dropdown}
          children={children as any}
        />
      </$Dropdown>
      {hasError && (
        <Text size={"$xs"} color="error">
          {hasError}
        </Text>
      )}
    </>
  );
};

export const DropdownItem = $Dropdown.Item;
