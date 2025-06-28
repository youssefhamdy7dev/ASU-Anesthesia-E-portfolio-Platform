import React, { useRef, useState } from "react";
import { Dropdown, Text, Textarea } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function ProcedureSpecialty({
  selected,
  specialtyList,
  error,
  setOther,
}) {
  const specialtyDropdown = useRef<HTMLUListElement>(null),
    [specialty, setSelected] = useState("Select a specialty"),
    [isOther, $setOther] = useState(false),
    setSelectedSpecialty = (a: any) => {
      const id = a.currentKey,
        _specialty = specialtyList.find((s) => s.id == id);
      setSelected(id);
      selected(id);

      if (_specialty.specialty === "Other") {
        $setOther(true);
      } else {
        $setOther(false);
        setOther(null);
      }
    },
    selectedSpecialtyValue = React.useMemo(
      () =>
        specialtyDropdown.current?.querySelector(`[data-key="${specialty}"]`)
          ?.textContent || specialty,
      [specialty],
    );

  return (
    <Box css={{ display: "inline-block", mb: "$10" }}>
      <label className="nextui-c-hzQjrs nextui-input-block-label">
        Specialty
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
          {selectedSpecialtyValue}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{ minWidth: "400px", w: "400px" }}
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={specialty}
          onSelectionChange={setSelectedSpecialty}
          ref={specialtyDropdown}
        >
          {specialtyList.map((_specialty) => (
            <Dropdown.Item key={_specialty.id}>
              {_specialty.specialty}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {error && (
        <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
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
            onChange={(e) => setOther(e.target.value)}
          ></Textarea>
        </Box>
      )}
    </Box>
  );
}
