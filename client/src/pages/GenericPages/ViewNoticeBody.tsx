import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FirestoreRequests, Notice } from "../../components/constansts";
import styles from "../../styles/GenericPages/ViewNoticeBody.module.scss";

export default function ViewNoticeBody() {
  const [thisNotice, setThisNotice] = useState<Notice | undefined>(undefined);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  const location = useLocation();
  const documentUid = location.pathname.split("/").at(-1);

  // componentDidMount
  useEffect(() => {
    if (documentUid) {
      FirestoreRequests.getSingleNotice(documentUid).then((value) => {
        // Value will either be Notice or undefined
        setThisNotice(value);
        setFirestoreStillLoading(false);
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

  return <div>ViewNoticeBody</div>;
}
