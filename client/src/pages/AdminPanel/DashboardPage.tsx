import React, { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { Button, useToast } from "@chakra-ui/react";

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const toast = useToast();

  useEffect(() => {
    // Listen to auth state changed
    getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div>
      {currentUser ? (
        <Button>Logout</Button>
      ) : (
        <Button
          onClick={(e) => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
              .then((result) => {
                // The signed-in user info.
                const user = result.user;
                toast({
                  title: "Success!.",
                  description: "Signed in as: " + user.email,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
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
      )}
    </div>
  );
}

function SideNavBar() {
  return <></>;
}
