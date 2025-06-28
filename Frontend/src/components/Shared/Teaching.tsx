import React, { useRef, useState } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Teaching({ data, selected, error }) {
  const dropdown = useRef<HTMLUListElement>(null),
    [selectedTeaching, setSelectedTeaching] = useState("Select Teaching"),
    selectedValue = React.useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${selectedTeaching}"]`)
          ?.textContent || selectedTeaching,
      [selectedTeaching],
    ),
    setSelected = (a: any) => {
      const id = a.currentKey;
      setSelectedTeaching(id);
      selected(id);
    };

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Teaching
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
          selectedKeys={selectedValue}
          onSelectionChange={setSelected}
          ref={dropdown}
        >
          {data.map((teaching) => (
            <Dropdown.Item key={teaching.id}>{teaching.title}</Dropdown.Item>
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
