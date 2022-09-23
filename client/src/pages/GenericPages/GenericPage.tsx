import { Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FirestoreRequests, SiteInfo } from "../../components/constansts";
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
    movingHeader: { label: "", link: "" },
    bgImageURL: "",
  });

  // componentDidMount
  useEffect(() => {
    // Get /siteInfo/
    FirestoreRequests.getSiteInfo().then((siteInfo) => setsiteInfo(siteInfo));
  }, []);

  return (
    <div className={styles.GenericPage}>
      <Flex
        flexDirection="column"
        className={styles.HeroWrapper}
        style={{ backgroundImage: `url(${siteInfo.bgImageURL})` }}
      >
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
