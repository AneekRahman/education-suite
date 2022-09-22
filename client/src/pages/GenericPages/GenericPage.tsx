import { Center, Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "../../styles/GenericPage.module.scss";

export default function GenericPage({
  title,
  body,
}: {
  title: string;
  body: JSX.Element;
}) {
  return (
    <div className={styles.GenericPage}>
      <Flex flexDirection="column" className={styles.HeroWrapper}>
        <div className={styles.BgDarkGradient}></div>
        <Header />
        <Center flex="1" className={styles.HeroMainTextWrapper}>
          <h2>{title}</h2>
        </Center>
      </Flex>
      {body}
      <Footer />
    </div>
  );
}
