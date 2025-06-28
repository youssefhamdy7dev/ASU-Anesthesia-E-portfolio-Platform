import React, { useRef } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function ICU({ selected, ICU, error }) {
  const [value, setSelected] = React.useState("Select specialty"),
    ICUDropdown = useRef<HTMLUListElement>(null),
    selectedValue = React.useMemo(
      () =>
        ICUDropdown.current?.querySelector(`[data-key="${value}"]`)
          ?.textContent || value,
      [value],
    ),
    setSelectedICU = (a: any) => {
      const id = a.currentKey;
      setSelected(id);
      selected(id);
    };
  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        ICU Primary Specialty
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
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{ minWidth: "400px" }}
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={value}
          onSelectionChange={setSelectedICU}
          ref={ICUDropdown}
        >
          {ICU.map((_ICU) => (
            <Dropdown.Item key={_ICU.id}>{_ICU.specialty}</Dropdown.Item>
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
