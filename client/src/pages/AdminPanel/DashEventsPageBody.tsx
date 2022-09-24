import React, { useEffect, useState } from "react";
import { FirestoreRequests, Event } from "../../components/constansts";
import styles from "../../styles/AdminPanel/DashboardPage.module.scss";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";

export default function DashEventsPageBody() {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  // componentDidMount
  useEffect(() => {
    // Get newest 12 events from /events/
    FirestoreRequests.getEvents(12, undefined).then((events) => {
      setEventsList(events);
      // Firestore request was loaded
      setFirestoreStillLoading(false);
    });
  }, []);

  if (firestoreStillLoading) {
    return (
      <Center height="100vh" w="100%">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Box p={10} className={styles.DashEventsPageBody}>
      <Heading color="red.400">Events List ({eventsList.length})</Heading>
      <Box h={4} />
      {eventsList.map((event: Event, i) => (
        <Flex
          marginTop={2}
          borderRadius={10}
          border="1px solid rgba(0,0,0,0.1)"
        >
          <Center
            p="4"
            backgroundColor="#f07070"
            color="white"
            borderRadius={10}
            fontSize={20}
          >
            {i + 1}
          </Center>
          <Box className={styles.EventBox} p={2}>
            <Text>{event.title}</Text>
            <Text>{new Date(event.timeCreated).toLocaleDateString()}</Text>
            <Box h={2} />
            <Flex>
              <Link href={`/event/${event.id}`} isExternal>
                <Button>VIEW EVENT</Button>
              </Link>
              <Box w={2} />
              <Button color="red">DELETE EVENT</Button>
            </Flex>
          </Box>
        </Flex>
      ))}
      <Box h={4} />
      <Center>
        <Button
          isLoading={loadingMore}
          width="100%"
          onClick={async (e) => {
            setLoadingMore(true);
            const lastTimeCreated = eventsList.at(-1)?.timeCreated;
            const events = await FirestoreRequests.getEvents(
              12,
              lastTimeCreated
            );
            setEventsList([...eventsList, ...events]);
            setLoadingMore(false);
          }}
        >
          LOAD MORE EVENTS
        </Button>
      </Center>
    </Box>
  );
}
