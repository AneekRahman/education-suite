import styles from "../styles/HomePage.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface MyTab {
  link: string;
  label: string;
}

const tabsList: MyTab[] = [
  { label: "HOME", link: "/" },
  { label: "ACADEMICS", link: "/academics" },
  { label: "NOTICE", link: "/notice" },
  { label: "CONTACT", link: "/contact" },
  { label: "RESULTS", link: "/results" },
  { label: "MESSAGES", link: "/messages" },
  { label: "MORE ABOUT", link: "/about" },
];

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.UpperRowWrapper}>
        <img className={styles.Logo} src="/assets/header-logo.png" alt="" />
        <div className={styles.UpperColumn}>
          <div className={styles.MovingHeadlineWrapper}>
            <Typography>
              অবিভক্ত ব্রিটিশ বাংলার উনিশ শতকের দ্বিতীয়ার্ধের শুরুতে আধুনিক
              শিক্ষা বিষয়ক ঐতিহাসিক নীতিমালা আশ্রয় করে কলেজস্তরের শিক্ষা
              প্রসারে সম্ভাবনার সৃষ্টি করে
            </Typography>
          </div>
          <Typography variant="h1">
            কয়রাবারী বহুমুখী উচ্চ বিদ্যালয়, পাবনা
          </Typography>
        </div>
      </div>
      <div className={styles.LowerRowWrapper}>
        {tabsList.map((tab: MyTab) => (
          <Button size="medium" onClick={(e) => {}}>
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
