import React, { useRef, useState } from "react";
import { Card, Dropdown, Radio, Text } from "@nextui-org/react";
import Box from "@/styles/Box";
import Operations from "./Operations";

export default function SecondarySpecialty({
  setOthers,
  selectedOperation,
  selectedSpecialty,
  specialtyStatus,
  specialty,
  operations,
  error,
}) {
  const dropdown = useRef<HTMLUListElement>(null),
    [specialtyValue, setSelected] = useState("Select a Specialty"),
    [selectedOperations, setOperations] = useState(null),
    [$specialtyStatus, setSpecialtyStatus] = useState(false),
    selectedSpecialtyValue = React.useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${specialtyValue}"]`)
          ?.textContent || specialtyValue,
      [specialtyValue],
    ),
    setSelectedSpecialty = (a: any) => {
      const id = a.currentKey,
        $operations = operations.filter(
          (operation) => operation.specialtyID == id,
        );
      setSelected(id);
      selectedSpecialty(id);
      setOperations($operations);
    },
    onSelectSpecialty = (e: "yes" | "no") => {
      const status = e === "yes" ? true : false;
      setSpecialtyStatus(status);
      specialtyStatus(status);
    };

  const selectedSpecialtyElement = React.useMemo(() => {
    return (
      $specialtyStatus && (
        <Card variant="flat" css={{ padding: "$10 $10 $5", mb: "$10" }}>
          <Box css={{ display: "inline-block", mb: "$10" }}>
            <label className="nextui-c-hzQjrs nextui-input-block-label">
              The Secondary Specialty
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
                selectedKeys={specialtyValue}
                onSelectionChange={setSelectedSpecialty}
                ref={dropdown}
              >
                {specialty.map((specialty) => (
                  <Dropdown.Item key={specialty.id}>
                    {specialty.specialty}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {error.specialty && (
              <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
                {error.specialty}
              </Text>
            )}
          </Box>

          {selectedOperations && (
            <Operations
              error={error.operation}
              operations={selectedOperations}
              selected={selectedOperation}
              setOthers={setOthers}
            />
          )}
        </Card>
      )
    );
  }, [specialtyValue, selectedSpecialtyValue, $specialtyStatus, error]);
  return (
    <>
      <Box css={{ mb: "$10" }}>
        <Radio.Group
          label="Secondary Specialty if present?"
          orientation="horizontal"
          size="sm"
          defaultValue="no"
          onChange={onSelectSpecialty as any}
        >
          <Radio value="yes" color="primary">
            Yes
          </Radio>
          <Radio value="no" color="primary">
            No
          </Radio>
        </Radio.Group>
      </Box>
      {selectedSpecialtyElement}
    </>
  );
}
