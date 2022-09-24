import { useEffect, useRef, useState } from "react";
import { FirestoreRequests, Event } from "../../components/constansts";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";
import {
  updateFirestoreField,
  uploadFileToFirebase,
} from "./DashboardPageBody";
import { getDownloadURL, UploadResult } from "firebase/storage";
import { collection, doc, getFirestore, deleteDoc } from "firebase/firestore";

export default function DashEventsPageBody() {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  // componentDidMount
  useEffect(() => {
    // Get newest 12 events from /events/
    FirestoreRequests.getEvents(12, undefined).then((events) => {
      setEventsList(events);
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
    <Box p={10} className={styles.DashEventsPageBody}>
      <CreateNewModal forEvent={true} />
      <Box h={10} />
      <Heading color="red.400">Events List ({eventsList.length})</Heading>
      <Box h={4} />
      {eventsList.map((event: Event, i) => (
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
          <Box className={styles.EventBox} p={2} w="100%">
            <Text>{event.title}</Text>
            <Text>{new Date(event.timeCreated).toLocaleDateString()}</Text>
            <Box h={2} />
            <Flex>
              <Link href={`/event/${event.id}`} isExternal flex={1}>
                <Button w="100%">VIEW EVENT</Button>
              </Link>
              <Box w={2} />
              <DeleteAlertButtonDialogue event={event} />
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
            const lastTimeCreated = eventsList.at(-1)?.timeCreated;
            const events = await FirestoreRequests.getEvents(
              12,
              lastTimeCreated
            );
            setEventsList([...eventsList, ...events]);
            setLoadingMore(false);
          }}
        >
          LOAD MORE EVENTS
        </Button>
      </Center>
    </Box>
  );
}

function DeleteAlertButtonDialogue({ event }: { event: Event }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        DELETE EVENT
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              DELETE EVENT
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text as="b">{event.title}</Text>
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
                  try {
                    await deleteDoc(doc(getFirestore(), "events", event.id));
                    onClose();
                    toast({
                      title: "Deleted!",
                      description: "Deleted an event.",
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
                Delete Event
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export function CreateNewModal({ forEvent }: { forEvent: boolean }) {
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button
        w="100%"
        size="lg"
        colorScheme="green"
        leftIcon={<IoIosAddCircle />}
        onClick={onOpen}
      >
        ADD A NEW {forEvent ? "EVENT" : "NOTICE"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Create a new {forEvent ? "event" : "notice"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title*</FormLabel>
              <Input
                placeholder={`Title of the ${forEvent ? "event" : "notice"}`}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Text>* Title is required</Text>
            </FormControl>
            <Box h={4} />
            <AddFilesList
              forEvent={forEvent}
              newFiles={newFiles}
              setNewFiles={setNewFiles}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={creating}
              colorScheme="blue"
              mr={3}
              onClick={async (e) => {
                if (creating) return;
                if (newTitle === "" || (forEvent && newFiles.length === 0)) {
                  // Restrict newFiles minimum 1 file when its [forEvent == true]
                  toast({
                    title: "Error!",
                    description: "Required criterias have not been fulfilled",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  return;
                }

                try {
                  // Set loading start
                  setCreating(true);

                  // Create a unique uid
                  const newUid = doc(
                    collection(getFirestore(), forEvent ? "events" : "notices")
                  ).id;

                  // Upload the files to storage
                  const newFilesURLs = await uploadMultipleFiles(
                    newFiles,
                    newUid,
                    forEvent
                  );

                  // Create the Firestore document
                  await updateFirestoreField(
                    forEvent ? "events" : "notices",
                    newUid,
                    {
                      fileURLs: newFilesURLs,
                      timeCreated: new Date().getTime(),
                      title: newTitle,
                    }
                  );

                  // Show the success message
                  toast({
                    title: "Success!",
                    description:
                      "Created a new " + (forEvent ? "event." : "notice."),
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  // Close the modal
                  onClose();
                  setNewFiles([]);
                  setNewTitle("");
                } catch (error) {
                  toast({
                    title: "Error!",
                    description: error?.toString(),
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                }

                setCreating(false);
              }}
            >
              Create New {forEvent ? "Event" : "Notice"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function AddFilesList({
  forEvent,
  newFiles,
  setNewFiles,
}: {
  forEvent: boolean;
  newFiles: File[];
  setNewFiles: Function;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <Button
        leftIcon={<IoIosAddCircle />}
        onClick={(e) => {
          inputRef.current?.click();
        }}
      >
        ADD {forEvent ? "IMAGE" : "PDF FILE"}
      </Button>
      <Box h={2} />
      {/* When it comes to notices, you don't have this restriction */}
      {newFiles.length === 0 && forEvent ? (
        <Box>* At least 1 {forEvent ? "image" : "PDF file"} is required</Box>
      ) : null}
      <Text>Max file size: 1500 KB</Text>
      {newFiles.map((file) => (
        <Flex
          p={2}
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius={10}
          marginBottom={2}
          justifyContent="space-between"
        >
          <Text>{file.name}</Text>
          <IconButton
            colorScheme="red"
            size="xs"
            icon={<IoMdClose />}
            aria-label=""
            onClick={(e) => {
              // Loop through to match this file
              const filteredNewFiles = newFiles.filter(
                (thisFile) => thisFile.name !== file.name
              );
              setNewFiles(filteredNewFiles);
            }}
          />
        </Flex>
      ))}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept={forEvent ? "image/*" : "application/pdf"}
        onChange={async (event) => {
          if (
            event.target.files &&
            event.target.files[0].size <= 1.5 * 1024 * 1024
          ) {
            setNewFiles([...newFiles, event.target.files[0]]);
          }
        }}
      />
    </Box>
  );
}

const uploadMultipleFiles = async (
  files: File[],
  newUid: string,
  forEvent: boolean
) => {
  // First upload all the files
  const fileUploadPromises: Promise<UploadResult>[] = [];
  files.forEach((file) =>
    fileUploadPromises.push(
      uploadFileToFirebase(
        forEvent ? `events/${newUid}` : `notices/${newUid}`,
        null, // Create a new random uid for this file in Storage
        file
      )
    )
  );
  const results = await Promise.all(fileUploadPromises);

  // Get all the downloadURLs for all the files
  const downloadURLPromises: Promise<string>[] = [];
  results.forEach((result) => {
    downloadURLPromises.push(getDownloadURL(result.ref));
  });

  return Promise.all(downloadURLPromises);
};
