import React, { useRef } from "react";
import {
  Card,
  Grid,
  Button,
  Text,
  Input,
  Dropdown,
  Loading,
} from "@nextui-org/react";
import Box from "@/styles/Box";
import Gender from "./Shared/Gender";
import { auth } from "../services";
import Message from "./Message";

export default function register() {
  const ResidencyDropdown = useRef<HTMLUListElement>(null),
    [selectedResidency, $setSelectedResidency] = React.useState(null),
    [selectedGender, setSelectedGender] = React.useState(null),
    [nid, setNationalId] = React.useState(null),
    [bdate, setBirthDate] = React.useState(null),
    [name, setName] = React.useState(null),
    [username, setUsername] = React.useState(null),
    [email, setEmail] = React.useState(null),
    [password, setPassword] = React.useState(null),
    [confirmPassword, setConfirmPassword] = React.useState(null),
    [formErrors, setError] = React.useState<any>({}),
    [isRegistered, setRegistered] = React.useState(false),
    [isLoading, setLoading] = React.useState(false),
    selectedResidencyValue = React.useMemo(
      () =>
        ResidencyDropdown.current?.querySelector(
          `[data-key="${selectedResidency}"]`
        )?.textContent || selectedResidency,
      [selectedResidency]
    ),
    setSelectedResidency = (a: any) => {
      $setSelectedResidency(a.currentKey);
    },
    register = () => {
      const data = {
        nid,
        gender: selectedGender,
        residency: selectedResidency,
        bdate,
        name,
        username,
        email,
        password,
        confirmPassword,
      };
      setLoading(true);
      auth.user
        .register(data)
        .then((user) => {
          setRegistered(true);
          setLoading(false);
        })
        .catch((data) => {
          const error = data.response.data;
          setLoading(false);
          setError({
            nid: error.nid && error.nid[0],
            name: error.name && error.name[0],
            username: error.username && error.username[0],
            email: error.email && error.email[0],
            password: error.password && error.password[0],
            gender: error.gender && error.gender && error.gender[0],
            bdate: error.bdate && error.bdate[0],
            residency: error.residency && error.residency[0],
            confirmPassword: error.confirmPassword && error.confirmPassword[0],
          });
        });
    };

  return !isRegistered ? (
    <>
      <Card
        css={{
          p: "20px",
        }}
      >
        <Text
          size={24}
          weight="bold"
          css={{
            as: "center",
            mb: "20px",
          }}
        >
          Registration
        </Text>
        <Grid.Container gap={2} justify="space-between">
          <Grid>
            <Input
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.nid
                  ? "$colors$error"
                  : nid
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="National ID"
              type="number"
              name="nid"
              onChange={(e: any) => setNationalId(e.target.value)}
              color={formErrors.nid ? "error" : "primary"}
              helperColor={formErrors.nid && "error"}
              helperText={formErrors.nid}
            />
          </Grid>
          <Grid>
            <Input
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.bdate
                  ? "$colors$error"
                  : bdate
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="Date of Birth"
              type="date"
              name="bdate"
              onChange={(e: any) => setBirthDate(e.target.value)}
              color={formErrors.bdate ? "error" : "primary"}
              helperColor={formErrors.bdate && "error"}
              helperText={formErrors.bdate}
            />
          </Grid>
          <Grid>
            <Input
              clearable
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.name
                  ? "$colors$error"
                  : name
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="Full Name"
              type="text"
              name="name"
              color={formErrors.name ? "error" : "primary"}
              helperColor={formErrors.name && "error"}
              helperText={formErrors.name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </Grid>
          <Grid css={{ minWidth: "280px" }}>
            <Grid.Container>
              <Grid>
                <Gender
                  selected={setSelectedGender as any}
                  width="110px"
                  display="inline-block"
                  title="Gender"
                  error={formErrors.gender}
                />
              </Grid>

              <Grid>
                <Box css={{ display: "inline-block", ml: "$8", w: "110px" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Residency Year
                  </label>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      css={{ tt: "capitalize" }}
                      color={(formErrors.residency && "error") as any}
                    >
                      {selectedResidencyValue || "Select year"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Single selection actions"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedResidency as any}
                      onSelectionChange={setSelectedResidency}
                      ref={ResidencyDropdown}
                      css={{ w: "110px", minWidth: "110px" }}
                    >
                      <Dropdown.Item key="1">1</Dropdown.Item>
                      <Dropdown.Item key="2">2</Dropdown.Item>
                      <Dropdown.Item key="3">3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {formErrors.residency && (
                    <Text size={"$xs"} color="error">
                      {formErrors.residency}
                    </Text>
                  )}
                </Box>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid>
            <Input
              clearable
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.username
                  ? "$colors$error"
                  : username
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="Username"
              type="text"
              name="username"
              onChange={(e: any) => setUsername(e.target.value)}
              color={formErrors.username ? "error" : "primary"}
              helperColor={formErrors.username && "error"}
              helperText={formErrors.username}
            />
          </Grid>
          <Grid>
            <Input
              clearable
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.email
                  ? "$colors$error"
                  : email
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="Email"
              type="email"
              name="email"
              onChange={(e: any) => setEmail(e.target.value)}
              color={formErrors.email ? "error" : "primary"}
              helperColor={formErrors.email && "error"}
              helperText={formErrors.email}
            />
          </Grid>

          <Grid>
            <Input
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.password
                  ? "$colors$error"
                  : password
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="Password"
              type="password"
              name="password"
              onChange={(e: any) => setPassword(e.target.value)}
              color={formErrors.password ? "error" : "primary"}
              helperColor={formErrors.password && "error"}
              helperText={formErrors.password}
            />
          </Grid>
          <Grid>
            <Input
              bordered
              fullWidth
              css={{
                w: "250px",
                $$inputBorderColor: formErrors.confirmPassword
                  ? "$colors$error"
                  : confirmPassword
                  ? "$colors$success"
                  : "$colors$border",
              }}
              size="lg"
              label="Confirm Password"
              type="password"
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              color={formErrors.confirmPassword ? "error" : "primary"}
              helperColor={formErrors.confirmPassword && "error"}
              helperText={formErrors.confirmPassword}
            />
          </Grid>
        </Grid.Container>

        <Box
          css={{ justifyContent: "center", w: "100%", d: "flex", mt: "$10" }}
        >
          <Button
            disabled={isLoading}
            onClick={register}
            css={{ mw: "250px", justifyContent: "center" }}
          >
            {isLoading ? (
              <Loading type="spinner" color="primary" size="md" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Card>
    </>
  ) : (
    <Message
      message="You have been registered successfully, Wait for account confirmation"
      icon="success"
    />
  );
}
