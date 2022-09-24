import styles from "../styles/HeaderAndFooter.module.scss";
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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { FiBook, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { MyTab, SiteInfo, tabsList } from "./constansts";
import MyTexts from "./texts";

export default function Header({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <div className={styles.Header}>
      <Flex justifyContent="flex-start" className={styles.UpperRowWrapper}>
        <div className={styles.MobileMovingHeadlineWrapper}>
          <ChakraLink href={siteInfo.movingHeader?.link} isExternal>
            <p>{siteInfo.movingHeader?.label}</p>
          </ChakraLink>
        </div>
        <Flex width="100%">
          <Image className={styles.Logo} src={MyTexts.HEADER_LOGO} alt="" />
          <UpperColumNextToLogo siteInfo={siteInfo} />
        </Flex>
      </Flex>
      <LowerRowMenu />
    </div>
  );
}

function UpperColumNextToLogo({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <div className={styles.UpperColumn}>
      <div className={styles.PcMovingHeadlineWrapper}>
        <ChakraLink href={siteInfo.movingHeader?.link} isExternal>
          <p>{siteInfo.movingHeader?.label}</p>
        </ChakraLink>
      </div>
      <Flex
        className={styles.TitleWrapper}
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>{MyTexts.SITENAME}</h1>
        <EIINBox />
        <Flex
          className={styles.MobileMenuWrapper}
          justifyContent="space-between"
          width="100%"
        >
          <Link to="/">
            <Button
              p=".7em 1.5em 0.5em"
              bg="rgba(0,0,0,0.08)"
              color="white"
              colorScheme="blackAlpha"
              as={Button}
            >
              HOME
            </Button>
          </Link>
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
          <DrawerHeader borderBottomWidth="1px">
            {MyTexts.SITENAME}
          </DrawerHeader>
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
                  height="max-content"
                  whiteSpace="normal"
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
            <MenuList borderRadius={0}>
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
        {MyTexts.ESTABLISHED}
      </Text>
      <Divider m="2" orientation="vertical" />
      <Text color="white" fontWeight="800">
        {MyTexts.EIIN_NUMBER}
      </Text>
    </Box>
  );
}
