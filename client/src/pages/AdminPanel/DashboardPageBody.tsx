import { Box, Button, Heading, Image, useToast } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { FirestoreRequests, SiteInfo } from "../../components/constansts";
import styles from "../../styles/AdminPanel/DashboardPage.module.scss";
import { FaCamera } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export default function DashboardPageBody({
  currentUser,
}: {
  currentUser: User;
}) {
  const [siteInfo, setsiteInfo] = useState<SiteInfo>({
    movingHeader: { label: "", link: "" },
    bgImageURL: "",
  });
  // componentDidMount
  useEffect(() => {
    // Get /siteInfo/
    FirestoreRequests.getSiteInfo().then((siteInfo) => setsiteInfo(siteInfo));
  }, []);

  return (
    <Box p={10} className={styles.DashboardPageBody}>
      <Heading color="red.400">Dashboard</Heading>
      <HeroImageUploadSection siteInfo={siteInfo} />
    </Box>
  );
}

function MovingHeaderSection({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <Box
      w="100%"
      p={2}
      border="1px solid rgba(0,0,0,0.1)"
      borderRadius={10}
      marginTop="1em"
    ></Box>
  );
}

function HeroImageUploadSection({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <Box
      w="100%"
      p={2}
      border="1px solid rgba(0,0,0,0.1)"
      borderRadius={10}
      marginTop="1em"
    >
      <Image
        maxH="10em"
        w="100%"
        borderRadius={10}
        objectFit="cover"
        src={siteInfo.bgImageURL}
      />
      <Box h={2}></Box>
      <HeroImageUploadButton />
    </Box>
  );
}

function HeroImageUploadButton() {
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  return (
    <>
      <Button
        isLoading={uploadingThumbnail}
        w="100%"
        color="blue.400"
        leftIcon={<FaCamera />}
        onClick={(e) => {
          inputRef.current?.click();
        }}
      >
        UPLOAD NEW IMAGE
      </Button>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={async (event) => {
          if (uploadingThumbnail || !event.target.files) return;
          const thumbFile: File = event.target.files[0];

          // Check if less than or equal to 1.5MB
          if (thumbFile.size <= 1.5 * 1024 * 1024) {
            setUploadingThumbnail(true);

            try {
              // Upload to firebase storage
              const uploadTask = await uploadFileToFirebase(
                "siteInfo",
                "hero-image",
                thumbFile
              );
              const downloadURL = await getDownloadURL(uploadTask.ref);

              // Update in firebase Firestore
              await setDoc(
                doc(getFirestore(), "siteInfo", "default"),
                {
                  bgImageURL: downloadURL,
                },
                { merge: true }
              );
              toast({
                title: "Success!",
                description: "Uploaded new home background image!",
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
          } else {
            toast({
              title: "Error!",
              description: "Thumbnail cannot be larger than 1.5MB",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
          setUploadingThumbnail(false);
        }}
      />
    </>
  );
}

const uploadFileToFirebase = (
  folder: string,
  fileName: string | null,
  thumbFile: File
) => {
  const file = thumbFile;
  if (fileName) {
    // Append the type to the fileName provided
    fileName = fileName + file.name.split(".").pop();
  } else {
    // If no fileName provided, add a random one
    fileName = doc(getFirestore(), "RANDOM").id + file.name.split(".").pop();
  }
  // Create the storage ref
  const myref = storageRef(getStorage(), `${folder}/${fileName}`);

  // 'file' comes from the Blob or File API
  return uploadBytes(myref, file, {
    cacheControl: "public,max-age=31535000,s-maxage=31535000",
  });
};
