import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Radio,
  Row,
  Table,
  Text,
} from "@nextui-org/react";
import { auth, axios } from "@/src/services";
import Modal from "../../Modal";
import Message from "../../Message";
import Box from "@/styles/Box";
import Loading from "../../Loading";
import useForm from "@/src/hooks/useForm";
import Input from "../../Global/Input";

export default function Accounts() {
  const state = useForm(),
    { data, errors, set, reset } = state,
    [isLoaded, setLoaded] = useState(false),
    [isSaving, setSaving] = React.useState(false),
    [accountsData, setAccountsData] = useState<any>([]),
    [selectedId, setSelectedId] = useState(null),
    [edit, setEdit] = useState<any>(null),
    [isSaved, setSaved] = useState(false),
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
      axios.post(modal.route as any, { id: selectedId }).then((response) => {
        const { data } = response;
        if (data.message) {
          window.location.reload();
        }
      });
    },
    onClose = () => {
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
    },
    save = async () => {
      setSaving(true);
      try {
        await auth.admin.axios.post("/editAcc", data);
        setSaved(true);
      } catch (error) {
        setSaved(false);
        set({ errors: (error as any).response.data });
      }
    };

  if (!isLoaded) {
    if (accountsData.length === 0) {
      axios.get("/accounts").then((data) => {
        setLoaded(true);
        setAccountsData(data.data);
      });
    }
  }

  if (edit) {
    return (
      <>
        <Container justify="center" css={{ my: "$10", mw: "600px" }}>
          <Box css={{ d: "flex", justifyContent: "space-between", mt: "$5" }}>
            <Box>
              <Button
                onClick={() => {
                  setSaved(false);
                  reset("all");
                  setEdit(null);
                }}
                size={"md"}
                css={{ mb: "$5" }}
                shadow
                auto
              >
                Back
              </Button>
            </Box>
          </Box>

          <Card
            css={{
              p: "20px",
            }}
          >
            <Text
              size={24}
              weight="medium"
              css={{
                as: "center",
                mb: "20px",
              }}
            >
              Edit{" "}
              <Text weight="bold" css={{ d: "inline-block" }}>
                "{edit.name}"
              </Text>{" "}
              Account
            </Text>
            <Grid.Container gap={2} justify="space-between">
              <Grid>
                <Input
                  state={state}
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  label="Supervisor Name"
                  type="text"
                  name="name"
                  color="primary"
                  width="250px"
                  initialValue={edit.name}
                />
              </Grid>
              <Grid>
                <Input
                  state={state}
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  label="Username"
                  type="text"
                  name="username"
                  color="primary"
                  width="250px"
                  initialValue={edit.username}
                />
              </Grid>
              <Grid>
                <Input
                  state={state}
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  label="Email"
                  type="email"
                  name="email"
                  color="primary"
                  width="250px"
                  initialValue={edit.email}
                />
              </Grid>
              <Grid>
                <Radio.Group
                  label="Account Type"
                  orientation="horizontal"
                  size="sm"
                  onChange={(value) => set({ data: { accountType: value } })}
                  css={{ w: "227px" }}
                  defaultValue={edit.accountType}
                >
                  <Radio key="A" value="A">
                    Academic
                  </Radio>
                  <Radio key="C" value="C">
                    Clinical
                  </Radio>
                </Radio.Group>
                {errors.accountType && (
                  <Text size={"$xs"} color="error" css={{ mb: "-$1" }}>
                    {errors.accountType}
                  </Text>
                )}
              </Grid>
              <Grid>
                <Input
                  state={state}
                  bordered
                  fullWidth
                  size="lg"
                  label="Password"
                  type="password"
                  name="password"
                  color="primary"
                  width="250px"
                />
              </Grid>
              <Grid>
                <Input
                  state={state}
                  bordered
                  fullWidth
                  size="lg"
                  label="Confirm Password"
                  name="confirm"
                  type="password"
                  color="primary"
                  width="250px"
                />
              </Grid>
            </Grid.Container>

            <Box
              css={{
                justifyContent: "center",
                w: "100%",
                d: "flex",
                mt: "$10",
              }}
            >
              <Button
                disabled={isSaving}
                onClick={save}
                css={{ mw: "250px", justifyContent: "center" }}
              >
                Save Changes
              </Button>
            </Box>
            {isSaved && (
              <Text css={{ textAlign: "center" }} size={"$sm"} color="success">
                Account has been saved successfully
              </Text>
            )}
          </Card>
        </Container>
      </>
    );
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
        Manage Accounts
      </Text>
      {isLoaded ? (
        <>
          <Text
            size={20}
            weight="bold"
            css={{
              m: "$10 0 $5",
            }}
          >
            Residents
          </Text>
          {accountsData.Residents.length > 0 ? (
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
                <Table.Column>NID</Table.Column>
                <Table.Column>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Gender</Table.Column>
                <Table.Column>Birthdate</Table.Column>
                <Table.Column>Residency Year</Table.Column>
                <Table.Column align="center">Action</Table.Column>
              </Table.Header>
              <Table.Body>
                {(accountsData as any).Residents.map((account) => (
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
                            color="error"
                            size={"xs"}
                            onClick={() => {
                              setSelectedId(account.NID);
                              setModal({
                                open: true,
                                route: "deleteRes",
                                content:
                                  "Are you sure you want to delete this account?",
                              });
                            }}
                            auto
                            shadow
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <Box css={{ maxW: "500px", margin: "auto" }}>
              <Message message="There are no pending accounts" icon="info" />
            </Box>
          )}

          <Text
            size={20}
            weight="bold"
            css={{
              m: "$20 0 $5",
            }}
          >
            Supervisors
          </Text>
          {accountsData.Supervisors.length > 0 ? (
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
                <Table.Column>ID</Table.Column>
                <Table.Column>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Permission</Table.Column>
                <Table.Column align="center">Action</Table.Column>
              </Table.Header>
              <Table.Body>
                {(accountsData as any).Supervisors.map((account) => (
                  <Table.Row key={account.id}>
                    <Table.Cell>{account.id}</Table.Cell>
                    <Table.Cell>{account.name}</Table.Cell>
                    <Table.Cell>{account.email}</Table.Cell>
                    <Table.Cell>
                      {account.accountType === "A" ? "Academic" : "Clinical"}
                    </Table.Cell>
                    <Table.Cell>
                      {account.permission == 1 ? "Administrator" : "Supervisor"}
                    </Table.Cell>
                    <Table.Cell>
                      <Box
                        css={{
                          dflex: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button
                          color="success"
                          size={"xs"}
                          auto
                          shadow
                          onClick={() => {
                            set({
                              data: {
                                id: account.id,
                                name: account.name,
                                email: account.email,
                                username: account.username,
                                accountType: account.accountType,
                              },
                            });
                            setEdit(account);
                            setSaving(false);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          color="error"
                          size={"xs"}
                          onClick={() => {
                            setSelectedId(account.id);
                            setModal({
                              open: true,
                              route: "deleteSup",
                              content:
                                "Are you sure you want to delete this account?",
                            });
                          }}
                          auto
                          shadow
                        >
                          Delete
                        </Button>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <Box css={{ maxW: "500px", margin: "auto" }}>
              <Message message="There are no pending accounts" icon="info" />
            </Box>
          )}
          <Modal
            open={modal.open}
            title={modal.title}
            onClose={onClose}
            onConfirm={onConfirm}
            closeText="Cancel"
            confirmText="Ok"
            confirmVariant="error"
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
        <Loading color={"primary"} />
      )}
    </>
  );
}
