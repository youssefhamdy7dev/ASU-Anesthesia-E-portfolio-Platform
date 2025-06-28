import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Text,
  Input,
  Container,
  Spacer,
  Textarea,
  Link,
  Loading as _Loading,
} from "@nextui-org/react";
import Box from "@/styles/Box";

import Facility from "@/src/components/Shared/Facility";
import Gender from "@/src/components/Shared/Gender";
import Age from "@/src/components/Shared/Age";
import Supervision from "@/src/components/Shared/Supervision";
import TimeSlots from "@/src/components/Shared/TimeSlots";
import shared, { SharedData } from "@/src/services/api/shared";
import { axios } from "@/src/services";
import Message from "@/src/components/Message";
import Procedure from "@/src/components/Shared/Procedure";
import ProcedureSpecialty from "@/src/components/Procedure/ProcedureSpecialty";
import Loading from "@/src/components/Loading";

export default function $Procedure() {
  const [date, setDate] = useState(null),
    [selectedGender, setSelectedGender] = useState(null),
    [selectedAge, setSelectedAge] = useState(null),
    [selectedAgeCategory, setSelectedAgeCategory] = useState(null),
    [selectedUnits, setSelectedUnits] = useState(null),
    [selectedSupervision, setSelectedSupervision] = useState(null),
    [selectedSuperSupervisor, setSelectedSupervisor] = useState(null),
    [selectedProcedure, setSelectedProcedure] = useState(null),
    [selectedSpecialty, setSelectedSpecialty] = useState(null),
    [selectedProcedureCategory, setSelectedProcedureCategory] = useState(null),
    [selectedNotes, setNotes] = useState(null),
    [selectedTimeSlot, setSelectedTimeSlot] = useState(null),
    [selectedFacility, setSelectedFacility] = useState(null),
    [selectedOther, setOther] = useState(null),
    [createdMessage, setCreatedMessage] = React.useState<any>(null),
    [isSending, setSending] = React.useState(false);

  const [sharedData, setSharedData] = useState<SharedData | null>(null),
    [procedure, setProcedureData] = useState<object | null>(null),
    [formErrors, setFormErrors] = React.useState<any>({}),
    submit = async () => {
      setSending(true);
      const payload = {
        date,
        timeSlot: selectedTimeSlot,
        gender: selectedGender,
        facility: selectedFacility,
        age: {
          id: selectedAge,
          category: selectedAgeCategory,
          unit: selectedUnits,
        },
        specialty: { id: selectedSpecialty, other: selectedOther },
        supervision: selectedSupervision,
        supervisor: selectedSuperSupervisor,
        procedure: {
          id: selectedProcedure,
          category: selectedProcedureCategory,
        },
        notes: selectedNotes,
      };

      try {
        setCreatedMessage(
          (await axios.post("/procedureSubmit", payload)).data.message
        );
      } catch (error) {
        setFormErrors((error as any).response.data);
      }
      setSending(false);
    };

  if (!procedure && !sharedData) {
    shared().then(($data) => {
      setSharedData($data as SharedData);
      axios.get("/procedure").then(({ data }) => {
        setProcedureData(data);
      });
    });
  }

  return (
    <>
      {!createdMessage ? (
        <>
          {procedure && sharedData ? (
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
                  Procedure
                </Text>

                <Box css={{ mb: "$15", w: "250px" }}>
                  <Input
                    bordered
                    size="md"
                    fullWidth
                    label="Date"
                    type="date"
                    onChange={(e) => setDate((e as any).target.value)}
                    css={{
                      $$inputBorderColor: formErrors.date
                        ? "$colors$error"
                        : date
                        ? "$colors$success"
                        : "$colors$border",
                    }}
                    color={formErrors.date ? "error" : "primary"}
                    helperColor={formErrors.date && "error"}
                    helperText={formErrors.date}
                  />
                </Box>

                <TimeSlots
                  selected={setSelectedTimeSlot}
                  selectedTimeSlot={selectedTimeSlot}
                  timeSlots={(sharedData as any).timeSlots}
                  error={formErrors.timeslot}
                />
                <Facility
                  selected={setSelectedFacility}
                  facilityList={(procedure as any).Facility}
                  error={formErrors.facility}
                />
                <Gender
                  selected={setSelectedGender as any}
                  width="110px"
                  display="inline-block"
                  error={formErrors.gender}
                />
                <Spacer y={0.9} />
                <Age
                  selectedAge={setSelectedAge}
                  selectedAgeCategory={setSelectedAgeCategory}
                  selectedUnits={setSelectedUnits}
                  data={sharedData?.age}
                  error={{
                    age: formErrors.age,
                    unit: formErrors.unit,
                    category: formErrors.category,
                  }}
                />
                <ProcedureSpecialty
                  error={formErrors.specialty}
                  selected={setSelectedSpecialty}
                  specialtyList={(procedure as any).Specialty}
                  setOther={setOther}
                />
                <Supervision
                  error={{
                    supervision: formErrors.supervision,
                    supervisor: formErrors.supervisor,
                  }}
                  selectedSupervision={setSelectedSupervision}
                  selectedSupervisor={setSelectedSupervisor}
                  data={{
                    supervisor: sharedData?.supervisor,
                    supervision: sharedData?.supervision,
                  }}
                />

                <Procedure
                  error={{
                    skill: formErrors.skillID,
                    category: formErrors.skillCategory,
                  }}
                  selectedProcedure={setSelectedProcedure}
                  selectedCategory={setSelectedProcedureCategory}
                  data={sharedData?.procedure}
                  withCard={(selectedProcedure && true) as any}
                />

                <Box>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Notes
                  </label>
                  <Textarea
                    bordered
                    rows={6}
                    width="400px"
                    onChange={(e) => setNotes(e.target.value)}
                  ></Textarea>
                </Box>
                <Spacer y={1} />
                <Box css={{ justifyContent: "center", w: "100%", d: "flex" }}>
                  <Button
                    disabled={isSending}
                    shadow
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
              <Button as={Link} href="/procedure">
                OK
              </Button>
            </Box>
          </Message>
        </Container>
      )}
    </>
  );
}
