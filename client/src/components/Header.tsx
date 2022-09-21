import styles from "../styles/HomePage.module.scss";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";

interface MyTab {
  link: string;
  label: string;
  subTabs?: { link: string; label: string }[];
}

const tabsList: MyTab[] = [
  { label: "HOME", link: "/" },
  {
    label: "ACADEMICS",
    link: "/academics",
    subTabs: [
      { label: "BANGLA", link: "/academics/bangla" },
      { label: "ENGLISH", link: "/academics/english" },
      { label: "MATHEMATICS", link: "/academics/mathematics" },
      { label: "PHYSICS", link: "/academics/physics" },
      { label: "CHEMISTRY", link: "/academics/chemistry" },
      { label: "BIOLOGY", link: "/academics/biology" },
    ],
  },
  { label: "NOTICE", link: "/notice" },
  { label: "CONTACT", link: "/contact" },
  { label: "RESULTS", link: "/results" },
  {
    label: "MESSAGES",
    link: "/messages",
    subTabs: [
      { label: "PRINCIPAL'S MESSAGE", link: "/messages/principal" },
      { label: "CHAIRMAN'S MESSAGE", link: "/messages/chairman" },
    ],
  },
  { label: "MORE ABOUT", link: "/about" },
];

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.UpperRowWrapper}>
        <img className={styles.Logo} src="/assets/header-logo.png" alt="" />
        <div className={styles.UpperColumn}>
          <div className={styles.MovingHeadlineWrapper}>
            <p>
              অবিভক্ত ব্রিটিশ বাংলার উনিশ শতকের দ্বিতীয়ার্ধের শুরুতে আধুনিক
              শিক্ষা বিষয়ক ঐতিহাসিক নীতিমালা আশ্রয় করে কলেজস্তরের শিক্ষা
              প্রসারে সম্ভাবনার সৃষ্টি করে
            </p>
          </div>
          <h1>কয়রাবারী বহুমুখী উচ্চ বিদ্যালয়, পাবনা</h1>
        </div>
      </div>
      <div className={styles.LowerRowWrapper}>
        {tabsList.map((tab: MyTab) => (
          <Menu>
            <MenuButton
              p="0.5em 1.5em"
              _hover={{
                bg: "rgba(0,0,0,0.05)",
              }}
              _expanded={{
                bg: "rgba(0,0,0,0.2)",
              }}
              bg="transparent"
              color="white"
              as={Button}
              rightIcon={tab.subTabs !== undefined ? <BiChevronDown /> : null}
              onClick={(e) => {
                if (tab.subTabs === undefined) {
                  // Use router to go to this link
                }
              }}
            >
              {tab.label}
            </MenuButton>
            {tab.subTabs !== undefined ? (
              <MenuList>
                {tab.subTabs.map((subTab) => (
                  <MenuItem
                    onClick={(e) => {
                      // Go to this subTabs link
                    }}
                  >
                    {subTab.label}
                  </MenuItem>
                ))}
              </MenuList>
            ) : null}
          </Menu>
        ))}
      </div>
    </div>
  );
}
