import PendingProcedure from "@/src/components/Admin/Pending/PendingProcedure";
import { Container, Text } from "@nextui-org/react";

export default function $PendingProcedure() {
  return (
    <Container css={{ maxW: "1350px" }}>
      <Text
        size={24}
        weight="bold"
        css={{
          textAlign: "center",
          my: "$13",
        }}
      >
        Pending Procedure Cases
      </Text>
      <PendingProcedure />
    </Container>
  );
}
