import styles from "../styles/HomePage.module.scss";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Text,
  Image,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { FiBook, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface MyTab {
  link: string;
  label: string;
  subTabs?: { link: string; label: string }[];
}

const SITENAME = "কয়রাবারী বহুমুখী উচ্চ বিদ্যালয়, পাবনা";

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
  {
    label: "ADMISSION & E-SHEBA",
    link: "/results",
    subTabs: [
      {
        label: "Govt. School Admission",
        link: "https://gsa.teletalk.com.bd/",
      },
      { label: "e-School", link: "http://eschool.sib.gov.bd/" },
      { label: "Pathshala", link: "http://automation.sib.gov.bd/" },
      { label: "PDS", link: "http://pds.sib.gov.bd/" },
    ],
  },
  {
    label: "MESSAGES",
    link: "/messages",
    subTabs: [
      { label: "PRINCIPAL'S MESSAGE", link: "/messages/principal" },
      { label: "CHAIRMAN'S MESSAGE", link: "/messages/chairman" },
    ],
  },
  { label: "FACULTY", link: "/faculty" },
];

const movingHealine: string = `অবিভক্ত ব্রিটিশ বাংলার উনিশ শতকের দ্বিতীয়ার্ধের শুরুতে আধুনিক
              শিক্ষা বিষয়ক ঐতিহাসিক নীতিমালা আশ্রয় করে কলেজস্তরের শিক্ষা
              প্রসারে সম্ভাবনার সৃষ্টি করে`;

export default function Header() {
  return (
    <div className={styles.Header}>
      <Flex justifyContent="flex-start" className={styles.UpperRowWrapper}>
        <div className={styles.MobileMovingHeadlineWrapper}>
          <p>{movingHealine}</p>
        </div>
        <Flex width="100%">
          <Image className={styles.Logo} src="/assets/header-logo.png" alt="" />
          <UpperColumNextToLogo />
        </Flex>
      </Flex>
      <LowerRowMenu />
    </div>
  );
}

function UpperColumNextToLogo() {
  return (
    <div className={styles.UpperColumn}>
      <div className={styles.PcMovingHeadlineWrapper}>
        <p>{movingHealine}</p>
      </div>
      <Flex
        className={styles.TitleWrapper}
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>{SITENAME}</h1>
        <EIINBox />
        <Flex
          className={styles.MobileMenuWrapper}
          justifyContent="space-between"
          width="100%"
        >
          <Button
            p=".7em 1.5em 0.5em"
            bg="rgba(0,0,0,0.08)"
            color="white"
            colorScheme="blackAlpha"
            as={Button}
          >
            HOME
          </Button>
          <DrawerButton />
        </Flex>
      </Flex>
    </div>
  );
}

function DrawerButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        p=".7em 1.5em 0.5em"
        bg="rgba(0,0,0,0.08)"
        color="white"
        colorScheme="blackAlpha"
        leftIcon={<FiMenu />}
        onClick={onOpen}
      >
        MENU
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{SITENAME}</DrawerHeader>
          <DrawerBody padding={0}>
            <MobileDrawerAccordionMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function MobileDrawerAccordionMenu() {
  const navigate = useNavigate();

  return (
    <Accordion>
      {tabsList.map((tab: MyTab) => (
        <AccordionItem>
          <h2>
            <AccordionButton p="1em 2em">
              <Box
                flex="1"
                textAlign="left"
                onClick={(e) => {
                  // If there are no subtabs to open, then go straight to the root link given
                  if (tab.subTabs === undefined && tab.link) {
                    // Use router to go to this link
                    navigate(tab.link);
                  }
                }}
              >
                {tab.label}
              </Box>
              {tab.subTabs !== undefined ? <AccordionIcon /> : null}
            </AccordionButton>
          </h2>
          {tab.subTabs !== undefined ? (
            <AccordionPanel>
              {tab.subTabs.map((subTab) => (
                <Button
                  p=".7em 2em"
                  backgroundColor="transparent"
                  borderRadius={0}
                  width="100%"
                  onClick={(e) => {
                    // If the link includes a full url with http, open a new tap
                    if (subTab.link && subTab.link.includes("http")) {
                      const newWindow = window.open(
                        subTab.link,
                        "_blank",
                        "noopener,noreferrer"
                      );
                      if (newWindow) newWindow.opener = null;
                    } else {
                      // Otherwise if its a relative url
                      navigate(subTab.link);
                    }
                  }}
                >
                  <Box flex="1" textAlign="left">
                    {subTab.label}
                  </Box>
                </Button>
              ))}
            </AccordionPanel>
          ) : null}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function LowerRowMenu() {
  const navigate = useNavigate();

  return (
    <div className={styles.LowerRowWrapper}>
      {tabsList.map((tab: MyTab) => (
        <Menu>
          <MenuButton
            p=".7em 1.5em 0.5em"
            _hover={{
              bg: "rgba(0,0,0,0.05)",
            }}
            _active={{
              bg: "rgba(0,0,0,0.2)",
              color: "rgba(255,255,255,.7)",
            }}
            _expanded={{
              bg: "rgba(0,0,0,0.1)",
            }}
            bg="transparent"
            color="white"
            as={Button}
            rightIcon={tab.subTabs !== undefined ? <BiChevronDown /> : null}
            onClick={(e) => {
              // If there are no subtabs to open, then go straight to the root link given
              if (tab.subTabs === undefined && tab.link) {
                // Use router to go to this link
                navigate(tab.link);
              }
            }}
          >
            {tab.label}
          </MenuButton>
          {tab.subTabs !== undefined ? (
            <MenuList>
              {tab.subTabs.map((subTab) => (
                <MenuItem
                  icon={<FiBook />}
                  onClick={(e) => {
                    // If the link includes a full url with http, open a new tap
                    if (subTab.link && subTab.link.includes("http")) {
                      const newWindow = window.open(
                        subTab.link,
                        "_blank",
                        "noopener,noreferrer"
                      );
                      if (newWindow) newWindow.opener = null;
                    } else {
                      // Otherwise if its a relative url
                      navigate(subTab.link);
                    }
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
  );
}

function EIINBox() {
  return (
    <Box
      className={styles.EIINBox}
      marginRight="4"
      border="1px solid rgba(255,255,255,.4)"
      display="flex"
    >
      <Text color="white" fontWeight="800">
        ESTABLISHED: 1972
      </Text>
      <Divider m="2" orientation="vertical" />
      <Text color="white" fontWeight="800">
        EIIN: 125260
      </Text>
    </Box>
  );
}
