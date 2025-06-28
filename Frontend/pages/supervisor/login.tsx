import { Container } from "@nextui-org/react";
import Login from "@/src/components/Admin/Login";

export default function SignIn() {
  return (
    <Container display="flex" justify="center" css={{ my: "$20", mw: "600px" }}>
      <Login />
    </Container>
  );
}
