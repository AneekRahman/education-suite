import React from "react";
import Header from "../components/Header";
import styles from "../styles/HomePage.module.scss";
import {
  Flex,
  Heading,
  Text,
  Button,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";

interface Event {
  date: string; // Jan 8
  title: string;
  link: string;
  photoURL: string;
}

interface Notice {
  date: string; // March 26, 2018
  title: string;
  link: string;
}

// 10 Notices will be fetched from Firestore
const noticesList: Notice[] = [
  {
    date: "March 26, 2018",
    title:
      "সেই মাঠমার্চ যেটি মহান স্বাধীনতা ও জাতীয় দিবস-2018 খ্রিঃ আটঘরিয়া উপজেলা স্টেডিয়াম মাঠে   কয়রাবাড়ীবহুমুখী উচ্চ বিদ্যালয় প্রথম স্থান অধিকার করে।",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "পাবনার আটঘরিয়া উপজেলার ঐতিহ্যবাহী কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ে বুধবার (৩ আগষ্ট -২০২২ খ্রি.) পাঠদান কার্যক্রম পরিদর্শন করেন উপজেলা নির্বাহী কর্মকর্তা মাকসুদা আক্তার মাসু। ",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ের সহকারী শিক্ষক (গণিত) মোঃ নাসির উদ্দিনের পিতা জহুরুল ইসলাম মুন্সী রবিবার দিনগত মধ্যরাতে ইন্তেকাল করিয়াছেন",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ের ম্যানেজিং কমিটি, সকল  শিক্ষক, অভিভাবক, শিক্ষার্থীদের ঈদুল আযহার শুভেচ্ছা। ঈদ মোবারক",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "মাননীয় এমপি মহোদয় বীর মুক্তিযোদ্ধা  জনাব আলহাজ্ব মোঃ নুরুজ্জামান বিশ্বাস, সংসদ সদস্য পাবনা-৪ (আটঘরিয়া-ঈশ্বরদী)।",
    link: "",
  },
];

// 5 events will be fetched from Firestore
const eventsList: Event[] = [
  {
    date: "JAN 8",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "",
  },
  {
    date: "MAR 30",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "",
  },
  {
    date: "AUG 12",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "",
  },
  {
    date: "MAR 30",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "",
  },
  {
    date: "AUG 12",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "",
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
      <MessagesRow />
      <NoticeBox />
      <EventsImageGrid />

      <div style={{ height: "30em" }}></div>
    </div>
  );
}

function EventsImageGrid() {
  return (
    <div className={styles.EventsImageGrid}>
      <Grid
        h="100vh"
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap={6}
      >
        {eventsList[0] ? (
          <GridItem colSpan={3} rowSpan={4} bg="rgba(0,0,0,0.1)">
            <EventsImageBox event={eventsList[0]} />
          </GridItem>
        ) : null}
        {eventsList[1] ? (
          <GridItem colSpan={5} rowSpan={5} bg="rgba(0,0,0,0.1)">
            <EventsImageBox event={eventsList[1]} />
          </GridItem>
        ) : null}
        {eventsList[2] ? (
          <GridItem colSpan={3} rowSpan={4} bg="rgba(0,0,0,0.1)">
            <EventsImageBox event={eventsList[2]} />
          </GridItem>
        ) : null}
        {eventsList[3] ? (
          <GridItem colSpan={3} rowSpan={3} bg="rgba(0,0,0,0.1)">
            <EventsImageBox event={eventsList[3]} />
          </GridItem>
        ) : null}
        {eventsList[4] ? (
          <GridItem colSpan={2} rowSpan={3} bg="rgba(0,0,0,0.1)">
            <EventsImageBox event={eventsList[4]} />
          </GridItem>
        ) : null}
      </Grid>
    </div>
  );
}

function EventsImageBox(props: { event: Event }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${props.event.photoURL})`,
      }}
    ></div>
  );
}

function NoticeBox() {
  return (
    <Flex justifyContent="center" className={styles.NoticeBoxWrapper}>
      <div className={styles.NoticeFakeBox}></div>
      <div className={styles.NoticeBoxInnerWrapper}>
        <h3>NOTICE BOARD</h3>

        <div className={styles.NoticesWrapper}>
          {noticesList.map((notice: Notice) => (
            <div className={styles.Notice}>
              <Heading as="h4">{notice.title}</Heading>
              <p>{notice.date}</p>
            </div>
          ))}
          <Center>
            <Button colorScheme="red">SHOW MORE</Button>
          </Center>
        </div>
      </div>
    </Flex>
  );
}

function MessagesRow() {
  return (
    <Center>
      <Flex className={styles.MessagesRowWrapper} justifyContent="space-evenly">
        <h3>MESSAGES</h3>

        <Flex className={styles.MessageColumn} alignItems="center">
          <img src="/assets/mc2.png" alt="" />
          <div>
            <h4>MD. ZILLUR RAHMAN</h4>
            <p>ASSISTANT PRINCIPAL</p>
          </div>
        </Flex>
        <Flex className={styles.MessageColumn} alignItems="center">
          <img src="/assets/mc1.png" alt="" />
          <div>
            <h4>MD. TOFAZZOL HOSSAIN</h4>
            <p>ASSISTANT TEACHER</p>
          </div>
        </Flex>
      </Flex>
    </Center>
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
