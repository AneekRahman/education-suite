import { Box, Button, Center, Heading } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useState } from "react";
import { Notice } from "../../components/constansts";
import styles from "../../styles/GenericPages/NoticePageBody.module.scss";

export default function NoticePageBody() {
  const [noticesList, setNoticesList] = useState<Notice[]>([]);

  // Get newest 10 events from /notices/
  getDocs(
    query(
      collection(getFirestore(), "notices"),
      orderBy("timeCreated", "desc"),
      limit(5)
    )
  ).then((snapshots) => {
    if (!snapshots.empty) {
      const notices: Notice[] = snapshots.docs.map((snapshot) => {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          timeCreated: data.timeCreated,
          title: data.title,
          fileURLs: data.fileURLs,
        };
      });
      setNoticesList(notices);
    }
  });

  return (
    <div className={styles.NoticePageBody}>
      <Center>
        <Box bg="#fff" className={styles.TableWrapper}>
          <NoticeBoard noticesList={noticesList} />
        </Box>
      </Center>
    </div>
  );
}

function NoticeBoard({ noticesList }: { noticesList: Notice[] }) {
  return (
    <div className={styles.NoticeBoardWrapper}>
      <h3>Notice Board</h3>

      <div className={styles.NoticesWrapper}>
        {noticesList.map((notice: Notice) => (
          <div className={styles.Notice}>
            <Heading as="h4">{notice.title}</Heading>
            <p>{new Date(notice.timeCreated).toLocaleDateString()}</p>
          </div>
        ))}
        <Center>
          <Button colorScheme="red">LOAD MORE NOTICES</Button>
        </Center>
      </div>
    </div>
  );
}
