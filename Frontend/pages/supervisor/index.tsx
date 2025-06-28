import { auth } from "@/src/services";
import { Card, Grid, Button, Badge } from "@nextui-org/react";
import $Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAdmin, setAdmin] = useState(false),
    [anesthetic, setAnesthetic] = useState(0),
    [intensive, setIntensive] = useState(0),
    [procedure, setProcedure] = useState(0),
    [rotation, setRotation] = useState(0),
    [account, setAccount] = useState(0),
    [assessment, setAssessment] = useState(0),
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

  useEffect(() => {
    auth.admin.axios.get("/notifyCases").then(({ data }) => {
      setAnesthetic(data.anesthetic);
      setIntensive(data.intensive);
      setProcedure(data.procedure);
      setAssessment(data.assessment);
    });
    auth.admin.axios.get("/notifyAdmin").then(({ data }) => {
      setRotation(data.rotation);
      setAccount(data.account);
    });
    setAdmin(auth.admin.adminInfo?.info?.permission === 1);
  }, [isAdmin]);

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
        <Grid.Container>
          {isAdmin && (
            <Card css={{ mb: "$5" }}>
              <Card.Header css={cardHeaderStyle}>Manage Accounts</Card.Header>
              <Card.Body css={cardStyle}>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/accounts/create"
                >
                  Create Supervisor Account
                </Button>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/accounts/pending"
                >
                  {account > 0 && (
                    <Badge
                      color="error"
                      size="sm"
                      css={{ border: "none", mr: "$2" }}
                    >
                      {account}
                    </Badge>
                  )}
                  Pending Accounts
                </Button>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/accounts"
                >
                  Manage All Accounts
                </Button>
              </Card.Body>
            </Card>
          )}
          <Grid sm={12}>
            <Card>
              <Card.Header css={cardHeaderStyle}>
                Residents Activities
              </Card.Header>
              <Card.Body css={cardStyle}>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/accounts/view-residents"
                >
                  View My Residents
                </Button>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/pending-assessments"
                >
                  {assessment > 0 && (
                    <Badge
                      color="error"
                      size="sm"
                      css={{ border: "none", mr: "$2" }}
                    >
                      {assessment}
                    </Badge>
                  )}
                  Pending Assessments
                </Button>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid sm={12} md={6}>
        <Grid.Container>
          {isAdmin && (
            <Grid sm={12}>
              <Card css={{ mb: "$5" }}>
                <Card.Header css={cardHeaderStyle}>Rotations</Card.Header>
                <Card.Body css={cardStyle}>
                  <Button
                    as={$Link}
                    flat
                    color="primary"
                    href="/supervisor/pending-rotation"
                  >
                    {rotation > 0 && (
                      <Badge
                        color="error"
                        size="sm"
                        css={{ border: "none", mr: "$2" }}
                      >
                        {rotation}
                      </Badge>
                    )}
                    Pending Rotations
                  </Button>
                </Card.Body>
              </Card>
            </Grid>
          )}

          <Grid sm={12}>
            <Card>
              <Card.Header css={cardHeaderStyle}>Manage Cases</Card.Header>

              <Card.Body css={cardStyle}>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/cases/pending-case-anesthetic"
                >
                  {anesthetic > 0 && (
                    <Badge
                      color="error"
                      size="sm"
                      css={{ border: "none", mr: "$2" }}
                    >
                      {anesthetic}
                    </Badge>
                  )}
                  Pending Anesthetic Case
                </Button>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/cases/pending-case-intensive"
                >
                  {intensive > 0 && (
                    <Badge
                      color="error"
                      size="sm"
                      css={{ border: "none", mr: "$2" }}
                    >
                      {intensive}
                    </Badge>
                  )}
                  Pending Intensive Care
                </Button>
                <Button
                  as={$Link}
                  flat
                  color="primary"
                  href="/supervisor/cases/pending-case-procedure"
                >
                  {procedure > 0 && (
                    <Badge
                      color="error"
                      size="sm"
                      css={{ border: "none", mr: "$2" }}
                    >
                      {procedure}
                    </Badge>
                  )}
                  Pending Procedure Case
                </Button>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}
