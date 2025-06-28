import React, { useState } from "react";
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
import shared, { SharedData } from "@/src/services/api/shared";
import { axios } from "@/src/services";
import Message from "@/src/components/Message";
import Procedure from "@/src/components/Shared/Procedure";
import Loading from "@/src/components/Loading";
import TimeSlots from "@/src/components/Shared/TimeSlots";
import Events from "@/src/components/intensive/Events";
import ICU from "@/src/components/intensive/ICU";
import Supervision from "@/src/components/Shared/Supervision";
import Teaching from "@/src/components/Shared/Teaching";
import Support from "@/src/components/intensive/Support";
import Organ from "@/src/components/intensive/Organ";

export default function IntensiveCare() {
  const [date, setDate] = useState(null),
    [selectedGender, setSelectedGender] = useState(null),
    [selectedAge, setSelectedAge] = useState(null),
    [selectedAgeCategory, setSelectedAgeCategory] = useState(null),
    [selectedUnits, setSelectedUnits] = useState(null),
    [selectedEvent, setSelectedEvent] = useState(null),
    [selectedSupervision, setSelectedSupervision] = useState(null),
    [selectedSuperSupervisor, setSelectedSupervisor] = useState(null),
    [selectedProcedure, setSelectedProcedure] = useState(null),
    [selectedProcedureCategory, setSelectedProcedureCategory] = useState(null),
    [selectedSupport, setSelectedSupport] = useState(null),
    [selectedSupportCategory, setSelectedSupportCategory] = useState(null),
    [selectedNotes, setNotes] = useState(null),
    [selectedDiagnosis, setDiagnosis] = useState(null),
    [selectedMorbidities, setMorbidities] = useState(null),
    [selectedTimeSlot, setSelectedTimeSlot] = useState(null),
    [selectedFacility, setSelectedFacility] = useState(null),
    [selectedTeaching, setSelectedTeaching] = useState(null),
    [selectedOrgan, setSelectedOrgan] = useState(null),
    [selectedICU, setSelectedICU] = useState(null),
    [createdMessage, setCreatedMessage] = React.useState<any>(null),
    [isSending, setSending] = React.useState(false);

  const [sharedData, setSharedData] = useState<SharedData | null>(null),
    [intensive, setIntensiveData] = useState<object | null>(null),
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
        event: selectedEvent,
        procedure: {
          id: selectedProcedure,
          category: selectedProcedureCategory,
        },
        support: {
          id: selectedSupport,
          category: selectedSupportCategory,
        },
        organ: selectedOrgan,
        diagnosis: selectedDiagnosis,
        morbidities: selectedMorbidities,
        teaching: selectedTeaching,
        specialty: selectedICU,
        notes: selectedNotes,
        supervision: selectedSupervision,
        supervisor: selectedSuperSupervisor,
      };

      try {
        setCreatedMessage(
          (await axios.post("/intensiveSubmit", payload)).data.message
        );
      } catch (error) {
        setFormErrors((error as any).response.data);
      }
      setSending(false);
    };

  if (!intensive && !sharedData) {
    shared().then(($data) => {
      setSharedData($data as SharedData);
      axios.get("/intensive").then(({ data }) => {
        setIntensiveData(data);
      });
    });
  }

  return (
    <>
      {!createdMessage ? (
        <>
          {intensive && sharedData ? (
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
                  Intensive Care
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
                  facilityList={(intensive as any).Facility}
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
                <Events
                  error={formErrors.event}
                  selected={setSelectedEvent}
                  events={(intensive as any).Event}
                />
                <ICU
                  error={formErrors.specialty}
                  selected={setSelectedICU}
                  ICU={(intensive as any).Specialty}
                />
                <Box css={{ mb: "$10" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Primary diagnosis
                  </label>
                  <Textarea
                    bordered
                    rows={6}
                    width="400px"
                    onChange={(e) => setDiagnosis(e.target.value)}
                    css={{
                      $$inputBorderColor: formErrors.diagnosis
                        ? "$colors$error"
                        : selectedDiagnosis
                        ? "$colors$success"
                        : "$colors$border",
                    }}
                    color={formErrors.diagnosis ? "error" : "primary"}
                    helperColor={formErrors.diagnosis && "error"}
                    helperText={formErrors.diagnosis}
                  ></Textarea>
                </Box>
                <Box css={{ mb: "$10" }}>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Co-morbidities
                  </label>
                  <Textarea
                    bordered
                    rows={6}
                    width="400px"
                    onChange={(e) => setMorbidities(e.target.value)}
                    css={{
                      $$inputBorderColor: formErrors.morbidities
                        ? "$colors$error"
                        : selectedMorbidities
                        ? "$colors$success"
                        : "$colors$border",
                    }}
                    color={formErrors.morbidities ? "error" : "primary"}
                    helperColor={formErrors.morbidities && "error"}
                    helperText={formErrors.morbidities}
                  ></Textarea>
                </Box>
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
                <Teaching
                  error={formErrors.teaching}
                  selected={setSelectedTeaching}
                  data={(intensive as any).Teaching}
                />
                <Organ error={formErrors.organ} selected={setSelectedOrgan} />
                <Support
                  error={{
                    support: formErrors.supportID,
                    category: formErrors.supportCategory,
                  }}
                  selectedSupport={setSelectedSupport}
                  selectedCategory={setSelectedSupportCategory}
                  data={{
                    support: (intensive as any).Support,
                    category: (intensive as any).SupportCategory,
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
              <Button as={Link} href="/intensive">
                OK
              </Button>
            </Box>
          </Message>
        </Container>
      )}
    </>
  );
}
