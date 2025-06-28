import React, { useState } from "react";
import { Button, Col, Row, Table, Text } from "@nextui-org/react";
import { auth } from "@/src/services";
import Box from "@/styles/Box";
import Message from "@/src/components/Message";
import Loading from "@/src/components/Loading";
import Portfolio from "@/src/components/Portfolio";

export default function Pending() {
  const [isLoaded, setLoaded] = useState(false),
    [data, setData] = useState([]),
    [portfolio, setPortfolio] = useState<any>(null);

  if (!isLoaded) {
    if (data.length === 0) {
      auth.admin.axios.get("/residents").then((data) => {
        setLoaded(true);
        setData(data.data.Residents);
      });
    }
  }
  if (portfolio) {
    return (
      <>
        <Button
          onClick={() => {
            setPortfolio(null);
          }}
          size={"md"}
          css={{ mb: "$5", mt: "$15", ml: "$10" }}
          shadow
          auto
        >
          Back
        </Button>
        <Portfolio data={portfolio} />;
      </>
    );
  }
  return isLoaded ? (
    <>
      {data.length > 0 ? (
        <>
          <Text
            size={24}
            weight="bold"
            css={{
              textAlign: "center",
              my: "$13",
            }}
          >
            My Residents
          </Text>
          <Table
            striped
            sticked
            selectionMode="single"
            css={{
              height: "auto",
              minWidth: "100%",
              "tbody:before": {
                content: "",
                marginBottom: "$5",
                display: "block",
              },
            }}
          >
            <Table.Header>
              <Table.Column>National ID</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Gender</Table.Column>
              <Table.Column>Birthdate</Table.Column>
              <Table.Column>Residency Year</Table.Column>
              <Table.Column>View</Table.Column>
            </Table.Header>
            <Table.Body>
              {(data as any).map((account) => (
                <Table.Row key={account.NID}>
                  <Table.Cell>{account.NID}</Table.Cell>
                  <Table.Cell>{account.name}</Table.Cell>
                  <Table.Cell>{account.email}</Table.Cell>
                  <Table.Cell>
                    {account.gender === "m" ? "Male" : "Female"}
                  </Table.Cell>
                  <Table.Cell>{account.birthdate}</Table.Cell>
                  <Table.Cell>{account.residencyYear}</Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      <Col css={{ d: "flex" }}>
                        <Button
                          color="primary"
                          size={"xs"}
                          onClick={() => {
                            auth.admin.axios
                              .post("/viewPortfolio", { id: account.NID })
                              .then(({ data }) => {
                                setPortfolio(data);
                              });
                          }}
                          auto
                        >
                          View Portfolio
                        </Button>
                      </Col>
                    </Row>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <Box css={{ maxW: "500px", margin: "auto" }}>
          <Message message="There are no assigned residents" icon="info" />
        </Box>
      )}
    </>
  ) : (
    <Loading color={"primary"} />
  );
}
