import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Row,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import { axios } from "@/src/services";
import Modal from "../../Modal";
import Message from "../../Message";
import Box from "@/styles/Box";
import Loading from "../../Loading";

export default function Pending() {
  const [isLoaded, setLoaded] = useState(false),
    [data, setData] = useState<any>(null),
    [selectedId, setSelectedId] = useState(null),
    [selectedSu, $setSu] = useState(null),
    [inAccept, setInAccept] = useState(false),
    [error, setError] = useState(null),
    SUD = useRef<HTMLUListElement>(null),
    [modal, setModal] = useState<{
      open: boolean;
      title?: any | null;
      content?: any;
      route?: string | null;
    }>({
      open: false,
      title: null,
      content: null,
      route: null,
    }),
    selectedSuValue = React.useMemo(
      () =>
        SUD.current?.querySelector(`[data-key="${selectedSu}"]`)?.textContent ||
        "Select Academic Supervisor",
      [selectedSu]
    ),
    setSu = (a: any) => {
      $setSu(a.currentKey);
    };
  const onConfirm = () => {
      axios
        .post(modal.route as any, { id: selectedId, su: selectedSu })
        .then((response) => {
          const { data } = response;
          setError(null);
          if (data.message) {
            window.location.reload();
          }
        })
        .catch(({ response }) => {
          setError(response.data.su);
        });
    },
    onClose = () => {
      setInAccept(false);
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
    };

  if (!isLoaded) {
    if (!data) {
      axios.get("/pendingAcc").then((data) => {
        setLoaded(true);
        setData(data.data);
      });
    }
  }

  return isLoaded ? (
    data && Object.keys(data.pending).length > 0 ? (
      <>
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
            <Table.Column align="center">Action</Table.Column>
          </Table.Header>
          <Table.Body>
            {data.pending.map((account) => (
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
                        color="success"
                        size={"xs"}
                        auto
                        shadow
                        onClick={() => {
                          setInAccept(true);
                          setSelectedId(account.NID);
                          setModal({
                            open: true,
                            route: "acceptAcc",
                            title: (
                              <Text
                                size={15}
                                css={{
                                  padding: "$10 0 0",
                                  textAlign: "center",
                                  fontWeight: "$medium",
                                }}
                              >
                                Please Assign a Supervisor
                              </Text>
                            ),
                            content: "",
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
                          setSelectedId(account.NID);
                          setModal({
                            open: true,
                            route: "rejectAcc",
                            content: (
                              <Text
                                size={15}
                                css={{
                                  padding: "$10 0 0",
                                  textAlign: "center",
                                  fontWeight: "$medium",
                                }}
                              >
                                Are you sure you want to reject this account?
                              </Text>
                            ),
                          });
                        }}
                        auto
                        shadow
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Modal
          preventClose
          open={modal.open}
          title={modal.title}
          onClose={onClose}
          onConfirm={onConfirm}
          closeText="Cancel"
          confirmText="Ok"
        >
          {inAccept && (
            <>
              <Dropdown>
                <Dropdown.Button
                  flat
                  color={error ? "error" : "primary"}
                  css={{
                    d: "inline-flex",
                    justifyContent: "space-between",
                    mb: "0",
                  }}
                >
                  {selectedSuValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedSu as any}
                  onSelectionChange={setSu}
                  ref={SUD}
                >
                  {data.supervisors.map((item) => {
                    return (
                      <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>

              {error && (
                <Text size={"$xs"} css={{ mt: "$2" }} color="error">
                  {error}
                </Text>
              )}
            </>
          )}
          {modal.content}
        </Modal>
      </>
    ) : (
      <Box css={{ maxW: "500px", margin: "auto" }}>
        <Message message="There are no pending accounts" icon="info" />
      </Box>
    )
  ) : (
    <Loading color={"primary"} />
  );
}
