import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Text, Textarea } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Operations({ operations, selected, setOthers, error }) {
  const dropdown = useRef<HTMLUListElement>(null),
    [selectedOperation, $setSelectedOperation] = useState(
      "Select an Operation",
    ),
    [isOther, setOther] = useState(false),
    selectedOperationValue = React.useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${selectedOperation}"]`)
          ?.textContent || selectedOperation,
      [selectedOperation],
    ),
    setSelectedOperation = (a: any) => {
      const id = a.currentKey,
        operation = operations.find((op) => op.id == id);
      $setSelectedOperation(id);
      selected(id);

      if (operation.title === "Others") {
        setOther(true);
      } else {
        setOther(false);
      }
    };

  useEffect(() => {
    $setSelectedOperation("Select an Operation");
    selected(null);
  }, [operations]);

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Type of the operation
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
          {selectedOperationValue}
        </Dropdown.Button>
        <Dropdown.Menu
          ref={dropdown}
          css={{ minWidth: "1000px" }}
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedOperation}
          onSelectionChange={setSelectedOperation}
        >
          {operations.map((operation) => (
            <Dropdown.Item key={operation.id}>{operation.title}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {error && (
        <Text size={"$xs"} color="error" css={{ mb: "-$1" }}>
          {error}
        </Text>
      )}
      {isOther && (
        <Box css={{ mt: "$7" }}>
          <label className="nextui-c-hzQjrs nextui-input-block-label">
            Others
          </label>
          <Textarea
            css={{ backgroundColor: "#fff" }}
            bordered
            rows={6}
            width="400px"
            onChange={(e) => setOthers(e.target.value)}
          ></Textarea>
        </Box>
      )}
    </Box>
  );
}
