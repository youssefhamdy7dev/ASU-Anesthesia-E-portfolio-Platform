import Pending from "@/src/components/Admin/Accounts/Pending";
import { Container, Text } from "@nextui-org/react";

export default function PendingAccounts() {
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
        Pending Accounts
      </Text>
      <Pending />
    </Container>
  );
}
