import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { Notice, noticesList } from "../../components/constansts";
import styles from "../../styles/GenericPages/NoticePageBody.module.scss";

export default function NoticePageBody() {
  return (
    <div className={styles.NoticePageBody}>
      <Center>
        <Box bg="#fff" className={styles.TableWrapper}>
          <NoticeBoard />
        </Box>
      </Center>
    </div>
  );
}

function NoticeBoard() {
  return (
    <div className={styles.NoticeBoardWrapper}>
      <h3>Notice Board</h3>

      <div className={styles.NoticesWrapper}>
        {noticesList.map((notice: Notice) => (
          <div className={styles.Notice}>
            <Heading as="h4">{notice.title}</Heading>
            <p>{notice.date}</p>
          </div>
        ))}
        <Center>
          <Button colorScheme="red">LOAD MORE</Button>
        </Center>
      </div>
    </div>
  );
}
