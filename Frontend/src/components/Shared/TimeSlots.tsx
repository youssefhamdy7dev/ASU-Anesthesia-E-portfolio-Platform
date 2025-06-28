import React from "react";
import { Radio, Text } from "@nextui-org/react";
import Box from "@/styles/Box";
import { SharedData } from "@/src/services/api/shared";

type Props = React.FC<{
  timeSlots: SharedData["timeSlots"];
  selectedTimeSlot?: string | null;
  selected: (e: any) => void;
  error: string;
}>;

const TimeSlots: Props = ({ selected, selectedTimeSlot, timeSlots, error }) => {
  return (
    <Box css={{ mb: "$10" }}>
      <Radio.Group
        label="Time"
        orientation="horizontal"
        size="sm"
        onChange={selected}
      >
        {timeSlots.map((e) => {
          const time = e.details.split(" ");
          return (
            <Radio
              key={e.id}
              value={e.id}
              description={time[1].replace("[", "").replace("]", "")}
            >
              {time[0]}
            </Radio>
          );
        })}
      </Radio.Group>
      {error && (
        <Text size={"$xs"} color="error">
          {error}
        </Text>
      )}
    </Box>
  );
};
export default TimeSlots;
