import React, { useRef, useState } from "react";
import { Card, Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";
import Operations from "./Operations";

export default function PrimarySpecialty({
  data,
  selectedSpecialty,
  selectedOperations,
  setOthers,
  error,
}) {
  const dropdown = useRef<HTMLUListElement>(null),
    [specialty, setSelected] = useState("Select a Specialty"),
    [operations, setOperations] = useState(null);

  const setSelectedSpecialty = (a: any) => {
    const id = a.currentKey,
      $operations = data.operations.filter(
        (operation) => operation.specialtyID == id,
      );
    setSelected(id);
    selectedSpecialty(id);
    setOperations($operations);
  };
  const selectedSpecialtyValue = React.useMemo(
    () =>
      dropdown.current?.querySelector(`[data-key="${specialty}"]`)
        ?.textContent || specialty,
    [specialty],
  );

  return (
    <>
      <Box css={{ display: "inline-block", mb: "$10" }}>
        <label className="nextui-c-hzQjrs nextui-input-block-label">
          The Primary Specialty
        </label>
        <Dropdown>
          <Dropdown.Button
            flat
            color={error.specialty && "error"}
            css={{
              w: "400px",
              justifyContent: "space-between",
            }}
          >
            {selectedSpecialtyValue}
          </Dropdown.Button>
          <Dropdown.Menu
            css={{ minWidth: "400px" }}
            aria-label="Single selection actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={specialty}
            onSelectionChange={setSelectedSpecialty}
            ref={dropdown}
          >
            {data.specialty.map((specialty) => (
              <Dropdown.Item key={specialty.id}>
                {specialty.specialty}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {error.specialty && (
          <Text size={"$xs"} color="error" css={{ mb: "-$1" }}>
            {error.specialty}
          </Text>
        )}
      </Box>
      {operations && (
        <Card
          variant="flat"
          css={{ padding: "$10 $10 $5", mt: "-$8", mb: "$10" }}
        >
          <Operations
            error={error.operation}
            operations={operations}
            selected={selectedOperations}
            setOthers={setOthers}
          />
        </Card>
      )}
    </>
  );
}
