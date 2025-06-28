import React, { useRef, useState } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Facility({ selected, facilityList, error }) {
  const facilityDropdown = useRef<HTMLUListElement>(null),
    [facility, setSelected] = useState("Select a facility"),
    setSelectedFacility = (a: any) => {
      const id = a.currentKey;
      setSelected(id);
      selected(id);
    },
    selectedFacilityValue = React.useMemo(
      () =>
        facilityDropdown.current?.querySelector(`[data-key="${facility}"]`)
          ?.textContent || facility,
      [facility],
    );

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Facility
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
          {selectedFacilityValue}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{ minWidth: "400px", w: "400px" }}
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={facility}
          onSelectionChange={setSelectedFacility}
          ref={facilityDropdown}
        >
          {facilityList.map((facility) => (
            <Dropdown.Item key={facility.id}>{facility.name}</Dropdown.Item>
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
