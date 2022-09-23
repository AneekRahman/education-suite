import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Event } from "./constansts";
import styles from "../styles/EventsImageBox.module.scss";
import { Link } from "react-router-dom";

export function EventsImageBox({ event }: { event: Event }) {
  return (
    <Link to={`/event/${event.id}`}>
      <div className={styles.Event}>
        <Image
          objectFit="cover"
          className={styles.Image}
          src={event.imageURLs[0]}
        />
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          className={styles.TextWrapper}
          height="100%"
          width="100%"
        >
          <Heading noOfLines={3} as="h4">
            {event.title}
          </Heading>
          <Text>{new Date(event.timeCreated).toLocaleDateString()}</Text>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          className={styles.ReadMoreBox}
        >
          <p>READ MORE</p>
        </Flex>
      </div>
    </Link>
  );
}
