import {
  Button,
  Card,
  Container,
  Table,
  Text,
  Loading as $Loading,
  Modal,
  Dropdown,
  Textarea,
  Spacer,
} from "@nextui-org/react";
import Box from "@/styles/Box";
import React, { useRef, useState } from "react";
import { axios } from "@/src/services";
import Message from "@/src/components/Message";
import Loading from "@/src/components/Loading";

const UploadIcon: any = () => (
  <Box css={{ fill: "$primary" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="100"
      height="100"
    >
      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />{" "}
    </svg>
  </Box>
);
export default function Assessments() {
  const Categories = [
      "Anaesthesia Clinical Evaluation Exercise [A-CEX]",
      "Case Based Discussion [CBD]",
      "Direct Observation of Procedural Skills [DOPS]",
      "Intensive Care Medicine Clinical Evaluation Exercise [I-CEX]",
      "Multi-source Feedback [MSF]",
      "Acute Care Assessment Tool [ACAT]",
    ],
    CategoryDropdown = useRef<HTMLUListElement>(null),
    ClinicalDropdown = useRef<HTMLUListElement>(null),
    [selectedCategory, setSelectedCategory] = React.useState<any>(null),
    [selectedClinical, setSelectedClinical] = React.useState<any>(null),
    [selectedDesc, setDesc] = useState<any>(null),
    [rotation, setRotationData] = useState<object | null>(null),
    [formErrors, setFormErrors] = React.useState<any>({}),
    selectedCategoryValue = React.useMemo(
      () =>
        CategoryDropdown.current?.querySelector(
          `[data-key="${selectedCategory}"]`
        )?.textContent || "Select category..",
      [selectedCategory]
    ),
    selectedClinicalValue = React.useMemo(
      () =>
        ClinicalDropdown.current?.querySelector(
          `[data-key="${selectedClinical}"]`
        )?.textContent || "Select Clinical Supervisor",
      [selectedClinical]
    ),
    setCategory = (a: any) => {
      setSelectedCategory(a.currentKey);
    },
    setClinical = (a: any) => {
      setSelectedClinical(a.currentKey);
    },
    [selectedFile, setSelectedFile] = useState<any>(null),
    uploadInput = useRef(null),
    [error, setError] = useState<any>(null),
    [message, setMessage] = useState<any>(null),
    [isDownloading, setDownloading] = useState(null),
    [isUploading, setUploading] = useState(false),
    [isLoaded, setLoaded] = useState(false),
    [assessmentData, setAssessmentData] = useState([]),
    [selectedId, setSelectedId] = useState(null),
    [isDeleting, setDeleting] = useState(false),
    [modal, setModal] = useState<{
      open: boolean;
      title?: string | null;
      content?: string | null;
      route?: string | null;
    }>({
      open: false,
      title: null,
      content: null,
      route: null,
    }),
    onConfirm = async () => {
      setDeleting(true);
      await axios.post(modal.route as any, { id: selectedId });
      await getAssessments();
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
      setDeleting(false);
    },
    onClose = () => {
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
    };

  if (!rotation) {
    axios.get("/rotations").then(({ data }) => {
      setRotationData(data);
    });
  }

  const handleChange = (event) => {
      const file = event.target.files[0];
      event.target.value = null;
      if (!file) return;
      if (!accepts.includes(file.type)) {
        setSelectedFile(null);
        return setError(
          "ERROR! Invalid file type. (Accepted files: WordDocument, PDF)"
        );
      }
      if (file.size > 1048576) {
        setSelectedFile(null);
        return setError("File exceeded maximum size. (Maximum size: 1MB)");
      }
      setSelectedId(null);
      setUploading(false);
      setMessage(null);
      setError(null);
      setSelectedFile(file);
    },
    upload = async () => {
      if (selectedFile) {
        setUploading(true);
        try {
          var data = new FormData();
          data.append("file", selectedFile);
          data.append("description", selectedDesc);
          data.append("clinical", selectedClinical);
          data.append("category", selectedCategory);
          setMessage(
            (
              await axios.post("/addAssessment", data, {
                headers: { "Content-Type": "multipart/form-data" },
              })
            ).data.message
          );
          if (assessmentData.length === 0) {
            setUploading(true);
          }
          await getAssessments();
          setUploading(false);
          setSelectedFile(null);
          setSelectedCategory(null);
          setSelectedClinical(null);
          setDesc(null);
        } catch (error) {
          setSelectedFile(null);
          setSelectedCategory(null);
          setSelectedClinical(null);
          setDesc(null);
          setError("Your form is incomplete, please re-try again.");
        }
        setUploading(false);
      }
    },
    accepts = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    formatBytes = (bytes) => {
      if (!+bytes) return "0 Bytes";

      const k = 1024,
        sizes = ["Bytes", "KB", "MB", "GB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    },
    getAssessments = async () => {
      return await axios.get("/viewAssessments").then(({ data }) => {
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
      <Container className="container" justify="center" css={{ my: "$10" }}>
        <Card
          css={{
            m: "auto",
            maxW: "450px",
            border: "1px solid $gray100",
            borderRadius: "$base",
            backgroundColor: "#fff",
            width: "100%",
            dflex: "center",
            flexDirection: "column",
            p: "$8",
          }}
        >
          <Box
            css={{
              cursor: "pointer",
            }}
            onClick={() => {
              (uploadInput as any).current.click();
            }}
          >
            <Box
              as="input"
              type="file"
              name="file"
              onChange={handleChange}
              css={{ display: "none" }}
              ref={uploadInput}
              accept={accepts.join(",")}
            />
            <UploadIcon />
          </Box>
          <Text
            size={20}
            weight="bold"
            css={{
              mt: "0",
              mb: selectedFile ? "$5" : (message || error) && 0,
              overflow: "hidden",
            }}
          >
            Upload New Assessment
          </Text>
          {selectedFile && (
            <>
              <Box
                css={{
                  backgroundColor: "$gray100",
                  border: "1px solid $gray200",
                  w: "100%",
                  dflex: "center",
                  flexDirection: "column",
                  padding: "$10 0",
                  borderRadius: "$base",
                  mb: "$5",
                }}
              >
                <Box
                  css={{
                    textOverflow: "ellipsis",
                    maxWidth: "300px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    mb: "$5",
                    fontSize: "$sm",
                  }}
                >
                  {selectedFile.name}
                </Box>
                <Box css={{ fontSize: "$sm" }}>
                  {formatBytes(selectedFile.size)}
                </Box>
              </Box>
              <Box css={{ display: "inline-block", mb: "$10" }}>
                <label className="nextui-c-hzQjrs nextui-input-block-label">
                  Clinical Supervisor
                </label>
                <Spacer y={0.4} />
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
              <Box css={{ display: "inline-block", mb: "$8" }}>
                <label className="nextui-c-hzQjrs nextui-input-block-label">
                  Category:
                </label>
                <Spacer y={0.4} />
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color={formErrors.category && "error"}
                    css={{
                      w: "400px",
                      justifyContent: "space-between",
                    }}
                  >
                    {selectedCategoryValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    css={{ minWidth: "400px", w: "400px" }}
                    aria-label="Single selection actions"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedCategory as any}
                    onSelectionChange={setCategory}
                    ref={CategoryDropdown}
                  >
                    {Categories.map((category, index) => {
                      return (
                        <Dropdown.Item key={category}>{category}</Dropdown.Item>
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
              <Box>
                <label className="nextui-c-hzQjrs nextui-input-block-label">
                  Description:
                </label>
                <Spacer y={0.4} />
                <Textarea
                  bordered
                  rows={4}
                  width="400px"
                  placeholder="Describe your file.."
                  onChange={(e) => setDesc(e.target.value)}
                ></Textarea>
              </Box>
              <Spacer y={0.8} />
              <Button
                disabled={isUploading}
                flat
                color="primary"
                auto
                shadow
                onClick={upload}
                css={{ px: isUploading ? "$13" : undefined }}
              >
                {isUploading ? (
                  <$Loading type="spinner" color="primary" size="md" />
                ) : (
                  "Upload"
                )}
              </Button>
            </>
          )}
          {error && (
            <Text size={"$xs"} color="error">
              {error}
            </Text>
          )}
          {message && (
            <Text size={"$sm"} color="success">
              {message}
            </Text>
          )}
        </Card>
        {isLoaded ? (
          assessmentData.length > 0 ? (
            <>
              <Text
                size={24}
                weight="bold"
                css={{
                  textAlign: "center",
                  my: "$13",
                }}
              >
                My Assessments List
              </Text>
              <Box
                css={{ mt: "$10", background: "#fff", borderRadius: "$base" }}
              >
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
                              color="success"
                              size={"xs"}
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
                              shadow
                              onClick={() => {
                                setMessage(null);
                                setSelectedId(a.id);
                                setModal({
                                  open: true,
                                  route: "deleteAssessment",
                                  content:
                                    "Are you sure you want to delete this assessment?",
                                });
                              }}
                              auto
                            >
                              Delete
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </Box>
            </>
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
              disabled={isDeleting}
              auto
              flat
              onPress={onConfirm}
              color="error"
            >
              {isDeleting ? (
                <$Loading type="spinner" color="primary" size="md" />
              ) : (
                "Delete"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
