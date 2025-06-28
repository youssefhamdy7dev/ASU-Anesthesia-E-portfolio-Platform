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
      auth.admin.axios.get("/pendingCaseAnesthetic").then(({ data }) => {
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
                    setSelectedId(inView.Anesthetic.id);
                    setModal({
                      open: true,
                      route: "acceptCaseAnesthetic",
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
                    setSelectedId(inView.Anesthetic.id);
                    setModal({
                      open: true,
                      route: "rejectCaseAnesthetic",
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
                  <Box>{inView.Anesthetic.id}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Date</Box>
                  <Box>{inView.Anesthetic.date}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Time slot</Box>
                  <Box>{inView.Anesthetic.timeSlot}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Facility</Box>
                  <Box>{inView.Anesthetic.facility}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Gender</Box>
                  <Box>
                    {inView.Anesthetic.gender === "m" ? "Male" : "Female"}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Age</Box>
                  <Box>
                    {`${inView.Anesthetic.age} ${inView.Anesthetic.ageUnit} - ${inView.Anesthetic.ageCategory}`}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Case Priority</Box>
                  <Box>{inView.Anesthetic.casePriority}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>ASA-PS Classification</Box>
                  <Box>{inView.Anesthetic.class}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Mode of Anesthesia</Box>
                  <Box>{inView.Anesthetic.mode}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Primary Specialty</Box>
                  <Box>{inView.Anesthetic.primarySpecialty}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Primary Specialty Operation</Box>
                  <Box>{inView.Anesthetic.primaryOperation}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Others</Box>
                  <Box>
                    {!inView.Anesthetic.pOthers
                      ? "none"
                      : inView.Anesthetic.pOthers}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Secondary Specialty</Box>
                  <Box>
                    {!inView.Anesthetic.secondarySpecialty
                      ? "none"
                      : inView.Anesthetic.secondarySpecialty}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Secondary Specialty Operation</Box>
                  <Box>
                    {!inView.Anesthetic.secondaryOperation
                      ? "none"
                      : inView.Anesthetic.secondaryOperation}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Others</Box>
                  <Box>
                    {!inView.Anesthetic.sOthers
                      ? "none"
                      : inView.Anesthetic.sOthers}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Supervision</Box>
                  <Box>{inView.Anesthetic.supervision}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Supervisor Role</Box>
                  <Box>
                    {inView.Anesthetic.supervision === "Solo"
                      ? "none"
                      : inView.Anesthetic.supervisorRole}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Teaching</Box>
                  <Box>{inView.Anesthetic.teaching}</Box>
                </Box>

                {!inView.CaseProcedures.Skill ? (
                  <Box as={"li"}>
                    <Box>Core Skills</Box>
                    <Box>none</Box>
                  </Box>
                ) : (
                  <>
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
                  </>
                )}
                {!inView.RegionalProcedure.regionalProcedure ? (
                  <Box as={"li"}>
                    <Box>Regional Anesthesia</Box>
                    <Box>none</Box>
                  </Box>
                ) : (
                  <>
                    <Box as={"li"}>
                      <Box>Regional Procedure</Box>
                      <Box>{inView.RegionalProcedure.regionalProcedure}</Box>
                    </Box>
                    <Box as={"li"}>
                      <Box>Technique</Box>
                      <Box>{inView.RegionalProcedure.technique}</Box>
                    </Box>
                    <Box as={"li"}>
                      <Box>Catheter?</Box>
                      <Box>
                        {inView.RegionalProcedure.catheter === "y"
                          ? "Yes"
                          : "No"}
                      </Box>
                    </Box>
                    <Box as={"li"}>
                      <Box>Supervision</Box>
                      <Box>{inView.RegionalProcedure.supervision}</Box>
                    </Box>
                    <Box as={"li"}>
                      <Box>Notes</Box>
                      <Box>{inView.RegionalProcedure.notes}</Box>
                    </Box>
                  </>
                )}
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
                const Anesthetic = _case.AnestheticCase,
                  RegionalProcedure = _case.RegionalProcedure,
                  CaseProcedures = _case.CaseProcedures,
                  Resident = _case.Resident;
                return (
                  <Table.Row key={Anesthetic.id}>
                    <Table.Cell>{Anesthetic.id}</Table.Cell>
                    <Table.Cell>{Resident.NID}</Table.Cell>
                    <Table.Cell>{Resident.name}</Table.Cell>
                    <Table.Cell>{Anesthetic.timeSlot}</Table.Cell>
                    <Table.Cell>{Anesthetic.date}</Table.Cell>
                    <Table.Cell>{Anesthetic.creationDate}</Table.Cell>
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
                              setSelectedId(Anesthetic.id);
                              setModal({
                                open: true,
                                route: "acceptCaseAnesthetic",
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
                              setSelectedId(Anesthetic.id);
                              setModal({
                                open: true,
                                route: "rejectCaseAnesthetic",
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
                                Anesthetic,
                                RegionalProcedure,
                                CaseProcedures,
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
