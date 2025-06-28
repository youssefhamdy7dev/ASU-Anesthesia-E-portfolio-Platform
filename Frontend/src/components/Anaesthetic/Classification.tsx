import React, { useRef } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Classification({ selected, classes, error }) {
  const [value, setSelected] = React.useState("Select a class"),
    classDropdown = useRef<HTMLUListElement>(null),
    selectedClassValue = React.useMemo(
      () =>
        classDropdown.current?.querySelector(`[data-key="${value}"]`)
          ?.textContent || value,
      [value],
    ),
    setSelectedClass = (a: any) => {
      const id = a.currentKey;
      setSelected(id);
      selected(id);
    };
  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        ASA-PS Classification
      </label>
      <Dropdown>
        <Dropdown.Button
          flat
          color={error && "error"}
          css={{
            w: "400px",
            justifyContent: "space-between",
          }}
        >
          {selectedClassValue}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{ minWidth: "400px" }}
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={value}
          onSelectionChange={setSelectedClass}
          ref={classDropdown}
        >
          {classes.map((_class) => (
            <Dropdown.Item key={_class.id}>{_class.class}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {error && (
        <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
          {error}
        </Text>
      )}
    </Box>
  );
}
