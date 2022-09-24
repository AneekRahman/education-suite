import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
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

export default function DashboardPageBody() {
  const [firestoreStillLoading, setFirestoreStillLoading] = useState(true);
  const [siteInfo, setsiteInfo] = useState<SiteInfo>({
    movingHeader: { label: "", link: "" },
    bgImageURL: "",
  });
  // componentDidMount
  useEffect(() => {
    // Get /siteInfo/
    FirestoreRequests.getSiteInfo().then((siteInfo) => {
      setsiteInfo(siteInfo);
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
    <Box p={10} className={styles.DashboardPageBody}>
      <Heading color="red.400">Dashboard</Heading>
      <HeroImageUploadSection siteInfo={siteInfo} />
      <Box h={10} />
      <MovingHeaderSection siteInfo={siteInfo} />
    </Box>
  );
}

function MovingHeaderSection({ siteInfo }: { siteInfo: SiteInfo }) {
  const toast = useToast();
  const [updating, setUpdating] = useState(false);
  const [newMovingHeaderObject, setNewMovingHeaderObject] = useState({
    label: siteInfo.movingHeader.label,
    link: siteInfo.movingHeader.link,
  });

  return (
    <Box
      w="100%"
      p={4}
      border="1px solid rgba(0,0,0,0.1)"
      borderRadius={10}
      backgroundColor="#f07070"
    >
      <Text as="b" color="white">
        ANIMATED HEADER:
      </Text>
      <Box h={2} />
      <InputGroup>
        <InputLeftAddon children="Header Label*" />
        <Input
          placeholder="Add the animated header text"
          backgroundColor="white"
          value={newMovingHeaderObject.label}
          onChange={(e) => {
            setNewMovingHeaderObject({
              label: e.target.value,
              link: newMovingHeaderObject.link,
            });
          }}
        />
      </InputGroup>
      <Box h={2} />
      <InputGroup>
        <InputLeftAddon children="Header Link*" />
        <Input
          placeholder="https://....."
          backgroundColor="white"
          value={newMovingHeaderObject.link}
          onChange={(e) => {
            setNewMovingHeaderObject({
              label: newMovingHeaderObject.label,
              link: e.target.value,
            });
          }}
        />
      </InputGroup>
      <Box h={2} />
      <Button
        isLoading={updating}
        w="100%"
        color="blue.400"
        leftIcon={<FaCamera />}
        onClick={async (e) => {
          if (updating) return;
          setUpdating(true);
          // Update in firebase Firestore
          await updateFirestoreField("siteInfo", "default", {
            movingHeader: newMovingHeaderObject,
          });
          // Show the success message
          toast({
            title: "Success!",
            description: "Successfully updated in database.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setUpdating(false);
        }}
      >
        UPDATE HEADER
      </Button>
      <Box h={2} />
      <Text>(*) Marked is required</Text>
      <Text>
        By clicking this header at the top of the website, a new tab will open
        for the user with the provided url.
      </Text>
      <Text>Can be updated frequently. </Text>
    </Box>
  );
}

function HeroImageUploadSection({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <Box
      w="100%"
      p={4}
      border="1px solid rgba(0,0,0,0.1)"
      borderRadius={10}
      backgroundColor="#f07070"
      marginTop="1em"
    >
      <Text as="b" color="white">
        BACKGROUND IMAGE:
      </Text>
      <Box h={2} />
      <Image
        maxH="10em"
        w="100%"
        borderRadius={10}
        objectFit="cover"
        src={siteInfo.bgImageURL}
      />
      <Box h={4} />
      <HeroImageUploadButton />
      <Box h={2} />
      <Text>
        This background image is used as the primary background image for all of
        the pages across the website.
      </Text>
      <Text>Max file size: 1500 KB </Text>
      <Text>Can be updated frequently. </Text>
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
              await updateFirestoreField("siteInfo", "default", {
                bgImageURL: downloadURL,
              });

              // Show the success message
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

const updateFirestoreField = async (
  collectionRef: string,
  docRef: string,
  newData: object
) => {
  // Update in firebase Firestore
  await setDoc(doc(getFirestore(), collectionRef, docRef), newData, {
    merge: true,
  });
};

const uploadFileToFirebase = (
  folder: string,
  fileName: string | null,
  thumbFile: File
) => {
  const file = thumbFile;
  if (fileName) {
    // Append the type to the fileName provided
    fileName = fileName + "." + file.name.split(".").pop();
  } else {
    // If no fileName provided, add a random one
    fileName =
      doc(getFirestore(), "RANDOM").id + "." + file.name.split(".").pop();
  }
  // Create the storage ref
  const myref = storageRef(getStorage(), `${folder}/${fileName}`);

  // 'file' comes from the Blob or File API
  return uploadBytes(myref, file, {
    cacheControl: "public,max-age=31535000,s-maxage=31535000",
  });
};
