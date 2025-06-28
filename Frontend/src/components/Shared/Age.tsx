import React, { useRef } from "react";
import { Dropdown, Grid, Input, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Age({
  data,
  selectedAge,
  selectedUnits,
  selectedAgeCategory,
  error,
}) {
  const [units, $setSelectedUnits] = React.useState("Select unit"),
    [selectedCategory, $setSelectedCategory] =
      React.useState("Select a category"),
    [age, setAge] = React.useState(null),
    unitsDropdown = useRef<HTMLUListElement>(null),
    categoryDropdown = useRef<HTMLUListElement>(null),
    selectedUnitsValue = React.useMemo(
      () =>
        unitsDropdown.current?.querySelector(`[data-key="${units}"]`)
          ?.textContent || units,
      [units],
    ),
    selectedCategoryValue = React.useMemo(
      () =>
        categoryDropdown.current?.querySelector(
          `[data-key="${selectedCategory}"]`,
        )?.textContent || selectedCategory,
      [selectedCategory],
    ),
    setSelectedUnits = (a: any) => {
      const id = a.currentKey;
      $setSelectedUnits(id);
      selectedUnits(id);
    },
    setSelectedCategory = (a: any) => {
      const id = a.currentKey;
      $setSelectedCategory(id);
      selectedAgeCategory(id);
    },
    $setAge = (e) => {
      const value = e.target.value;
      setAge(value);
      selectedAge(value);
    };

  return (
    <Box
      css={{
        mb: !error.age && !error.units && !error.category && ("$10" as any),
      }}
    >
      <label className="nextui-c-hzQjrs nextui-input-block-label">Age</label>
      <Grid.Container gap={1}>
        <Grid>
          <Input
            type="number"
            placeholder="Age"
            bordered
            width="75px"
            onChange={$setAge}
            css={{
              $$inputBorderColor: error.age
                ? "$colors$error"
                : age
                ? "$colors$success"
                : "$colors$border",
            }}
            color={error.age ? "error" : "primary"}
          />
          {error.age && (
            <Text size={"$xs"} color="error">
              {error.age}
            </Text>
          )}
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button
              flat
              color={error.age && "error"}
              css={{
                w: "180px",
                justifyContent: "space-between",
              }}
            >
              {selectedUnitsValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={units}
              onSelectionChange={setSelectedUnits}
              css={{ minWidth: "180px", maxW: "180px" }}
              ref={unitsDropdown}
            >
              {data.units.map((units) => (
                <Dropdown.Item key={units.id}>{units.unit}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {error.unit && (
            <Text size={"$xs"} color="error">
              {error.unit}
            </Text>
          )}
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button
              flat
              color={error.category && "error"}
              css={{
                w: "250px",
                justifyContent: "space-between",
              }}
            >
              {selectedCategoryValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCategory}
              onSelectionChange={setSelectedCategory}
              ref={categoryDropdown}
            >
              {data.categories.map((category) => (
                <Dropdown.Item key={category.id}>
                  {category.category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {error.category && (
            <Text size={"$xs"} color="error">
              {error.category}
            </Text>
          )}
        </Grid>
      </Grid.Container>
    </Box>
  );
}
