import React from "react";
import { Table, Text } from "@nextui-org/react";
import Box from "@/styles/Box";

export default function Portfolio({ data }) {
  return (
    <>
      <Text
        size={20}
        weight="bold"
        css={{
          m: "$10 0 $5 $10",
        }}
      >
        Resident Data
      </Text>
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
          <Table.Column>Gender</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Birthdate</Table.Column>
          <Table.Column>Residency Year</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{data.Resident.NID}</Table.Cell>
            <Table.Cell>{data.Resident.name}</Table.Cell>
            <Table.Cell>
              {data.Resident.gender == "m" ? "Male" : "Female"}
            </Table.Cell>
            <Table.Cell>{data.Resident.email}</Table.Cell>
            <Table.Cell>{data.Resident.birthdate}</Table.Cell>
            <Table.Cell>{data.Resident.residencyYear}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Text
        size={20}
        weight="bold"
        css={{
          m: "$24 0 $5",
          textAlign: "center",
        }}
      >
        Logbook
      </Text>
      <Text
        size={20}
        weight="bold"
        css={{
          m: "$10 0 $5",
          ml: "$10",
        }}
      >
        Anesthetic Case
      </Text>
      {Object.keys(data.ACase).length > 0 ? (
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
              <Table.Column>Case ID</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Facility</Table.Column>
              <Table.Column>Gender</Table.Column>
              <Table.Column>Age</Table.Column>
              <Table.Column>ASA-PS Classification</Table.Column>
              <Table.Column>Primary Specialty</Table.Column>
              <Table.Column>Type of the Operation</Table.Column>
              <Table.Column>Mode of anesthesia</Table.Column>
            </Table.Header>
            <Table.Body>
              {(data as any).ACase.map((_data) => {
                return (
                  <Table.Row>
                    <Table.Cell>{_data.id}</Table.Cell>
                    <Table.Cell>{_data.date}</Table.Cell>
                    <Table.Cell>{_data.facility}</Table.Cell>
                    <Table.Cell>{_data.gender}</Table.Cell>
                    <Table.Cell>{_data.age}</Table.Cell>
                    <Table.Cell>{_data.class}</Table.Cell>
                    <Table.Cell>{_data.primary}</Table.Cell>
                    <Table.Cell>{_data.operation}</Table.Cell>
                    <Table.Cell>{_data.mode}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : (
        <Box css={{ maxW: "500px", margin: "auto", mt: "$5" }}>
          <Text
            size={20}
            css={{
              textAlign: "center",
              fontStyle: "italic",
            }}
            color="$gray800"
          >
            There are no recent data.
          </Text>
        </Box>
      )}
      <Text
        size={20}
        weight="bold"
        css={{
          m: "$10 0 $5",
          ml: "$10",
        }}
      >
        ICU Case
      </Text>
      {Object.keys(data.ICase).length > 0 ? (
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
              <Table.Column>Case ID</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Facility</Table.Column>
              <Table.Column>Gender</Table.Column>
              <Table.Column>Age</Table.Column>
              <Table.Column>Referring Specialty</Table.Column>
              <Table.Column>Primary Diagnosis</Table.Column>
            </Table.Header>
            <Table.Body>
              {(data as any).ICase.map((_data) => {
                return (
                  <Table.Row>
                    <Table.Cell>{_data.id}</Table.Cell>
                    <Table.Cell>{_data.date}</Table.Cell>
                    <Table.Cell>{_data.facility}</Table.Cell>
                    <Table.Cell>{_data.gender}</Table.Cell>
                    <Table.Cell>{_data.age}</Table.Cell>
                    <Table.Cell>{_data.specialty}</Table.Cell>
                    <Table.Cell>{_data.diagnosis}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : (
        <Box css={{ maxW: "500px", margin: "auto", mt: "$5" }}>
          <Text
            size={20}
            css={{
              textAlign: "center",
              fontStyle: "italic",
            }}
            color="$gray800"
          >
            There are no recent data.
          </Text>
        </Box>
      )}
      <Text
        size={20}
        weight="bold"
        css={{
          m: "$10 0 $5",
          ml: "$10",
        }}
      >
        Procedure
      </Text>
      {Object.keys(data.PCase).length > 0 ? (
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
              <Table.Column>Case ID</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Facility</Table.Column>
              <Table.Column>Gender</Table.Column>
              <Table.Column>Age</Table.Column>
              <Table.Column>Referring Specialty</Table.Column>
              <Table.Column>Procedure Type</Table.Column>
            </Table.Header>
            <Table.Body>
              {(data as any).PCase.map((_data) => {
                return (
                  <Table.Row>
                    <Table.Cell>{_data.id}</Table.Cell>
                    <Table.Cell>{_data.date}</Table.Cell>
                    <Table.Cell>{_data.facility}</Table.Cell>
                    <Table.Cell>{_data.gender}</Table.Cell>
                    <Table.Cell>{_data.age}</Table.Cell>
                    <Table.Cell>{_data.specialty}</Table.Cell>
                    <Table.Cell>{_data.pType}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : (
        <Box css={{ maxW: "500px", margin: "auto", mt: "$5" }}>
          <Text
            size={20}
            css={{
              textAlign: "center",
              fontStyle: "italic",
            }}
            color="$gray800"
          >
            There are no recent data.
          </Text>
        </Box>
      )}
      <Text
        size={20}
        weight="bold"
        css={{
          m: "$10 0 $5",
          ml: "$10",
        }}
      >
        Rotations
      </Text>
      {Object.keys(data.Rotations).length > 0 ? (
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
              <Table.Column>Stage</Table.Column>
              <Table.Column>Name of Rotation</Table.Column>
              <Table.Column>Start Date</Table.Column>
              <Table.Column>End Date</Table.Column>
            </Table.Header>
            <Table.Body>
              {(data as any).Rotations.map((_data) => {
                return (
                  <Table.Row>
                    <Table.Cell>{_data.stage}</Table.Cell>
                    <Table.Cell>{_data.name}</Table.Cell>
                    <Table.Cell>{_data.startDate}</Table.Cell>
                    <Table.Cell>{_data.endDate}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : (
        <Box css={{ maxW: "500px", margin: "auto", mt: "$5" }}>
          <Text
            size={20}
            css={{
              textAlign: "center",
              fontStyle: "italic",
            }}
            color="$gray800"
          >
            There are no recent data.
          </Text>
        </Box>
      )}
    </>
  );
}
