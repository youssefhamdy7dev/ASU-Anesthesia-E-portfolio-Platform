import {
  Button,
  Card,
  Container,
  Table,
  Text,
  Loading as $Loading,
  Modal,
} from "@nextui-org/react";
import Box from "@/styles/Box";
import { useRef, useState } from "react";
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
export default function Document() {
  const [selectedFile, setSelectedFile] = useState<any>(null),
    uploadInput = useRef(null),
    [error, setError] = useState<any>(null),
    [message, setMessage] = useState<any>(null),
    [isDownloading, setDownloading] = useState(null),
    [isUploading, setUploading] = useState(false),
    [isLoaded, setLoaded] = useState(false),
    [documentData, setDocumentData] = useState([]),
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
      await getDocs();
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
    },
    handleChange = (event) => {
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
          setMessage(
            (
              await axios.post("/addDoc", data, {
                headers: { "Content-Type": "multipart/form-data" },
              })
            ).data.message
          );
          if (documentData.length === 0) {
            setUploading(true);
          }
          await getDocs();
          setUploading(false);
          setSelectedFile(null);
          setUploading(false);
        } catch (error) {
          setSelectedFile(null);
          setError((error as any).response.data.message);
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
    getDocs = async () => {
      return await axios.get("/viewDocs").then(({ data }) => {
        setLoaded(true);
        setDocumentData(data);
      });
    };
  if (!isLoaded) {
    if (documentData.length === 0) {
      getDocs();
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
            Upload New Document
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
              <Button
                disabled={isUploading}
                flat
                color="primary"
                shadow
                auto
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
          documentData.length > 0 ? (
            <>
              <Text
                size={24}
                weight="bold"
                css={{
                  textAlign: "center",
                  my: "$13",
                }}
              >
                My Documents List
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
                    <Table.Column>ID</Table.Column>
                    <Table.Column>File Name</Table.Column>
                    <Table.Column align="center">Action</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {documentData.map((d) => {
                      const doc: any = d;
                      return (
                        <Table.Row key={doc.id}>
                          <Table.Cell>{doc.id}</Table.Cell>
                          <Table.Cell>{doc.document}</Table.Cell>
                          <Table.Cell css={{ dflex: "center" }}>
                            <Button
                              disabled={isDownloading === doc.id || false}
                              color="success"
                              size={"xs"}
                              auto
                              shadow
                              css={{ mr: "$5" }}
                              onClick={() => {
                                setDownloading(doc.id);
                                axios
                                  .get("/downloadDoc", {
                                    params: { id: doc.id },
                                    responseType: "blob",
                                  })
                                  .then(({ data }) => {
                                    const url = URL.createObjectURL(data),
                                      link = document.createElement("a");
                                    link.href = url;
                                    link.download = doc.document;
                                    link.click();
                                  })
                                  .catch((e) => {})
                                  .finally(() => {
                                    setDownloading(null);
                                  });
                              }}
                            >
                              {isDownloading === doc.id ? (
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
                                setSelectedId(doc.id);
                                setModal({
                                  open: true,
                                  route: "deleteDoc",
                                  content:
                                    "Are you sure you want to delete this document?",
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
              <Message message="There are no recent documents." icon="info" />
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
