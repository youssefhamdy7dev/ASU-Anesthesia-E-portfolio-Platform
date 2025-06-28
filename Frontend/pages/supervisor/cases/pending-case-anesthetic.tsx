import PendingAnesthetic from "@/src/components/Admin/Pending/PendingAnesthetic";
import { Container, Text } from "@nextui-org/react";

export default function $PendingAnesthetic() {
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
        Pending Anesthetic Cases
      </Text>
      <PendingAnesthetic />
    </Container>
  );
}
