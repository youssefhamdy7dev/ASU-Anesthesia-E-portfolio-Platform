import React, { useRef, useState } from "react";
import {
  Card,
  Button,
  Text,
  Input,
  Container,
  Spacer,
  Link,
  Radio,
  Dropdown,
  Loading as _Loading,
} from "@nextui-org/react";
import Box from "@/styles/Box";
import { axios } from "@/src/services";
import Message from "@/src/components/Message";
import Loading from "@/src/components/Loading";

export default function $Rotation() {
  const [startDate, setStartDate] = useState(null),
    [endDate, setEndDate] = useState(null),
    ResidencyDropdown = useRef<HTMLUListElement>(null),
    RotationDropdown = useRef<HTMLUListElement>(null),
    AcademicDropdown = useRef<HTMLUListElement>(null),
    ClinicalDropdown = useRef<HTMLUListElement>(null),
    [createdMessage, setCreatedMessage] = React.useState<any>(null),
    [selectedType, setselectedType] = useState("Anesthesia"),
    [selectedRotation, setSelectedRotation] = React.useState(null),
    [selectedAcademic, setSelectedAcademic] = React.useState(null),
    [selectedClinical, setSelectedClinical] = React.useState(null),
    [selectedYear, setSelectedYear] = React.useState(null),
    [rotation, setRotationData] = useState<object | null>(null),
    [formErrors, setFormErrors] = React.useState<any>({}),
    [isSending, setSending] = React.useState(false);

  const selectedResidencyValue = React.useMemo(
      () =>
        ResidencyDropdown.current?.querySelector(`[data-key="${selectedYear}"]`)
          ?.textContent || "Select Year",
      [selectedYear]
    ),
    selectedRotationValue = React.useMemo(
      () =>
        RotationDropdown.current?.querySelector(
          `[data-key="${selectedRotation}"]`
        )?.textContent || "Select Rotation Name..",
      [selectedRotation]
    ),
    selectedAcademicValue = React.useMemo(
      () =>
        AcademicDropdown.current?.querySelector(
          `[data-key="${selectedAcademic}"]`
        )?.textContent || "Select Academic Supervisor",
      [selectedAcademic]
    ),
    selectedClinicalValue = React.useMemo(
      () =>
        ClinicalDropdown.current?.querySelector(
          `[data-key="${selectedClinical}"]`
        )?.textContent || "Select Clinical Supervisor",
      [selectedClinical]
    ),
    setSelectedResidency = (a: any) => {
      setSelectedYear(a.currentKey);
    },
    setRotation = (a: any) => {
      setSelectedRotation(a.currentKey);
    },
    setAcademic = (a: any) => {
      setSelectedAcademic(a.currentKey);
    },
    setClinical = (a: any) => {
      setSelectedClinical(a.currentKey);
    };

  const handleChange = (value: string) => {
      setselectedType(value);
      setSelectedRotation(null);
    },
    submit = async () => {
      setSending(true);
      const payload = {
        name: selectedRotation,
        startDate: startDate,
        endDate: endDate,
        stage: selectedYear,
        academic: selectedAcademic,
        clinical: selectedClinical,
      };
      try {
        setCreatedMessage(
          (await axios.post("/rotationSubmit", payload)).data.message
        );
      } catch (error) {
        setFormErrors((error as any).response.data);
      }
      setSending(false);
    };

  if (!rotation) {
    axios.get("/rotations").then(({ data }) => {
      setRotationData(data);
    });
  }

  return (
    <>
      {!createdMessage ? (
        <>
          {rotation ? (
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
                  Rotations
                </Text>

                <Box css={{ mb: "$10" }}>
                  <Radio.Group
                    label="Rotation type"
                    orientation="horizontal"
                    size="sm"
                    onChange={handleChange}
                    defaultValue="Anesthesia"
                  >
                    <Radio key="Anesthesia" value="Anesthesia">
                      Anesthesia
                    </Radio>
                    <Radio key="ICU" value="ICU">
                      ICU
                    </Radio>
                    <Radio key="Clinics" value="Clinics">
                      Clinics
                    </Radio>
                  </Radio.Group>
                </Box>

                <Box css={{ display: "inline-block", mb: "$10" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Rotation Name
                  </label>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color={formErrors.name && "error"}
                      css={{
                        w: "400px",
                        justifyContent: "space-between",
                      }}
                    >
                      {selectedRotationValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      css={{ minWidth: "400px", w: "400px" }}
                      aria-label="Single selection actions"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedRotation as any}
                      onSelectionChange={setRotation}
                      ref={RotationDropdown}
                    >
                      {rotation[`${selectedType}`]?.map((item) => {
                        return (
                          <Dropdown.Item key={item.name}>
                            {item.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  {formErrors.name && (
                    <Text size={"$xs"} color="error">
                      {formErrors.name}
                    </Text>
                  )}
                </Box>

                <Box css={{ display: "inline-block", mb: "$10" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Stage
                  </label>

                  <Dropdown>
                    <Dropdown.Button
                      flat
                      css={{ tt: "capitalize" }}
                      color={(formErrors.stage && "error") as any}
                    >
                      {selectedResidencyValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedYear as any}
                      onSelectionChange={setSelectedResidency}
                      ref={ResidencyDropdown}
                      css={{ w: "180px", minWidth: "150px" }}
                    >
                      <Dropdown.Item key="1">Residency Year 1</Dropdown.Item>
                      <Dropdown.Item key="2">Residency Year 2</Dropdown.Item>
                      <Dropdown.Item key="3">Residency Year 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {formErrors.stage && (
                    <Text size={"$xs"} color="error">
                      {formErrors.stage}
                    </Text>
                  )}
                </Box>

                <Box css={{ mb: "$10", w: "250px" }}>
                  <Input
                    bordered
                    size="md"
                    fullWidth
                    label="Start Date"
                    type="date"
                    onChange={(e) => setStartDate((e as any).target.value)}
                    css={{
                      $$inputBorderColor: formErrors.startDate
                        ? "$colors$error"
                        : startDate
                        ? "$colors$success"
                        : "$colors$border",
                    }}
                    color={formErrors.startDate ? "error" : "primary"}
                    helperColor={formErrors.startDate && "error"}
                    helperText={formErrors.startDate}
                  />
                </Box>

                <Box css={{ mb: "$10", w: "250px" }}>
                  <Input
                    bordered
                    size="md"
                    fullWidth
                    label="End Date"
                    type="date"
                    onChange={(e) => setEndDate((e as any).target.value)}
                    css={{
                      $$inputBorderColor: formErrors.endDate
                        ? "$colors$error"
                        : endDate
                        ? "$colors$success"
                        : "$colors$border",
                    }}
                    color={formErrors.endDate ? "error" : "primary"}
                    helperColor={formErrors.endDate && "error"}
                    helperText={formErrors.endDate}
                  />
                </Box>
                <Box css={{ display: "inline-block", mb: "$10" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Academic Supervisor
                  </label>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color={formErrors.academic && "error"}
                      css={{
                        w: "400px",
                        justifyContent: "space-between",
                      }}
                    >
                      {selectedAcademicValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      css={{ minWidth: "400px", w: "400px" }}
                      aria-label="Single selection actions"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedAcademic as any}
                      onSelectionChange={setAcademic}
                      ref={AcademicDropdown}
                    >
                      {(rotation as any).Academic.map((item) => (
                        <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {formErrors.academic && (
                    <Text size={"$xs"} color="error">
                      {formErrors.academic}
                    </Text>
                  )}
                </Box>

                <Box css={{ display: "inline-block", mb: "$10" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Clinical Supervisor
                  </label>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      color={formErrors.clinical && "error"}
                      css={{
                        w: "400px",
                        justifyContent: "space-between",
                      }}
                    >
                      {selectedClinicalValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      css={{ minWidth: "400px", w: "400px" }}
                      aria-label="Single selection actions"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedClinical as any}
                      onSelectionChange={setClinical}
                      ref={ClinicalDropdown}
                    >
                      {(rotation as any).Clinical.map((item) => (
                        <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {formErrors.clinical && (
                    <Text size={"$xs"} color="error">
                      {formErrors.clinical}
                    </Text>
                  )}
                </Box>
                <Spacer y={1} />
                <Box css={{ justifyContent: "center", w: "100%", d: "flex" }}>
                  <Button
                    disabled={isSending}
                    onClick={submit}
                    css={{ mw: "250px", justifyContent: "center" }}
                  >
                    {isSending ? (
                      <_Loading type="spinner" color="primary" size="md" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
              </Card>
            </Container>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Container justify="center" css={{ my: "$10", mw: "600px" }}>
          <Message message={createdMessage} icon="success">
            <Box css={{ d: "flex", mt: "$10", justifyContent: "center" }}>
              <Button as={Link} href="/rotation">
                Ok
              </Button>
            </Box>
          </Message>
        </Container>
      )}
    </>
  );
}
