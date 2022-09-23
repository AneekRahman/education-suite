import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FirestoreRequests, Notice } from "../../components/constansts";
import styles from "../../styles/GenericPages/NoticePageBody.module.scss";

export default function NoticePageBody() {
  const [noticesList, setNoticesList] = useState<Notice[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  // componentDidMount
  useEffect(() => {
    // Get newest 12 notices from /notices/
    FirestoreRequests.getNotices(12, undefined).then((notices) =>
      setNoticesList(notices)
    );
  }, []);

  return (
    <div className={styles.NoticePageBody}>
      <Center>
        <Box bg="#fff" className={styles.TableWrapper}>
          <NoticeBoard
            noticesList={noticesList}
            loadingMore={loadingMore}
            onMoreClicked={async (e) => {
              setLoadingMore(true);
              const lastTimeCreated = noticesList.at(-1)?.timeCreated;

              const notices = await FirestoreRequests.getNotices(
                12,
                lastTimeCreated
              );
              setNoticesList([...noticesList, ...notices]);
              setLoadingMore(false);
            }}
          />
        </Box>
      </Center>
    </div>
  );
}

function NoticeBoard({
  noticesList,
  loadingMore,
  onMoreClicked,
}: {
  noticesList: Notice[];
  loadingMore: boolean;
  onMoreClicked: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className={styles.NoticeBoardWrapper}>
      <h3>Notice Board ({noticesList.length})</h3>

      <div className={styles.NoticesWrapper}>
        {noticesList.map((notice: Notice) => (
          <div className={styles.Notice}>
            <Heading as="h4">{notice.title}</Heading>
            <p>{new Date(notice.timeCreated).toLocaleDateString()}</p>
          </div>
        ))}
        <Center>
          <Button
            isLoading={loadingMore}
            colorScheme="red"
            onClick={onMoreClicked}
          >
            LOAD MORE NOTICES
          </Button>
        </Center>
      </div>
    </div>
  );
}
