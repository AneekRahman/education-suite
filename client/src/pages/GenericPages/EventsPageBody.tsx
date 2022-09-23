import { Button, Center, Grid, GridItem, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Event, FirestoreRequests } from "../../components/constansts";
import { EventsImageBox } from "../../components/EventsImageBox";
import styles from "../../styles/GenericPages/EventsPageBody.module.scss";

export default function EventsPageBody() {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  // componentDidMount
  useEffect(() => {
    // Get newest 12 events from /events/
    FirestoreRequests.getEvents(12, undefined).then((events) =>
      setEventsList(events)
    );
  }, []);

  return (
    <div className={styles.EventsPageBody}>
      <h3>EVENTS HERE</h3>
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
