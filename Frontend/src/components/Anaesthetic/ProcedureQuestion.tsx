import React from "react";
import { Card, Dropdown, Radio, Text } from "@nextui-org/react";
import Box from "@/styles/Box";
import Procedure from "../Shared/Procedure";

export default function ProcedureQuestion({
  data,
  procedureQuestionStatus,
  selectedProcedure,
  selectedCategory,
  error,
}) {
  const [procedureValue, setSelectedProcedure] = React.useState(false),
    onSelectProcedure = (e: "yes" | "no") => {
      const status = e === "yes" ? true : false;
      setSelectedProcedure(status);
      procedureQuestionStatus(status);
    };

  return (
    <>
      <Box css={{ mb: "$10" }}>
        <Radio.Group
          label="Have you performed one or more procedures?"
          orientation="horizontal"
          size="sm"
          defaultValue="no"
          onChange={onSelectProcedure as any}
        >
          <Radio value="yes" color="primary">
            Yes
          </Radio>
          <Radio value="no" color="primary">
            No
          </Radio>
        </Radio.Group>
      </Box>
      {procedureValue && (
        <Card variant="flat" css={{ padding: "$10", mb: "$10" }}>
          <Procedure
            error={error}
            selectedProcedure={selectedProcedure}
            selectedCategory={selectedCategory}
            data={data}
          />
        </Card>
      )}
    </>
  );
}
