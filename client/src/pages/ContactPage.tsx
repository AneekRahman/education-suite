import { Center, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import styles from "../styles/ContactPage.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.ContactPage}>
      <Flex flexDirection="column" className={styles.HeroWrapper}>
        <div className={styles.BgDarkGradient}></div>
        <Header />
        <Center flex="1" className={styles.HeroMainTextWrapper}>
          <h2>Contact</h2>
        </Center>
      </Flex>
    </div>
  );
}
