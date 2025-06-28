import PendingRotation from "@/src/components/Admin/Pending/PendingRotation";
import { Container, Text } from "@nextui-org/react";

export default function $PendingRotation() {
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
        Pending Rotations
      </Text>
      <PendingRotation />
    </Container>
  );
}
