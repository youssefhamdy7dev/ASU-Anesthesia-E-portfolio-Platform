import React, { useState } from "react";
import {
  Card,
  Grid,
  Button,
  Text,
  Container,
  Radio,
  Loading,
} from "@nextui-org/react";
import Box from "@/styles/Box";
import { auth } from "@/src/services";
import Message from "@/src/components/Message";
import useForm from "@/src/hooks/useForm";
import Input from "@/src/components/Global/Input";

export default function register() {
  const state = useForm(),
    { data, errors, set } = state,
    [isCreated, setCreated] = useState(false),
    [isSending, setSending] = React.useState(false),
    create = async () => {
      setSending(true);
      try {
        await auth.admin.axios.post("/create", data);
        setCreated(true);
        setSending(true);
      } catch (error) {
        set({ errors: (error as any).response.data });
      }
      setSending(false);
    };
  return !isCreated ? (
    <Container justify="center" css={{ my: "$10", mw: "600px" }}>
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
          Create Supervisor Account
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
            />
          </Grid>
          <Grid>
            <Radio.Group
              label="Account Type"
              orientation="horizontal"
              size="sm"
              onChange={(value) => set({ data: { accountType: value } })}
              css={{ w: "227px" }}
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
            disabled={isSending}
            onClick={create}
            css={{ mw: "250px", justifyContent: "center" }}
          >
            {isSending ? (
              <Loading type="spinner" color="primary" size="md" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Card>
    </Container>
  ) : (
    <Container justify="center" css={{ my: "$10", mw: "600px" }}>
      <Message message="Account was created successfully" icon="success" />
    </Container>
  );
}
