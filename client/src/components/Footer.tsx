import styles from "../styles/HeaderAndFooter.module.scss";

import {
  Heading,
  Text,
  Center,
  Grid,
  GridItem,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import MyTexts from "./texts";

export default function Footer() {
  return (
    <div className={styles.FooterWrapper}>
      <Grid
        className={styles.GridWrapper}
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        <GridItem w="100%">
          <Heading as="h3">{MyTexts.SITENAME}</Heading>
          <Text>আটঘরিয়া, পাবনা</Text>
          <Text>+880-1717-074097</Text>
          <Text>+880-1717-074097</Text>
          <Text>{MyTexts.CONTACT_EMAIL}</Text>
        </GridItem>
        <GridItem w="100%">
          <Heading as="h3">গুরুত্বপূর্ণ লিংক</Heading>
          <Text>
            <ChakraLink href="http://www.moedu.gov.bd/" isExternal>
              শিক্ষা মন্ত্রণালয়
            </ChakraLink>
          </Text>
          <Text>
            <ChakraLink href="http://www.dshe.gov.bd/" isExternal>
              মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর
            </ChakraLink>
          </Text>
          <Text>
            <ChakraLink href="http://www.banbeis.gov.bd/" isExternal>
              ব্যানবেইজ
            </ChakraLink>
          </Text>
          <Text>
            <ChakraLink href="http://www.naem.gov.bd/" isExternal>
              নায়েম
            </ChakraLink>
          </Text>
          <Text>
            <ChakraLink href="http://www.nctb.gov.bd/" isExternal>
              এনসিটিবি
            </ChakraLink>
          </Text>
          <Text>
            <ChakraLink href="http://www.teachers.gov.bd/" isExternal>
              শিক্ষক বাতায়ন
            </ChakraLink>
          </Text>
          <Text>
            <ChakraLink href="http://www.konnect.edu.bd/" isExternal>
              কিশোর বাতায়ন
            </ChakraLink>
          </Text>
        </GridItem>
        <GridItem w="100%">
          <Image
            borderRadius="1em"
            src="/assets/logo-white-bg.jpg"
            height="100%"
          />
        </GridItem>
      </Grid>
      <div className={styles.CopyRightWrapper}>
        <Center>
          <Text as="span">
            Copyright © {new Date().getFullYear()} All rights reserved:{" "}
            <ChakraLink
              href="https://studios.baalish.com"
              color="rgb(253, 255, 118)"
              isExternal
            >
              Baalish Studios e-suite
            </ChakraLink>
          </Text>
        </Center>
      </div>
    </div>
  );
}
