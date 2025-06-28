import { Card, Link, Grid, Collapse, Button } from "@nextui-org/react";
import $Link from "next/link";

export default function Home() {
  const co = {
      backgroundColor: "$accents0",
      borderRadius: "$base",
      p: "$5",
      ".nextui-collapse-view": { p: "$0" },
      ".nextui-collapse-content": { p: "$8 0 0" },
      pb: "$5",
      ".nextui-button": {
        fontSize: "13px",

        "&:not(:last-of-type)": {
          mb: "$5",
        },
        textDecoration: "none",
      },
      h3: {
        fontSize: "14px",
        fontWeight: "500",
        color: "$primary",
      },
      mb: "$5",
    },
    cardStyle = {
      ".nextui-button": {
        "&:not(:last-of-type)": {
          mb: "$5",
        },
        textDecoration: "none",
      },
      width: "auto",
    },
    cardHeaderStyle = { backgroundColor: "$accents0", fontWeight: "500" };
  return (
    <Grid.Container
      gap={1}
      css={{
        m: "$20 auto",
        mw: "700px",
        ".nextui-button": { textTransform: "capitalize", fontSize: "13px" },
      }}
    >
      <Grid sm={12} md={6}>
        <Card>
          <Card.Header css={cardHeaderStyle}>Logbook</Card.Header>
          <Card.Body css={cardStyle}>
            <Collapse title="Anesthetic" divider={false} css={co}>
              <Button as={$Link} flat color="primary" href="/anaesthetic">
                Add new case
              </Button>
              <Button as={$Link} flat color="primary" href="/cases/anaesthetic">
                View old cases
              </Button>
            </Collapse>
            <Collapse title="Intensive Care" divider={false} css={co}>
              <Button as={$Link} flat color="primary" href="/intensive">
                Add new case
              </Button>
              <Button as={$Link} flat color="primary" href="/cases/intensive">
                View old cases
              </Button>
            </Collapse>
            <Collapse title="Procedure" divider={false} css={co}>
              <Button as={$Link} flat color="primary" href="/procedure">
                Add new case
              </Button>
              <Button as={$Link} flat color="primary" href="/cases/procedure">
                View old cases
              </Button>
            </Collapse>
            <Button as={$Link} flat color="primary" href="/cases">
              View My Logbook
            </Button>
          </Card.Body>
        </Card>
      </Grid>
      <Grid sm={12} md={6}>
        <Grid.Container>
          <Grid sm={12}>
            <Card css={{ mb: "$5" }}>
              <Card.Header css={cardHeaderStyle}>Rotations</Card.Header>
              <Card.Body css={cardStyle}>
                <Button as={$Link} flat color="primary" href="/rotation">
                  Add new rotation
                </Button>
                <Button as={$Link} flat color="primary" href="/view-rotations">
                  View old rotations
                </Button>
              </Card.Body>
            </Card>
          </Grid>
          <Grid sm={12}>
            <Card>
              <Card.Header css={cardHeaderStyle}>
                Developmental Section
              </Card.Header>

              <Card.Body css={cardStyle}>
                <Button as={$Link} flat color="primary" href="/documents">
                  Document Store
                </Button>
                <Button as={$Link} flat color="primary" href="/assessments">
                  Assessments Section
                </Button>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}
