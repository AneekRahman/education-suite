import { Center, Flex } from "@chakra-ui/react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SiteInfo } from "../../components/constansts";
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
  const [siteInfo, setsiteInfo] = useState<SiteInfo>({
    eiin: 0,
    established: 0,
    sitename: "",
  });

  // componentDidMount
  useEffect(() => {
    getDoc(doc(getFirestore(), "siteInfo/default")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setsiteInfo({
          eiin: data.eiin,
          established: data.established,
          movingHeader: data.movingHeader,
          sitename: data.sitename,
        });
      }
    });
  }, []);

  return (
    <div className={styles.GenericPage}>
      <Flex flexDirection="column" className={styles.HeroWrapper}>
        <div className={styles.BgDarkGradient}></div>
        <Header siteInfo={siteInfo} />
        <Center flex="1" className={styles.HeroMainTextWrapper}>
          <h2>{title}</h2>
        </Center>
      </Flex>
      {body}
      <Footer />
    </div>
  );
}
