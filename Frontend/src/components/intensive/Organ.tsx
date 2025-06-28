import React, { useRef } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Organ({ selected, error }) {
  const [value, setSelected] = React.useState("Select number"),
    organDropdown = useRef<HTMLUListElement>(null),
    selectedValue = React.useMemo(
      () =>
        organDropdown.current?.querySelector(`[data-key="${value}"]`)
          ?.textContent || value,
      [value],
    ),
    setSelectedOrgan = (a: any) => {
      const id = a.currentKey;
      setSelected(id);
      selected(id);
    },
    numberList: any = [];
  for (let index = 1; index <= 7; index++) {
    numberList.push(<Dropdown.Item key={index}>{index}</Dropdown.Item>);
  }

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Maximum number of organ support on admission
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
          onSelectionChange={setSelectedOrgan}
          ref={organDropdown}
        >
          {numberList}
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
