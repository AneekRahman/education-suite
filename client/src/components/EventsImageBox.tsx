import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Event } from "./constansts";
import styles from "../styles/EventsImageBox.module.scss";

export function EventsImageBox(props: { event: Event }) {
  return (
    <div className={styles.Event}>
      <Image
        objectFit="cover"
        className={styles.Image}
        src={props.event.photoURL}
      />
      <Flex
        flexDirection="column"
        justifyContent="flex-end"
        className={styles.TextWrapper}
        height="100%"
        width="100%"
      >
        <Heading noOfLines={3} as="h4">
          {props.event.title}
        </Heading>
        <Text>{props.event.date}</Text>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        className={styles.ReadMoreBox}
      >
        <p>READ MORE</p>
      </Flex>
    </div>
  );
}
