import React, { useState } from "react";
import {
  Card,
  Button,
  Text,
  Input,
  Container,
  Spacer,
  Radio,
  Textarea,
  Link,
  Loading as _Loading,
} from "@nextui-org/react";
import Box from "@/styles/Box";

import Classification from "@/components/Anaesthetic/Classification";
import Facility from "@/src/components/Shared/Facility";
import PrimarySpecialty from "@/components/Anaesthetic/PrimarySpecialty";
import Gender from "@/src/components/Shared/Gender";
import Age from "@/src/components/Shared/Age";
import SecondarySpecialty from "@/components/Anaesthetic/SecondarySpecialty";
import Teaching from "@/src/components/Shared/Teaching";
import ModeOfAnesthesia from "@/components/Anaesthetic/ModeOfAnesthesia";
import RegionalAnesthesia from "@/components/Anaesthetic/RegionalAnesthesia";
import Supervision from "@/src/components/Shared/Supervision";
import ProcedureQuestion from "@/src/components/Anaesthetic/ProcedureQuestion";
import TimeSlots from "@/src/components/Shared/TimeSlots";
import shared, { SharedData } from "@/src/services/api/shared";
import { axios } from "@/src/services";
import Message from "@/src/components/Message";
import Loading from "@/src/components/Loading";

