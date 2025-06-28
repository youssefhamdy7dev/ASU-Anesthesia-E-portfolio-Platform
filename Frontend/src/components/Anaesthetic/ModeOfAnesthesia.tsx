import React, { useRef, useState } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function ModeOfAnesthesia({ data, selected, error }) {
  const dropdown = useRef<HTMLUListElement>(null),
    [selectedMode, setSelectedMode] = useState("Select mode"),
    selectedValue = React.useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${selectedMode}"]`)
          ?.textContent || selectedMode,
      [selectedMode],
    ),
    setSelected = (a: any) => {
      const id = a.currentKey;
      setSelectedMode(id);
      selected(id);
    };

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Mode of anesthesia
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
          selectedKeys={selectedMode}
          onSelectionChange={setSelected}
          ref={dropdown}
        >
          {data.map((mode) => (
            <Dropdown.Item key={mode.id}>{mode.mode}</Dropdown.Item>
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
