import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FirestoreRequests, Notice } from "../../components/constansts";
import styles from "../../styles/GenericPages/ViewNoticeBody.module.scss";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

export default function ViewNoticeBody() {
  const location = useLocation();
  const documentUid = location.pathname.split("/").at(-1);

  const [loadedFileURL, setLoadedFileURL] = useState<string | undefined>(
    undefined
  );
  const [thisNotice, setThisNotice] = useState<Notice | undefined>(undefined);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);

  // componentDidMount
  useEffect(() => {
    if (documentUid) {
      FirestoreRequests.getSingleNotice(documentUid).then((value) => {
        // Value will either be Notice or undefined
        setThisNotice(value);
        setFirestoreStillLoading(false);
        // Load the first file url in the PDFViewer if available
        if (value && value?.fileURLs.length > 0)
          setLoadedFileURL(value?.fileURLs[0]);
      });
    }
  }, [documentUid]);

  if (!thisNotice && !firestoreStillLoading) {
    return (
      <Center>
        <Box p={20} fontSize={20}>
          Unfortunately, we couldn't find what you were looking for.
        </Box>
      </Center>
    );
  }

  if (!thisNotice) {
    return (
      <Center>
        <Box p={20}>
          <Spinner size="lg"></Spinner>
        </Box>
      </Center>
    );
  }

  return (
    <div className={styles.ViewNoticeBody}>
      <i>Notice details:</i>
      <h3>{thisNotice?.title}</h3>
      <p>{new Date(thisNotice?.timeCreated).toLocaleDateString()}</p>

      <Flex className={styles.FilesRowWrapper}>
        {thisNotice.fileURLs.map((url, i) => (
          <Flex flexWrap="wrap" alignItems="center" className={styles.FileRow}>
            <BsFileEarmarkPdfFill />
            <Spacer w={1} />
            <Text>Attachment {i + 1}</Text>
            <Spacer w={3} />
            <Button
              onClick={(e) => {
                setLoadedFileURL(url);
              }}
            >
              Load In Viewer
            </Button>
            <Spacer w={3} />
            <form method="get" action={url}>
              <Button type="submit">Download</Button>
            </form>
          </Flex>
        ))}
      </Flex>

      {loadedFileURL ? (
        <iframe
          className={styles.PDFViewer}
          title="Notice PDF"
          src={loadedFileURL}
          frameBorder="0"
          scrolling="auto"
          height="100%"
          width="100%"
        ></iframe>
      ) : null}
    </div>
  );
}
