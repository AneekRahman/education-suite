import { Box, Center } from "@chakra-ui/react";
import styles from "../../styles/GenericPages/EventsPageBody.module.scss";

export default function EventsPageBody() {
  return (
    <div className={styles.EventsPageBody}>
      <Center>
        <Box bg="#fff" className={styles.EventsWrapper}>
          <h3>EVENTS HERE</h3>
        </Box>
      </Center>
    </div>
  );
}
