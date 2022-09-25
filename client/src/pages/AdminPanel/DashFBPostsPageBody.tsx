import { useEffect, useRef, useState } from "react";
import { FacebookPost, FirestoreRequests } from "../../components/constansts";
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
} from "@chakra-ui/react";
import { doc, getFirestore, deleteDoc, collection } from "firebase/firestore";
import { FacebookEmbed } from "react-social-media-embed";
import { IoIosAddCircle } from "react-icons/io";
import { updateFirestoreField } from "./DashboardPageBody";

export default function DashFBPostsPageBody() {
  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  // componentDidMount
  useEffect(() => {
    // Get newest 12 posts from /facebookPosts/
    FirestoreRequests.getFacebookPosts(12, undefined).then((posts) => {
      setFacebookPosts(posts);
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
    <Box p={10} className={styles.DashFBPostsPageBody} w="100%">
      <AddNewPostModal />
      <Box h={10} />
      <Heading color="red.400">
        Facebook Posts List ({facebookPosts.length})
      </Heading>
      <Box h={4} />
      {facebookPosts.map((post: FacebookPost, i) => (
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
          <Box className={styles.PostBox} p={2} w="100%">
            <FacebookEmbed url={post.postURL} width="100%" />
            <Box h={4} />
            <Flex>
              <Link href={post.postURL} isExternal flex={1}>
                <Button w="100%">VIEW POST ON FB</Button>
              </Link>
              <Box w={2} />
              <DeleteAlertButtonDialogue post={post} />
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
            const lastTimeCreated = facebookPosts.at(-1)?.timeCreated;
            const posts = await FirestoreRequests.getFacebookPosts(
              12,
              lastTimeCreated
            );
            setFacebookPosts([...facebookPosts, ...posts]);
            setLoadingMore(false);
          }}
        >
          LOAD MORE POSTS
        </Button>
      </Center>
    </Box>
  );
}

function DeleteAlertButtonDialogue({ post }: { post: FacebookPost }) {
  const [deleting, setDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        REMOVE FROM WEBSITE
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              REMOVE POST
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box h={2} />
              <Text>
                Are you sure you want to remove this post from showing up on the
                home page?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={deleting}
                colorScheme="red"
                onClick={async (e) => {
                  if (deleting) return;
                  try {
                    setDeleting(true);
                    await deleteDoc(
                      doc(getFirestore(), "facebookPosts", post.id)
                    );
                    setDeleting(false);
                    onClose();
                    toast({
                      title: "Deleted!",
                      description: "Deleted a facebook post.",
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
                Remove Facebook Post
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export function AddNewPostModal() {
  const [creating, setCreating] = useState(false);
  const [newPostURL, setNewPostURL] = useState<string>("");
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
        ADD NEW FB POST TO HOMEPAGE
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title*</FormLabel>
              <Input
                placeholder="Full URL of the Facebook post"
                onChange={(e) => setNewPostURL(e.target.value)}
              />
              <Text>* URL is required</Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={creating}
              colorScheme="blue"
              mr={3}
              onClick={async (e) => {
                if (creating) return;
                if (newPostURL === "") {
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
                    collection(getFirestore(), "facebookPosts")
                  ).id;

                  // Create the Firestore document
                  await updateFirestoreField("facebookPosts", newUid, {
                    postURL: newPostURL,
                    timeCreated: new Date().getTime(),
                  });

                  // Show the success message
                  toast({
                    title: "Success!",
                    description: "Added a new post to show on Home page",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  // Close the modal
                  onClose();
                  setNewPostURL("");
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
              Add New FB Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
