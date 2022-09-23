import { Box, Button, Center, Heading, SkeletonText } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FirestoreRequests, Notice } from "../../components/constansts";
import styles from "../../styles/GenericPages/NoticePageBody.module.scss";

export default function NoticePageBody() {
  const [noticesList, setNoticesList] = useState<Notice[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);

  // componentDidMount
  useEffect(() => {
    // Get newest 12 notices from /notices/
    FirestoreRequests.getNotices(12, undefined).then((notices) => {
      setNoticesList(notices);
      // Firestore request was loaded
      setFirestoreStillLoading(false);
    });
  }, []);

  return (
    <div className={styles.NoticePageBody}>
      <Center>
        <Box bg="#fff" className={styles.TableWrapper}>
          <div className={styles.NoticeBoardWrapper}>
            <h3>Notice Board ({noticesList.length})</h3>
            {firestoreStillLoading ? <NoticesLoadingSkeleton /> : null}

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
                  onClick={async (e) => {
                    setLoadingMore(true);
                    const lastTimeCreated = noticesList.at(-1)?.timeCreated;

                    const notices = await FirestoreRequests.getNotices(
                      12,
                      lastTimeCreated
                    );
                    setNoticesList([...noticesList, ...notices]);
                    setLoadingMore(false);
                  }}
                >
                  LOAD MORE NOTICES
                </Button>
              </Center>
            </div>
          </div>
        </Box>
      </Center>
    </div>
  );
}

function NoticesLoadingSkeleton() {
  return (
    <div className={styles.NoticesWrapper}>
      {Array(6)
        .fill(0)
        .map((v) => (
          <Box marginBottom="2em">
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
          </Box>
        ))}
    </div>
  );
}
