import React, { useRef } from "react";
import { Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Events({ selected, events, error }) {
  const [value, setSelected] = React.useState("Select an Event"),
    eventDropdown = useRef<HTMLUListElement>(null),
    selectedValue = React.useMemo(
      () =>
        eventDropdown.current?.querySelector(`[data-key="${value}"]`)
          ?.textContent || value,
      [value],
    ),
    setSelectedEvent = (a: any) => {
      const id = a.currentKey;
      setSelected(id);
      selected(id);
    };
  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">Events</label>
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
          onSelectionChange={setSelectedEvent}
          ref={eventDropdown}
        >
          {events.map((event) => (
            <Dropdown.Item key={event.id}>{event.event}</Dropdown.Item>
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
