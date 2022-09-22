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
  Spacer,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Footer from "../components/Footer";

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
];

// 5 events will be fetched from Firestore
const eventsList: Event[] = [
  {
    date: "JAN 8",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "https://i.ytimg.com/vi/9LsQbUav6mc/maxresdefault.jpg",
  },
  {
    date: "MAR 30",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL:
      "https://images.hindustantimes.com/img/2021/09/12/1600x900/BANGLADESH-HEALTH-VIRUS-EDUCATION-2_1631428046899_1631428652121.jpg",
  },
  {
    date: "AUG 12",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL:
      "https://www.wsws.org/asset/096bbd60-25da-4841-a324-7aaad9e57093?rendition=image1280",
  },
  {
    date: "MAR 30",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL:
      "https://www.gage.odi.org/wp-content/uploads/2019/12/Students-at-school-in-Chittagong-Bangladesh-c-NBertrams_NB_1418.jpg",
  },
  {
    date: "AUG 12",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "https://ddnews.gov.in/sites/default/files/Bangladesh_86.jpg",
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
      <div className={styles.WigglyBg1Wrapper}>
        <img src="/assets/wiggly-bg1.svg" className={styles.WiggleBg1} alt="" />
        <NoticeBox />
      </div>
      <div className={styles.WigglyBg2Wrapper}>
        <img src="/assets/wiggly-bg2.svg" className={styles.WiggleBg2} alt="" />
        <EventsImageGrid />
        <MobileEventsList />
      </div>
      <LocationAboutBox />
      <Footer />
    </div>
  );
}

function LocationAboutBox() {
  return (
    <Center marginTop="4em">
      <div className={styles.LocationAboutBox}>
        <Flex className={styles.LocationAboutBoxWrapper}>
          <div className={styles.TextsWrapper}>
            <Heading as="h3">FIND OUR LOCATION</Heading>
            <Flex height="100%" alignItems="center">
              <Text>ATGHARIA, PABNA</Text>
            </Flex>
          </div>

          <div
            className="GoogleMapWrapper"
            style={{ width: "100%", height: "500px" }}
          >
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d933172.7474488!2d89.06958384789172!3d23.98850011048644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe831cd164c30f%3A0x24068820884fc22!2z4KaV4Kav4Ka84Kaw4Ka-4Kas4Ka-4Kah4Ka84Ka_IOCmrOCmueCngeCmruCngeCmluCngCDgpongpprgp43gppog4Kas4Ka_4Kam4KeN4Kav4Ka-4Kay4Kav4Ka8!5e0!3m2!1sen!2sbd!4v1663787881846!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen={false}
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
        </Flex>
        <TableContainer className={styles.Table}>
          <Table variant="simple" colorScheme="blackAlpha">
            <Tbody>
              <Tr>
                <Td>EIIN NO</Td>
                <Td>NU CODE</Td>
                <Td>REG NO</Td>
                <Td>DSHE</Td>
                <Td>UPO NO HSC</Td>
                <Td>UPO NO DEGREE</Td>
              </Tr>
              <Tr>
                <Td>125260</Td>
                <Td>10000</Td>
                <Td>10000 (Rajshahi)</Td>
                <Td>10000</Td>
                <Td>10000</Td>
                <Td>10000</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Center>
  );
}

function MobileEventsList() {
  return (
    <div className={styles.MobileEventsList}>
      <h3>EVENTS BOARD</h3>
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

function EventsImageGrid() {
  return (
    <div className={styles.EventsImageGrid}>
      <h3>EVENTS BOARD</h3>
      <Grid
        h="90vh"
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
      <Spacer h="10" />
      <Center>
        <Button colorScheme="red">SHOW ALL EVENTS</Button>
      </Center>
    </div>
  );
}

function EventsImageBox(props: { event: Event }) {
  return (
    <div
      className={styles.Event}
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(${props.event.photoURL})`,
      }}
    >
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
            <Button colorScheme="red">SHOW ALL NOTICES</Button>
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
