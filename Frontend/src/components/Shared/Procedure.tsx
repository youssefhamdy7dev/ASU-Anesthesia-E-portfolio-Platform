import React, { useEffect, useRef, useState } from "react";
import { Card, Dropdown, Radio, Spacer, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

const _Card = ({ children, isCard }) => {
  return isCard ? (
    <Card variant="flat" css={{ padding: "$10", mb: "$10", mt: "-$5" }}>
      {children}
    </Card>
  ) : (
    <>{children}</>
  );
};
export default function Procedure({
  data,
  selectedProcedure,
  selectedCategory,
  error,
  withCard = false,
}) {
  const procedureDropdown = useRef<HTMLUListElement>(null),
    categoryDropdown = useRef<HTMLUListElement>(null),
    [procedureValue, $setSelectedProcedure] = useState("Select a procedure"),
    [categoryValue, setSelectedCategory] = useState(new Set([])),
    [filteredCategory, setFilteredCategory] = useState(null),
    selectedProcedureValue = React.useMemo(
      () =>
        procedureDropdown.current?.querySelector(
          `[data-key="${procedureValue}"]`,
        )?.textContent || procedureValue,
      [procedureValue],
    ),
    selectedCategoryValue = React.useMemo(() => {
      const list = [] as any;

      categoryValue.forEach((id) => {
        const text =
            categoryDropdown.current?.querySelector(`[data-key="${id}"]`)
              ?.textContent || id,
          content = (
            <Box
              as={"li"}
              css={{
                "&:not(:last-of-type)": {
                  paddingBottom: "$2",
                },
              }}
            >
              {text}
            </Box>
          );
        list.push(content);
      });

      if (categoryValue) {
        return <Box as={"ul"}>{list}</Box>;
      }
    }, [categoryValue]),
    setSelectedProcedure = (a: any) => {
      const id = a.currentKey;
      $setSelectedProcedure(id);
      selectedProcedure(id);
      setFilteredCategory(data.category.filter((cat) => cat.skillID == id));
    };

  useEffect(() => {
    setSelectedCategory(new Set([]));
    selectedCategory([]);
  }, [filteredCategory]);
  return (
    <>
      <Box css={{ display: "inline-block", mb: "$10" }}>
        <label className="nextui-c-hzQjrs nextui-input-block-label">
          Procedure
        </label>
        <Dropdown>
          <Dropdown.Button
            flat
            color={error.skill && "error"}
            css={{
              w: "400px",
              justifyContent: "space-between",
            }}
          >
            {selectedProcedureValue}
          </Dropdown.Button>
          <Dropdown.Menu
            ref={procedureDropdown}
            css={{ minWidth: "400px" }}
            aria-label="Single selection actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={procedureValue}
            onSelectionChange={setSelectedProcedure}
          >
            {data.skill.map((skill) => (
              <Dropdown.Item key={skill.id}>{skill.skill}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {error.skill && (
          <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
            {error.skill}
          </Text>
        )}
      </Box>

      <_Card isCard={withCard}>
        {filteredCategory && (
          <Box css={{ display: "inline-block" }}>
            <label className="nextui-c-hzQjrs nextui-input-block-label">
              Category
            </label>
            <Dropdown>
              <Dropdown.Button
                flat
                color={error.category && "error"}
                css={{
                  w: "400px",
                  justifyContent: "space-between",
                }}
              >
                Select a category
              </Dropdown.Button>
              <Dropdown.Menu
                ref={categoryDropdown}
                css={{ minWidth: "400px" }}
                aria-label="Single selection actions"
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={categoryValue}
                onSelectionChange={function (value: any) {
                  const list: any = [];
                  value.forEach((v) => {
                    list.push(v);
                  });

                  setSelectedCategory(list);
                  selectedCategory(list);
                }}
              >
                {(filteredCategory as any).map((category) => (
                  <Dropdown.Item key={category.id}>
                    {category.category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {error.category && (
              <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
                {error.category}
              </Text>
            )}
          </Box>
        )}

        {categoryValue.size !== 0 && (
          <>
            <Spacer x={2} />
            <label className="nextui-c-hzQjrs nextui-input-block-label">
              Selected categories:
            </label>

            <Box
              css={{
                padding: "$1",
                backgroundColor: "#fff",
                borderRadius: "15px",
              }}
            >
              {selectedCategoryValue}
            </Box>
          </>
        )}
      </_Card>
    </>
  );
}
