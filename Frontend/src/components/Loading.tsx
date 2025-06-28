import { Card, Loading as $Loading, Container } from "@nextui-org/react";

export default function Loading({ color }: { color?: any }) {
  return (
    <Container
      justify="center"
      css={{
        mt: "$28",
        mw: "400px",
      }}
    >
      <Card
        css={{
          p: "20px",
          h: "250px",
          d: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <$Loading size="xl" type="gradient" />
      </Card>
    </Container>
  );
}
