import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FirestoreRequests, Notice } from "../../components/constansts";
import styles from "../../styles/GenericPages/NoticePageBody.module.scss";

export default function NoticePageBody() {
  const [noticesList, setNoticesList] = useState<Notice[]>([]);

  // componentDidMount
  useEffect(() => {
    // Get newest 7 notices from /notices/
    FirestoreRequests.getNotices(7, undefined).then((notices) =>
      setNoticesList(notices)
    );
  }, []);

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
