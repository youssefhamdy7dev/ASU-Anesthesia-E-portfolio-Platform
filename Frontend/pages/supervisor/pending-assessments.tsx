import {
  Button,
  Card,
  Container,
  Table,
  Text,
  Loading as $Loading,
  Modal,
} from "@nextui-org/react";
import Box from "@/styles/Box";
import React, { useRef, useState } from "react";
import { auth, axios } from "@/src/services";
import Message from "@/src/components/Message";
import Loading from "@/src/components/Loading";

export default function Assessments() {
  const [isDownloading, setDownloading] = useState(null),
    [isLoaded, setLoaded] = useState(false),
    [assessmentData, setAssessmentData] = useState([]),
    [selectedId, setSelectedId] = useState(null),
    [isRejecting, setRejecting] = useState(false),
    [isAccepting, setAccepting] = useState(false),
    [modal, setModal] = useState<{
      open: boolean;
      title?: string | null;
      content?: string | null;
      route?: string | null;
      btnColor?: string | null;
    }>({
      open: false,
      title: null,
      content: null,
      route: null,
      btnColor: null,
    }),
    onConfirm = async () => {
      setRejecting(true);
      setAccepting(true);
      await axios.post(modal.route as any, { id: selectedId });
      await getAssessments();
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
        btnColor: null,
      });
      setRejecting(false);
      setAccepting(false);
    },
    onClose = () => {
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
    },
    getAssessments = async () => {
      return await auth.admin.axios
        .get("/pendingAssessments")
        .then(({ data }) => {
          setLoaded(true);
          setAssessmentData(data);
        });
    };
  if (!isLoaded) {
    if (assessmentData.length === 0) {
      getAssessments();
    }
  }

  return (
    <>
      <Text
        size={24}
        weight="bold"
        css={{
          textAlign: "center",
          my: "$13",
        }}
      >
        Pending Assessments
      </Text>
      <Container className="container" justify="center" css={{ my: "$10" }}>
        {isLoaded ? (
          assessmentData.length > 0 ? (
            <Box css={{ mt: "$10", background: "#fff", borderRadius: "$base" }}>
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
                  <Table.Column>File Name</Table.Column>
                  <Table.Column>Category</Table.Column>
                  <Table.Column>Description</Table.Column>
                  <Table.Column align="center">Action</Table.Column>
                </Table.Header>
                <Table.Body>
                  {assessmentData.map((d) => {
                    const a: any = d;
                    return (
                      <Table.Row key={a.id}>
                        <Table.Cell>{a.assessment}</Table.Cell>
                        <Table.Cell>{a.category}</Table.Cell>
                        <Table.Cell>{a.description}</Table.Cell>
                        <Table.Cell css={{ dflex: "center" }}>
                          <Button
                            disabled={isDownloading === a.id || false}
                            color="primary"
                            size={"xs"}
                            shadow
                            auto
                            css={{ mr: "$5" }}
                            onClick={() => {
                              setDownloading(a.id);
                              axios
                                .get("/downloadAssessment", {
                                  params: { id: a.id },
                                  responseType: "blob",
                                })
                                .then(({ data }) => {
                                  const url = URL.createObjectURL(data),
                                    link = document.createElement("a");
                                  link.href = url;
                                  link.download = a.assessment;
                                  link.click();
                                })
                                .catch((e) => {})
                                .finally(() => {
                                  setDownloading(null);
                                });
                            }}
                          >
                            {isDownloading === a.id ? (
                              <$Loading
                                type="spinner"
                                color="primary"
                                size="md"
                              />
                            ) : (
                              "Download"
                            )}
                          </Button>
                          <Button
                            color="error"
                            size={"xs"}
                            css={{ mr: "$5" }}
                            onClick={() => {
                              setSelectedId(a.id);
                              setModal({
                                open: true,
                                route: "deleteAssessment",
                                content:
                                  "Are you sure you want to reject this assessment?",
                                btnColor: "error",
                              });
                            }}
                            shadow
                            auto
                          >
                            Reject
                          </Button>
                          <Button
                            color="success"
                            size={"xs"}
                            onClick={() => {
                              setSelectedId(a.id);
                              setModal({
                                open: true,
                                route: "acceptAssessment",
                                content:
                                  "Are you sure you want to accept this assessment?",
                                btnColor: "success",
                              });
                            }}
                            shadow
                            auto
                          >
                            Accept
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Box>
          ) : (
            <Box css={{ maxW: "500px", margin: "auto", mt: "$10" }}>
              <Message message="There are no recent assessments." icon="info" />
            </Box>
          )
        ) : (
          <Loading color={"primary"} />
        )}

        <Modal closeButton blur open={modal.open} onClose={onClose}>
          {modal.title && <Modal.Header>{modal.title}</Modal.Header>}
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat onPress={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isRejecting}
              auto
              flat
              onPress={onConfirm}
              color={modal.btnColor as any}
            >
              {isAccepting ? (
                <$Loading type="spinner" color="primary" size="md" />
              ) : (
                "Confirm"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
