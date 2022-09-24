import { useEffect, useRef, useState } from "react";
import { FirestoreRequests, Notice } from "../../components/constansts";
import styles from "../../styles/AdminPanel/DashboardPage.module.scss";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  Button,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { CreateNewModal } from "./DashEventsPageBody";

export default function DashNoticesPageBody() {
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

  if (firestoreStillLoading) {
    return (
      <Center height="100vh" w="100%">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Box p={10} className={styles.DashNoticesPageBody}>
      <CreateNewModal forEvent={false} />
      <Box h={10} />
      <Heading color="red.400">Notices List ({noticesList.length})</Heading>
      <Box h={4} />
      {noticesList.map((notice: Notice, i) => (
        <Flex
          marginTop={2}
          borderRadius={10}
          border="1px solid rgba(0,0,0,0.1)"
        >
          <Center
            p="4"
            backgroundColor="#f07070"
            color="white"
            borderRadius={10}
            fontSize={20}
          >
            {i + 1}
          </Center>
          <Box className={styles.NoticeBox} p={2} w="100%">
            <Text>{notice.title}</Text>
            <Text>{new Date(notice.timeCreated).toLocaleDateString()}</Text>
            <Box h={2} />
            <Flex>
              <Link href={`/notice/${notice.id}`} isExternal flex={1}>
                <Button w="100%">VIEW NOTICE</Button>
              </Link>
              <Box w={2} />
              <DeleteAlertButtonDialogue notice={notice} />
            </Flex>
          </Box>
        </Flex>
      ))}
      <Box h={4} />
      <Center>
        <Button
          isLoading={loadingMore}
          width="100%"
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
    </Box>
  );
}

function DeleteAlertButtonDialogue({ notice }: { notice: Notice }) {
  const [deleting, setDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        DELETE NOTICE
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              DELETE NOTICE
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text as="b">{notice.title}</Text>
              <Box h={2} />
              <Text>
                Are you sure you want to delete this? You can't undo this
                action.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={async (e) => {
                  if (deleting) return;
                  try {
                    setDeleting(true);
                    await deleteDoc(doc(getFirestore(), "notices", notice.id));
                    setDeleting(false);
                    onClose();
                    toast({
                      title: "Deleted!",
                      description: "Deleted a notice.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  } catch (error) {
                    toast({
                      title: "Error!",
                      description: error?.toString(),
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                }}
                ml={3}
              >
                Delete Notice
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
