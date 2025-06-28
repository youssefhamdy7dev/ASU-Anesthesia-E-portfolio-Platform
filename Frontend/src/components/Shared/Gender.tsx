import React, { useRef, useState } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

const Gender: React.FC<{
  width?: string;
  display?: "block" | "inline-block";
  selected: (gender: string) => void;
  error?: string;
  title?: string;
  css?: object;
}> = ({
  width = "250px",
  display,
  selected,
  error,
  title = "Select Gender",
  css,
  ...props
}) => {
  const [selectedValue, $setSelectedValue] = useState(null),
    genderDropdown = useRef<HTMLUListElement>(null),
    setSelectedValue = (e) => {
      const gender = e.currentKey;
      $setSelectedValue(gender);
      selected(gender);
    },
    selectedGenderValue = React.useMemo(
      () =>
        genderDropdown.current?.querySelector(`[data-key="${selectedValue}"]`)
          ?.textContent || title,
      [selectedValue],
    );

  return (
    <>
      <Box {...props} css={{ display, w: width, ...css }}>
        <label className="nextui-c-hzQjrs nextui-input-block-label">
          Gender
        </label>
        <Dropdown>
          <Dropdown.Button
            flat
            color={(error && "error") as any}
            css={{
              w: width,
              tt: "capitalize",
              justifyContent: "space-between",
            }}
          >
            {selectedGenderValue}
          </Dropdown.Button>
          <Dropdown.Menu
            ref={genderDropdown}
            aria-label="Single selection actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedValue as any}
            onSelectionChange={setSelectedValue}
            css={{ minWidth: width, w: width }}
          >
            <Dropdown.Item key="m">Male</Dropdown.Item>
            <Dropdown.Item key="f">Female</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>

      {error && (
        <Text size={"$xs"} color="error">
          {error}
        </Text>
      )}
    </>
  );
};
export default Gender;
