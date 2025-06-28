import { Container } from "@nextui-org/react";
import Register from "@/components/Register";

export default function register() {
  return (
    <Container justify="center" css={{ my: "$10", mw: "650px" }}>
      <Register />
    </Container>
  );
}
