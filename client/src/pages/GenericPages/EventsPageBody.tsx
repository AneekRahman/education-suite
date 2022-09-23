import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  SkeletonText,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Event, FirestoreRequests } from "../../components/constansts";
import { EventsImageBox } from "../../components/EventsImageBox";
import styles from "../../styles/GenericPages/EventsPageBody.module.scss";

export default function EventsPageBody() {
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

  return (
    <div className={styles.EventsPageBody}>
      <h3>EVENTS ({eventsList.length}):</h3>
      {firestoreStillLoading ? <EventsLoadingSkeleton /> : null}
      <Grid
        className={styles.EventWrapper}
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        {eventsList.map((event: Event) => (
          <GridItem className={styles.EventsGridItem}>
            <EventsImageBox event={event} />
          </GridItem>
        ))}
      </Grid>

      <Spacer h="6" />
      <Center>
        <Button
          isLoading={loadingMore}
          colorScheme="red"
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
    </div>
  );
}

function EventsLoadingSkeleton() {
  return (
    <Grid
      className={styles.EventWrapper}
      templateColumns="repeat(3, 1fr)"
      gap={6}
    >
      {Array(6)
        .fill(0)
        .map((v) => (
          <Box padding="10em 2em 2em" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ))}
    </Grid>
  );
}
