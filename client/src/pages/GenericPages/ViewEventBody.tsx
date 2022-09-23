import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FirestoreRequests, Event } from "../../components/constansts";
import styles from "../../styles/GenericPages/ViewEventBody.module.scss";

export default function ViewEventBody() {
  const [thisEvent, setShisEvent] = useState<Event | undefined>(undefined);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  const location = useLocation();
  const documentUid = location.pathname.split("/").at(-1);

  // componentDidMount
  useEffect(() => {
    if (documentUid) {
      FirestoreRequests.getSingleEvent(documentUid).then((value) => {
        // Value will either be Event or undefined
        setShisEvent(value);
        setFirestoreStillLoading(false);
      });
    }
  }, [documentUid]);

  if (!thisEvent && !firestoreStillLoading) {
    return (
      <Center>
        <Box p={20} fontSize={20}>
          Unfortunately, we couldn't find what you were looking for.
        </Box>
      </Center>
    );
  }

  if (!thisEvent) {
    return (
      <Center>
        <Box p={20}>
          <Spinner size="lg"></Spinner>
        </Box>
      </Center>
    );
  }

  return (
    <div className={styles.ViewEventBody}>
      <h3>{thisEvent?.title}</h3>
      <p>{new Date(thisEvent?.timeCreated).toLocaleDateString()}</p>
    </div>
  );
}
