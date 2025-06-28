import PendingIntensive from "@/src/components/Admin/Pending/PendingIntensive";
import { Container, Text } from "@nextui-org/react";

export default function $PendingIntensive() {
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
        Pending Intensive Cases
      </Text>
      <PendingIntensive />
    </Container>
  );
}
