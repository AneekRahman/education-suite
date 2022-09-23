import { Button, Center, Grid, GridItem, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Event, FirestoreRequests } from "../../components/constansts";
import { EventsImageBox } from "../../components/EventsImageBox";
import styles from "../../styles/GenericPages/EventsPageBody.module.scss";

export default function EventsPageBody() {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  // componentDidMount
  useEffect(() => {
    // Get newest 5 events from /events/
    FirestoreRequests.getEvents(5, undefined).then((events) =>
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
        <Button colorScheme="red">LOAD MORE EVENTS</Button>
      </Center>
    </div>
  );
}
