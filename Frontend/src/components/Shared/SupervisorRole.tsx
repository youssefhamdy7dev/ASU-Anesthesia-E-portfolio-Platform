import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function SupervisorRole({ data, selected, error }) {
  const dropdown = useRef<HTMLUListElement>(null),
    [selectedSupervisor, setSelectedSupervisor] = useState("Select Supervisor"),
    selectedValue = React.useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${selectedSupervisor}"]`)
          ?.textContent || selectedSupervisor,
      [selectedSupervisor],
    ),
    setSelected = (a: any) => {
      const id = a.currentKey;
      setSelectedSupervisor(id);
      selected(id);
    };
  useEffect(() => {
    setSelectedSupervisor("Select Supervisor");
    selected(null);
  }, []);

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Supervisor Role
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
          selectedKeys={selectedSupervisor}
          onSelectionChange={setSelected}
          ref={dropdown}
        >
          {data.map((supervisor) => (
            <Dropdown.Item key={supervisor.id}>{supervisor.role}</Dropdown.Item>
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
