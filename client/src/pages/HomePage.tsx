import React from "react";
import Header from "../components/Header";
import styles from "../styles/HomePage.module.scss";
import { Flex, Heading, Text } from "@chakra-ui/react";

interface Event {
  date: string;
  title: string;
  link: string;
}

const eventsList: Event[] = [
  {
    date: "JAN 8",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
  },
  {
    date: "JAN 8",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
  },
  {
    date: "JAN 8",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
  },
];

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      <div className={styles.HeroWrapper}>
        <div className={styles.BgDarkGradient}></div>
        <Header />
        <div className={styles.HeroMainTextWrapper}>
          <h2>
            Excellence in
            <br />
            Knowledge
          </h2>
        </div>
        <EventsBox />
      </div>
    </div>
  );
}

function EventsBox() {
  return (
    <div className={styles.HeroEventsWrapper}>
      <h3>03/10 EVENTS</h3>

      <Flex>
        {eventsList.map((event: Event) => (
          <Flex className={styles.EventColumn}>
            <Heading as="h4">
              {event.date.split(" ")[0]}
              <br />
              {event.date.split(" ")[1]}
            </Heading>
            <Text noOfLines={5}>{event.title}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
