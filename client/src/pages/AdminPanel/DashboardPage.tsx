import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import MyTexts from "../../components/texts";
import styles from "../../styles/AdminPanel/DashboardPage.module.scss";
import DashboardPageBody from "./DashboardPageBody";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    // Listen to auth state changed
    getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div>
      {currentUser ? (
        <div>
          {/* Check if account has access */}
          {currentUser.uid !== MyTexts.SERVER_ACCOUNT_UID ? (
            //  Don't show dashboard
            <AccountNoAccess />
          ) : (
            // Show dashboard
            <Flex>
              <DashboardSideBox
                setPageCount={setPageCount}
                currentUser={currentUser}
              />
              {pageCount === 0 ? (
                <DashboardPageBody currentUser={currentUser} />
              ) : null}
            </Flex>
          )}
        </div>
      ) : (
        <LoginBox />
      )}
    </div>
  );
}

function DashboardSideBox({
  currentUser,
  setPageCount,
}: {
  currentUser: User;
  setPageCount: Function;
}) {
  return (
    <Box
      className={styles.SideBoxWrapper}
      p={10}
      maxW={300}
      height="100vh"
      borderRight="1px solid rgba(0,0,0,0.1)"
    >
      <Heading>Welcome: {currentUser.displayName}</Heading>
      <Box height={10} />
      <Button width="100%" onClick={(e) => getAuth().signOut()}>
        Logout
      </Button>
    </Box>
  );
}

function AccountNoAccess() {
  return (
    <Center height="100vh">
      <Box
        border="1px solid rgba(0,0,0,.05)"
        p={30}
        borderRadius={10}
        maxW={500}
      >
        <Text>
          You don't have access to this dashboard. If you think this is an error
          please contact the web administrators.
        </Text>
        <Box height={4} />
        <Button width="100%" onClick={(e) => getAuth().signOut()}>
          Logout
        </Button>
      </Box>
    </Center>
  );
}

function LoginBox() {
  const toast = useToast();

  return (
    <Center height="100vh">
      <Box
        border="1px solid rgba(0,0,0,.05)"
        p={30}
        borderRadius={10}
        maxW={500}
      >
        <Text>
          This is the admin dashboard for the institution. Only authorized
          personnel have access.
        </Text>
        <Text marginTop={4} display="flex" alignItems="center">
          LOGIN WITH
          <Box width={2} />
          <FcGoogle size={30} />
        </Text>
        <Button
          w="100%"
          marginTop={5}
          onClick={(e) => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
              .then((result) => {
                // The signed-in user info.
                const user = result.user;
                if (user.uid === MyTexts.SERVER_ACCOUNT_UID) {
                  toast({
                    title: "Success!.",
                    description: "Signed in as: " + user.email,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              })
              .catch((error) => {
                console.error(error);
                toast({
                  title: "Error!",
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              });
          }}
        >
          Login with Google
        </Button>
      </Box>
    </Center>
  );
}
