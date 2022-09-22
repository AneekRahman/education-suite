import { Button, Center, Spacer } from "@chakra-ui/react";
import { Event, eventsList } from "../../components/constansts";
import { EventsImageBox } from "../../components/EventsImageBox";
import styles from "../../styles/GenericPages/EventsPageBody.module.scss";

export default function EventsPageBody() {
  return (
    <div className={styles.EventsPageBody}>
      <h3>EVENTS HERE</h3>
      {eventsList.map((event: Event) => (
        <div className={styles.EventWrapper}>
          <EventsImageBox event={event} />
        </div>
      ))}
      <Spacer h="6" />
      <Center>
        <Button colorScheme="red">SHOW ALL EVENTS</Button>
      </Center>
    </div>
  );
}
