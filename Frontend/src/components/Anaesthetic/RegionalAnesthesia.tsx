import React, { useRef } from "react";
import { Card, Dropdown, Radio, Text, Textarea } from "@nextui-org/react";
import Box from "@/styles/Box";
import Supervision from "../Shared/Supervision";

export default function RegionalAnesthesia({
  data,
  selectedSupervision,
  selectedRegionalType,
  selectedTechnique,
  selectedRegionalNotes,
  selectedCatheter,
  regionalStatus,
  error,
}) {
  const regionalTypeDropdown = useRef<HTMLUListElement>(null),
    dropdownTechnique = useRef<HTMLUListElement>(null),
    [regionalType, $setSelectedRegionalType] =
      React.useState("Select procedure"),
    [techniqueId, $setTechnique] = React.useState("Select technique"),
    [regionalAnesthesia, setRegionalAnesthesia] = React.useState(false),
    selectedRegionalTypeValue = React.useMemo(
      () =>
        regionalTypeDropdown.current?.querySelector(
          `[data-key="${regionalType}"]`,
        )?.textContent || regionalType,
      [regionalType],
    ),
    selectedTechniqueValue = React.useMemo(
      () =>
        dropdownTechnique.current?.querySelector(`[data-key="${techniqueId}"]`)
          ?.textContent || techniqueId,
      [techniqueId],
    ),
    _setSelectedRegionalType = (a: any) => {
      const id = a.currentKey;
      $setSelectedRegionalType(id);
      selectedRegionalType(id);
    },
    _setSelectedTechnique = (a: any) => {
      const id = a.currentKey;
      $setTechnique(id);
      selectedTechnique(id);
    },
    onSelectRegionalAnesthesia = (e: "yes" | "no") => {
      const status = e === "yes" ? true : false;
      setRegionalAnesthesia(status);
      regionalStatus(status);
    };
  const selectedRegionalAnesthesia = React.useMemo(() => {
    return (
      regionalAnesthesia && (
        <Card variant="flat" css={{ padding: "$10", mb: "$10" }}>
          <Box css={{ display: "inline-block", mb: "$10" }}>
            <label className="nextui-c-hzQjrs nextui-input-block-label">
              Regional type
            </label>
            <Dropdown>
              <Dropdown.Button
                flat
                color={error.type && "error"}
                css={{
                  w: "400px",
                  justifyContent: "space-between",
                }}
              >
                {selectedRegionalTypeValue}
              </Dropdown.Button>
              <Dropdown.Menu
                css={{ minWidth: "400px" }}
                aria-label="Single selection actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={regionalType}
                onSelectionChange={_setSelectedRegionalType}
                ref={regionalTypeDropdown}
              >
                {data.regionalType.map((_regionalType) => (
                  <Dropdown.Item key={_regionalType.id}>
                    {_regionalType.procedure}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {error.type && (
              <Text size={"$xs"} color="error" css={{ mb: "-$1" }}>
                {error.type}
              </Text>
            )}
          </Box>
          <Box css={{ display: "inline-block", mb: "$10" }}>
            <label className="nextui-c-hzQjrs nextui-input-block-label">
              Technique
            </label>
            <Dropdown>
              <Dropdown.Button
                flat
                color={error.tech && "error"}
                css={{
                  w: "400px",
                  justifyContent: "space-between",
                }}
              >
                {selectedTechniqueValue}
              </Dropdown.Button>
              <Dropdown.Menu
                ref={dropdownTechnique}
                css={{ minWidth: "400px" }}
                aria-label="Single selection actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={techniqueId}
                onSelectionChange={_setSelectedTechnique}
              >
                {data.technique.map((technique) => (
                  <Dropdown.Item key={technique.id}>
                    {technique.tech}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {error.tech && (
              <Text size={"$xs"} color="error" css={{ mb: "-$1" }}>
                {error.tech}
              </Text>
            )}
          </Box>
          <Box css={{ mb: "$10" }}>
            <Radio.Group
              label="Was a catheter placed?"
              orientation="horizontal"
              size="sm"
              onChange={selectedCatheter}
            >
              <Radio value="yes" color="primary">
                Yes
              </Radio>
              <Radio value="no" color="primary">
                No
              </Radio>
            </Radio.Group>
            {error.catheter && (
              <Text size={"$xs"} color="error" css={{ mb: "-$1" }}>
                {error.catheter}
              </Text>
            )}
          </Box>
          <Supervision
            error={{ supervision: error.supervision }}
            selectedSupervision={selectedSupervision}
            withSuperVisor={false}
            data={{ supervision: data.supervision }}
          />
          <Box>
            <label className="nextui-c-hzQjrs nextui-input-block-label">
              Regional notes
            </label>
            <Textarea
              css={{ backgroundColor: "#fff" }}
              bordered
              rows={6}
              width="400px"
              onChange={(e) => selectedRegionalNotes(e.target.value)}
            ></Textarea>
          </Box>
        </Card>
      )
    );
  }, [
    regionalAnesthesia,
    selectedRegionalTypeValue,
    selectedTechniqueValue,
    error,
  ]);

  return (
    <>
      <Box css={{ mb: "$10" }}>
        <Radio.Group
          label="Regional anesthesia "
          orientation="horizontal"
          size="sm"
          defaultValue="no"
          onChange={onSelectRegionalAnesthesia as any}
        >
          <Radio value="yes" color="primary">
            Yes
          </Radio>
          <Radio value="no" color="primary">
            No
          </Radio>
        </Radio.Group>
      </Box>
      {selectedRegionalAnesthesia}
    </>
  );
}
