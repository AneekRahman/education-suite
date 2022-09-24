import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { Box, Button, Center, Text, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import MyTexts from "../../components/texts";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
            <AccountNoAccess />
          ) : (
            <DashboardSideBox currentUser={currentUser} />
          )}
        </div>
      ) : (
        <LoginBox />
      )}
    </div>
  );
}

function DashboardSideBox({ currentUser }: { currentUser: User }) {
  return (
    <Box p={20}>
      <Text>Welcome: {currentUser.displayName}. This is the dashboard</Text>
      <Button onClick={(e) => getAuth().signOut()}>Logout</Button>
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
