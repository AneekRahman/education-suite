import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Image,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import styles from "../../styles/GenericPages/FacultyPageBody.module.scss";

interface Faculty {
  name: string;
  photoURL: string;
  position: string;
  contact: string;
}

const facultyList: Faculty[] = [
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
  {
    name: "Mr. John Doe",
    photoURL:
      "https://media.istockphoto.com/vectors/default-avatar-photo-placeholder-icon-grey-profile-picture-business-vector-id1327592506?k=20&m=1327592506&s=612x612&w=0&h=hgMOPfz7H-CYP_CQ0wbv3IwRkbQna32xWUPoXtMyg5M=",
    position: "Assistant Professor (Bangla)",
    contact: "example@gmail.com",
  },
  {
    name: "Mrs. Jane Doe",
    photoURL:
      "https://st4.depositphotos.com/9998432/23741/v/950/depositphotos_237419212-stock-illustration-person-gray-photo-placeholder-woman.jpg?forcejpeg=true",
    position: "Assistant Professor (English)",
    contact: "example@gmail.com",
  },
];

export default function FacultyPageBody() {
  return (
    <div className={styles.FacultyPageBody}>
      <FacultyList />
    </div>
  );
}

function FacultyList() {
  return (
    <>
      <Grid
        className={styles.FacultyGrid}
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        {facultyList.map((faculty: Faculty) => (
          <GridItem className={styles.Faculty}>
            <Flex>
              <Image src={faculty.photoURL} />
              <Center
                flexDirection="column"
                alignItems="flex-start"
                marginLeft="1em"
              >
                <Heading as="h4">{faculty.name}</Heading>
                <Text>{faculty.position}</Text>
                <Text>{faculty.contact}</Text>
              </Center>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
