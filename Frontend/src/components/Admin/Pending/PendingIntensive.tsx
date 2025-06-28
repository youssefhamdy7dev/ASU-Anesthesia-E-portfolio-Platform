import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Text } from "@nextui-org/react";
import { auth } from "@/src/services";
import Modal from "../../Modal";
import Message from "../../Message";
import Box from "@/styles/Box";
import Loading from "../../Loading";

export default function Pending() {
  const [isLoaded, setLoaded] = useState(false),
    [pendingData, setPendingData] = useState([]),
    [selectedId, setSelectedId] = useState(null),
    [inView, setView] = useState<any>(null),
    [modal, setModal] = useState<{
      open: boolean;
      title?: string | null;
      content?: any;
      route?: string | null;
    }>({
      open: false,
      title: null,
      content: null,
      route: null,
    });

  const onConfirm = () => {
      auth.admin.axios
        .post(modal.route as any, { id: selectedId })
        .then((response) => {
          window.location.reload();
        });
    },
    onClose = () => {
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
    };
  if (!isLoaded) {
    if (pendingData.length === 0) {
      auth.admin.axios.get("/pendingCaseIntensive").then(({ data }) => {
        setLoaded(true);
        setPendingData(data);
      });
    }
  }

  return isLoaded ? (
    pendingData.length > 0 ? (
      <>
        {inView ? (
          <>
            <Box css={{ d: "flex", justifyContent: "space-between", mt: "$5" }}>
              <Box>
                <Button
                  onClick={() => {
                    setView(null);
                  }}
                  size={"md"}
                  css={{ mb: "$5" }}
                  shadow
                  auto
                >
                  Back
                </Button>
              </Box>
              <Box css={{ d: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="success"
                  size={"md"}
                  auto
                  shadow
                  css={{ mr: "$5" }}
                  onClick={() => {
                    setSelectedId(inView.Intensive.id);
                    setModal({
                      open: true,
                      route: "acceptCaseIntensive",
                      content: "Are you sure you want to accept this case?",
                    });
                  }}
                >
                  Accept
                </Button>
                <Button
                  color="error"
                  size={"md"}
                  onClick={() => {
                    setSelectedId(inView.Intensive.id);
                    setModal({
                      open: true,
                      route: "rejectCaseIntensive",
                      content: "Are you sure you want to reject this case?",
                    });
                  }}
                  auto
                  shadow
                >
                  Reject
                </Button>
              </Box>
            </Box>

            <Card css={{ padding: "$10" }}>
              <Box
                as={"ul"}
                css={{
                  listStyle: "none",
                  $$listBorder: "2px solid $colors$gray200",
                  border: "$$listBorder",
                  m: 0,
                  p: 0,
                  borderRadius: "5px",
                  overflow: "hidden",
                  ">li": {
                    d: "flex",
                    "&:nth-child(odd) > div": {
                      backgroundColor: "$gray100",
                    },

                    "&:not(:first-of-type)": {
                      borderTop: "$$listBorder",
                    },
                    ">div": {
                      d: "inline-block",
                      padding: "$8",

                      "&:first-of-type": {
                        borderRight: "$$listBorder",
                        fontWeight: "500",
                        width: "20%",
                        d: "flex",
                        alignItems: "center",
                      },
                      "&:last-of-type": {
                        width: "100%",
                      },
                      "&:last-of-type ul": {
                        p: "0 $10",
                        overFlow: "hidden",
                        borderRadius: "5px",
                        width: "auto",
                        li: {
                          padding: "$5",
                          "&:nth-child(odd)": {
                            backgroundColor: "$gray300",
                            borderRadius: "5px",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <Box as={"li"}>
                  <Box>Case ID</Box>
                  <Box>{inView.Intensive.id}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Date</Box>
                  <Box>{inView.Intensive.date}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Time slot</Box>
                  <Box>{inView.Intensive.timeSlot}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Facility</Box>
                  <Box>{inView.Intensive.facility}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Gender</Box>
                  <Box>
                    {inView.Intensive.gender === "m" ? "Male" : "Female"}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Age</Box>
                  <Box>
                    {`${inView.Intensive.age} ${inView.Intensive.ageUnit} - ${inView.Intensive.ageCategory}`}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>ICU Primary Specialty</Box>
                  <Box>{inView.Intensive.icuPrimarySpecialty}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Supervision</Box>
                  <Box>{inView.Intensive.supervision}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Supervisor Role</Box>
                  <Box>
                    {inView.Intensive.supervisorRole === null
                      ? "none"
                      : inView.Intensive.supervisorRole}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Teaching</Box>
                  <Box>{inView.Intensive.teaching}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Support Type</Box>
                  <Box>{inView.Support.Support}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Support Categories</Box>
                  <Box>
                    <Box as={"ul"} css={{ padding: "$5" }}>
                      {inView.Support.Category.map((c) => (
                        <Box as="li">{c}</Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Procedure (Core Skill)</Box>
                  <Box>{inView.CaseProcedures.Skill}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Procedure (Categories)</Box>
                  <Box>
                    <Box as={"ul"} css={{ padding: "$5" }}>
                      {inView.CaseProcedures.Category.map((c) => (
                        <Box as="li">{c}</Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </>
        ) : (
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
              <Table.Column>Case ID</Table.Column>
              <Table.Column>Resident ID</Table.Column>
              <Table.Column>Resident Name</Table.Column>
              <Table.Column>Case Time</Table.Column>
              <Table.Column>Case Date</Table.Column>
              <Table.Column>Creation Date</Table.Column>
              <Table.Column>Residency Year</Table.Column>
              <Table.Column align="center">Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {(pendingData as any).map((_case) => {
                const Intensive = _case.IntensiveCase,
                  CaseProcedures = _case.CaseProcedures,
                  Support = _case.Support,
                  Resident = _case.Resident;
                return (
                  <Table.Row key={Intensive.id}>
                    <Table.Cell>{Intensive.id}</Table.Cell>
                    <Table.Cell>{Resident.NID}</Table.Cell>
                    <Table.Cell>{Resident.name}</Table.Cell>
                    <Table.Cell>{Intensive.timeSlot}</Table.Cell>
                    <Table.Cell>{Intensive.date}</Table.Cell>
                    <Table.Cell>{Intensive.creationDate}</Table.Cell>
                    <Table.Cell>{Resident.residencyYear}</Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                          <Button
                            color="success"
                            size={"xs"}
                            auto
                            shadow
                            onClick={() => {
                              setSelectedId(Intensive.id);
                              setModal({
                                open: true,
                                route: "acceptCaseIntensive",
                                content:
                                  "Are you sure you want to accept this case?",
                              });
                            }}
                          >
                            Accept
                          </Button>
                        </Col>
                        <Col css={{ d: "flex" }}>
                          <Button
                            color="error"
                            size={"xs"}
                            onClick={() => {
                              setSelectedId(Intensive.id);
                              setModal({
                                open: true,
                                route: "rejectCaseIntensive",
                                content:
                                  "Are you sure you want to reject this case?",
                              });
                            }}
                            auto
                            shadow
                          >
                            Reject
                          </Button>
                        </Col>
                        <Col css={{ d: "flex" }}>
                          <Button
                            color="primary"
                            size={"xs"}
                            onClick={() => {
                              setView({
                                Intensive,
                                CaseProcedures,
                                Support,
                              });
                            }}
                            auto
                            shadow
                          >
                            View
                          </Button>
                        </Col>
                      </Row>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
        <Modal
          open={modal.open}
          title={modal.title}
          onClose={onClose}
          onConfirm={onConfirm}
          closeText="Cancel"
          confirmText="Ok"
        >
          <Text
            size={15}
            css={{
              padding: "$10 0 0",
              textAlign: "center",
              fontWeight: "$medium",
            }}
          >
            {modal.content}
          </Text>
        </Modal>
      </>
    ) : (
      <Box css={{ maxW: "500px", margin: "auto" }}>
        <Message message="There are no pending cases." icon="info" />
      </Box>
    )
  ) : (
    <Loading color={"primary"} />
  );
}
