import React, { useEffect, useRef, useState } from "react";
import { Card, Dropdown, Radio, Spacer, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Support({
  data,
  selectedSupport,
  selectedCategory,
  error,
}) {
  const supportDropdown = useRef<HTMLUListElement>(null),
    categoryDropdown = useRef<HTMLUListElement>(null),
    [supportValue, $setSelectedSupport] = useState("Select support type"),
    [categoryValue, setSelectedCategory] = useState(new Set([])),
    [filteredCategory, setFilteredCategory] = useState(null),
    selectedSupportValue = React.useMemo(
      () =>
        supportDropdown.current?.querySelector(`[data-key="${supportValue}"]`)
          ?.textContent || supportValue,
      [supportValue],
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
    setSelectedSupport = (a: any) => {
      const id = a.currentKey;
      $setSelectedSupport(id);
      selectedSupport(id);
      setFilteredCategory(
        data.category.filter((cat) => cat.supportTypeID == id),
      );
    };

  useEffect(() => {
    setSelectedCategory(new Set([]));
    selectedCategory([]);
  }, [filteredCategory]);
  return (
    <>
      <Box css={{ display: "inline-block", mb: "$10" }}>
        <label className="nextui-c-hzQjrs nextui-input-block-label">
          Support type
        </label>
        <Dropdown>
          <Dropdown.Button
            flat
            color={error.support && "error"}
            css={{
              w: "400px",
              justifyContent: "space-between",
            }}
          >
            {selectedSupportValue}
          </Dropdown.Button>
          <Dropdown.Menu
            ref={supportDropdown}
            css={{ minWidth: "400px" }}
            aria-label="Single selection actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={supportValue}
            onSelectionChange={setSelectedSupport}
          >
            {data.support.map((support) => (
              <Dropdown.Item key={support.id}>{support.support}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {error.support && (
          <Text size={"$xs"} color="error" css={{ mb: "-$5" }}>
            {error.support}
          </Text>
        )}
      </Box>
      {filteredCategory && (
        <Card variant="flat" css={{ padding: "$10", mt: "-$8", mb: "$10" }}>
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
        </Card>
      )}
    </>
  );
}