export default function Anaesthetic() {
  const [date, setDate] = useState(null),
    [selectedGender, setSelectedGender] = useState(null),
    [selectedAge, setSelectedAge] = useState(null),
    [selectedAgeCategory, setSelectedAgeCategory] = useState(null),
    [selectedUnits, setSelectedUnits] = useState(null),
    [anaesthetic, setAnestheticData] = useState<object | null>(null),
    [selectedSupervision, setSelectedSupervision] = useState(null),
    [selectedSuperSupervisor, setSelectedSupervisor] = useState(null),
    [selectedRegionalSupervision, setRegionalSupervision] = useState(null),
    [selectedTeaching, setSelectedTeaching] = useState(null),
    [selectedMode, setSelectedMode] = useState(null),
    [selectedRegionalType, setSelectedRegionalType] = useState(null),
    [selectedTechnique, setSelectedTechnique] = useState(null),
    [selectedRegionalNotes, setSelectedRegionalNotes] = useState(null),
    [selectedCatheter, setSelectedCatheter] = useState(null),
    [regionalStatus, setRegionalStatus] = useState(null),
    [selectedQuestionProcedure, setSelectedQuestionProcedure] = useState(null),
    [selectedQuestionProcedureCategory, setSelectedQuestionProcedureCategory] =
      useState(null),
    [procedureQuestionStatus, setProcedureQuestionStatus] = useState(null),
    [selectedSignificant, setSignificant] = useState(null),
    [selectedPrimarySpecialty, setSelectedPrimarySpecialty] = useState(null),
    [selectedPrimarySpecialtyOperation, setSelectedPrimarySpecialtyOperation] =
      useState(null),
    [selectedSecondarySpecialty, setSelectedSecondarySpecialty] =
      useState(null),
    [
      selectedSecondarySpecialtyOperation,
      setSelectedSecondarySpecialtyOperation,
    ] = useState(null),
    [selectedTimeSlot, setSelectedTimeSlot] = useState(null),
    [selectedFacility, setSelectedFacility] = useState(null),
    [primaryOthers, setPrimaryOthers] = useState(null),
    [secondaryOthers, setSecondaryOthers] = useState(null),
    [selectedClassification, setSelectedClassification] = useState(null),
    [isSelectedSecondarySpecialty, setSpecialtyStatus] = useState(null),
    [casePriority, setCasePriority] = useState(null),
    [createdMessage, setCreatedMessage] = React.useState<any>(null),
    [isSending, setSending] = React.useState(false);

  const [sharedData, setSharedData] = useState<SharedData | null>(null),
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
        class: selectedClassification,
        priority: casePriority,
        primary: {
          specialty: selectedPrimarySpecialty,
          operation: {
            id: selectedPrimarySpecialtyOperation,
            others: primaryOthers,
          },
        },
        secondary: {
          present: isSelectedSecondarySpecialty,
          specialty: selectedSecondarySpecialty,
          operation: {
            id: selectedSecondarySpecialtyOperation,
            others: secondaryOthers,
          },
        },
        supervision: selectedSupervision,
        supervisor: selectedSuperSupervisor,
        teaching: selectedTeaching,
        mode: selectedMode,
        regional: {
          status: regionalStatus,
          type: selectedRegionalType,
          technique: selectedTechnique,
          catheter: selectedCatheter,
          supervision: selectedRegionalSupervision,
          notes: selectedRegionalNotes,
        },
        procedure: {
          id: selectedQuestionProcedure,
          status: procedureQuestionStatus,
          category: selectedQuestionProcedureCategory,
        },
        significant: selectedSignificant,
      };

      try {
        setCreatedMessage(
          (await axios.post("/anestheticSubmit", payload)).data.message
        );
      } catch (error) {
        setFormErrors((error as any).response.data);
      }
      setSending(false);
    };

  if (!anaesthetic && !sharedData) {
    shared().then((data) => {
      setSharedData(data as SharedData);
      axios.get("/anesthetic").then(({ data }) => {
        setAnestheticData(data);
      });
    });
  }

  return (
    <>
      {!createdMessage ? (
        <>
          {anaesthetic && sharedData ? (
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
                  Anaesthetic
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
                  facilityList={(anaesthetic as any).Facility}
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

                <Classification
                  error={formErrors.class}
                  selected={setSelectedClassification}
                  classes={(anaesthetic as any).ASAPS}
                />
                <Box css={{ mb: "$10" }}>
                  <Radio.Group
                    label="Case Priority"
                    defaultValue="primary"
                    orientation="horizontal"
                    size="sm"
                    onChange={setCasePriority as any}
                  >
                    {(anaesthetic as any).CasePriority.map((priority) => (
                      <Radio value={priority.id} key={priority.id}>
                        {priority.priority}
                      </Radio>
                    ))}
                  </Radio.Group>
                  {formErrors.priority && (
                    <Text size={"$xs"} color="error">
                      {formErrors.priority}
                    </Text>
                  )}
                </Box>

                <PrimarySpecialty
                  selectedSpecialty={setSelectedPrimarySpecialty}
                  selectedOperations={setSelectedPrimarySpecialtyOperation}
                  setOthers={setPrimaryOthers}
                  data={{
                    specialty: (anaesthetic as any).Specialty,
                    operations: (anaesthetic as any).Operation,
                  }}
                  error={{
                    specialty: formErrors.primarySpecialty,
                    operation: formErrors.primaryOp,
                  }}
                />
                <SecondarySpecialty
                  specialtyStatus={setSpecialtyStatus}
                  selectedSpecialty={setSelectedSecondarySpecialty}
                  selectedOperation={setSelectedSecondarySpecialtyOperation}
                  setOthers={setSecondaryOthers}
                  specialty={(anaesthetic as any).Specialty}
                  operations={(anaesthetic as any).Operation}
                  error={{
                    specialty: formErrors.secondarySpecialty,
                    operation: formErrors.secondaryOp,
                  }}
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
                <Teaching
                  error={formErrors.teaching}
                  selected={setSelectedTeaching}
                  data={(anaesthetic as any).Teaching}
                />
                <ModeOfAnesthesia
                  error={formErrors.mode}
                  selected={setSelectedMode}
                  data={(anaesthetic as any).ModeOfAnesthesia}
                />
                <RegionalAnesthesia
                  regionalStatus={setRegionalStatus}
                  selectedCatheter={setSelectedCatheter}
                  selectedRegionalNotes={setSelectedRegionalNotes}
                  selectedTechnique={setSelectedTechnique}
                  selectedRegionalType={setSelectedRegionalType}
                  data={{
                    regionalType: (anaesthetic as any).RegionalType,
                    supervision: sharedData?.supervision,
                    technique: (anaesthetic as any).Technique,
                  }}
                  selectedSupervision={setRegionalSupervision}
                  error={{
                    supervision: formErrors.regSupervision,
                    type: formErrors.regType,
                    tech: formErrors.regTech,
                    catheter: formErrors.catheter,
                  }}
                />
                <ProcedureQuestion
                  error={{
                    skill: formErrors.skillID,
                    category: formErrors.skillCategory,
                  }}
                  procedureQuestionStatus={setProcedureQuestionStatus}
                  selectedProcedure={setSelectedQuestionProcedure}
                  selectedCategory={setSelectedQuestionProcedureCategory}
                  data={sharedData?.procedure}
                />
                <Box>
                  <label className="nextui-c-hzQjrs nextui-input-block-label">
                    Did a significant event occur during the case?
                  </label>
                  <Textarea
                    bordered
                    rows={6}
                    width="400px"
                    onChange={(e) => setSignificant(e.target.value)}
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
              <Button as={Link} href="/anaesthetic">
                OK
              </Button>
            </Box>
          </Message>
        </Container>
      )}
    </>
  );
}
