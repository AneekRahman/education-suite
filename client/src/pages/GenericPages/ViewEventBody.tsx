import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FirestoreRequests, Event } from "../../components/constansts";
import styles from "../../styles/GenericPages/ViewEventBody.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import { BiShare } from "react-icons/bi";

export default function ViewEventBody() {
  const [thisEvent, setShisEvent] = useState<Event | undefined>(undefined);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  const location = useLocation();
  const documentUid = location.pathname.split("/").at(-1);

  // componentDidMount
  useEffect(() => {
    if (documentUid) {
      FirestoreRequests.getSingleEvent(documentUid).then((value) => {
        // Value will either be Event or undefined
        setShisEvent(value);
        setFirestoreStillLoading(false);
      });
    }
  }, [documentUid]);

  if (!thisEvent && !firestoreStillLoading) {
    return (
      <Center>
        <Box p={20} fontSize={20}>
          Unfortunately, we couldn't find what you were looking for.
        </Box>
      </Center>
    );
  }

  if (!thisEvent) {
    return (
      <Center>
        <Box p={20}>
          <Spinner size="lg"></Spinner>
        </Box>
      </Center>
    );
  }

  return (
    <div className={styles.ViewEventBody}>
      <i>Event details:</i>
      <h3>{thisEvent?.title}</h3>
      <p>{new Date(thisEvent?.timeCreated).toLocaleDateString()}</p>
      <WebShareModal title={thisEvent.title} />
      <CarouselGallery fileURLs={thisEvent.fileURLs} />
    </div>
  );
}

function CarouselGallery({ fileURLs }: { fileURLs: string[] }) {
  return (
    <div className={styles.CarouselWrapper}>
      <Carousel
        showArrows={true}
        renderArrowPrev={(e) => {
          return (
            <FaAngleLeft
              className={styles.LeftArrow}
              color="white"
              onClick={e}
            />
          );
        }}
        renderArrowNext={(e) => {
          return (
            <FaAngleRight
              className={styles.RightArrow}
              color="white"
              onClick={e}
            />
          );
        }}
      >
        {fileURLs.map((url) => (
          <div className={styles.CarouselItem}>
            <img src={url} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export function WebShareModal({ title }: { title: string }) {
  return (
    <RWebShare
      data={{
        url: window.location.href,
        title,
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <Button colorScheme="blackAlpha" marginTop={2} leftIcon={<BiShare />}>
        Share on social media
      </Button>
    </RWebShare>
  );
}
