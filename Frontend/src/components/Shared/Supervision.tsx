import React, { useRef, useState } from "react";
import { Card, Dropdown, Text } from "@nextui-org/react";
import Box from "@/styles/Box";
import SupervisorRole from "./SupervisorRole";

export default function Supervision({
  data,
  withSuperVisor = true,
  selectedSupervision,
  selectedSupervisor,
  error,
}: {
  data: any;
  withSuperVisor?: boolean;
  selectedSupervision: (arg) => void;
  selectedSupervisor?: (arg) => void;
  error: { supervision: string; supervisor?: string };
}) {
  const dropdown = useRef<HTMLUListElement>(null),
    [selected, $setSelected] = useState("Select supervision"),
    [isSolo, setSolo] = useState(false),
    setSelected = (a: any) => {
      const id = a.currentKey,
        sv = data.supervision.find((s) => s.id == id);
      $setSelected(id);
      selectedSupervision(id);

      if (withSuperVisor) {
        if (sv.name !== "Solo") {
          setSolo(true);
        } else {
          setSolo(false);
        }
      }
    },
    selectedValue = React.useMemo(
      () =>
        dropdown.current?.querySelector(`[data-key="${selected}"]`)
          ?.textContent || selected,
      [selected],
    );

  return (
    <>
      <Box
        css={{
          display: "inline-block",
          mb: !withSuperVisor || !isSolo ? "$10" : undefined,
        }}
      >
        <label className="nextui-c-hzQjrs nextui-input-block-label">
          Supervision
        </label>
        <Dropdown>
          <Dropdown.Button
            flat
            color={(error.supervision && "error") as any}
            css={{
              w: "400px",
              justifyContent: "space-between",
            }}
          >
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            ref={dropdown}
            css={{ minWidth: "400px" }}
            aria-label="Single selection actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            {data.supervision.map((supervision) => (
              <Dropdown.Item key={supervision.id}>
                {supervision.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {error.supervision && (
          <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
            {error.supervision}
          </Text>
        )}
      </Box>
      {withSuperVisor && isSolo && (
        <Card
          variant="flat"
          css={{ padding: "$10 $10 $5", mb: "$10", mt: "$5" }}
        >
          <SupervisorRole
            error={error.supervisor}
            data={data.supervisor}
            selected={selectedSupervisor}
          />
        </Card>
      )}
    </>
  );
}
