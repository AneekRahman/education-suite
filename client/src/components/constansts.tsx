interface Event {
  date: string; // Jan 8
  title: string;
  link: string;
  photoURL: string;
}

interface Notice {
  date: string; // March 26, 2018
  title: string;
  link: string;
}

interface MyTab {
  link: string;
  label: string;
  subTabs?: { link: string; label: string }[];
}

// Export the types
export type { Event, Notice, MyTab };

// EXPORT THE CONSTANT VALUES --------------------

export const SITENAME = "কয়রাবারী বহুমুখী উচ্চ বিদ্যালয়, পাবনা";
export const SITE_FULL_LINK = "https://example.com";
export const MAIN_EMAIL = "example@gmail.com";
export const MAIN_PHONE_NUMBER = "০২-৫৮১৫৫৮৭১";

export const tabsList: MyTab[] = [
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

export const movingHealine: string = `অবিভক্ত ব্রিটিশ বাংলার উনিশ শতকের দ্বিতীয়ার্ধের শুরুতে আধুনিক
              শিক্ষা বিষয়ক ঐতিহাসিক নীতিমালা আশ্রয় করে কলেজস্তরের শিক্ষা
              প্রসারে সম্ভাবনার সৃষ্টি করে`;

// 10 Notices will be fetched from Firestore
export const noticesList: Notice[] = [
  {
    date: "March 26, 2018",
    title:
      "সেই মাঠমার্চ যেটি মহান স্বাধীনতা ও জাতীয় দিবস-2018 খ্রিঃ আটঘরিয়া উপজেলা স্টেডিয়াম মাঠে   কয়রাবাড়ীবহুমুখী উচ্চ বিদ্যালয় প্রথম স্থান অধিকার করে।",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "পাবনার আটঘরিয়া উপজেলার ঐতিহ্যবাহী কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ে বুধবার (৩ আগষ্ট -২০২২ খ্রি.) পাঠদান কার্যক্রম পরিদর্শন করেন উপজেলা নির্বাহী কর্মকর্তা মাকসুদা আক্তার মাসু। ",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ের সহকারী শিক্ষক (গণিত) মোঃ নাসির উদ্দিনের পিতা জহুরুল ইসলাম মুন্সী রবিবার দিনগত মধ্যরাতে ইন্তেকাল করিয়াছেন",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ের ম্যানেজিং কমিটি, সকল  শিক্ষক, অভিভাবক, শিক্ষার্থীদের ঈদুল আযহার শুভেচ্ছা। ঈদ মোবারক",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "মাননীয় এমপি মহোদয় বীর মুক্তিযোদ্ধা  জনাব আলহাজ্ব মোঃ নুরুজ্জামান বিশ্বাস, সংসদ সদস্য পাবনা-৪ (আটঘরিয়া-ঈশ্বরদী)।",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "সেই মাঠমার্চ যেটি মহান স্বাধীনতা ও জাতীয় দিবস-2018 খ্রিঃ আটঘরিয়া উপজেলা স্টেডিয়াম মাঠে   কয়রাবাড়ীবহুমুখী উচ্চ বিদ্যালয় প্রথম স্থান অধিকার করে।",
    link: "",
  },
  {
    date: "March 26, 2018",
    title:
      "পাবনার আটঘরিয়া উপজেলার ঐতিহ্যবাহী কয়রাবাড়ী বহুমুখী উচ্চ বিদ্যালয়ে বুধবার (৩ আগষ্ট -২০২২ খ্রি.) পাঠদান কার্যক্রম পরিদর্শন করেন উপজেলা নির্বাহী কর্মকর্তা মাকসুদা আক্তার মাসু। ",
    link: "",
  },
];

// 5 events will be fetched from Firestore
export const eventsList: Event[] = [
  {
    date: "JAN 8",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "https://i.ytimg.com/vi/9LsQbUav6mc/maxresdefault.jpg",
  },
  {
    date: "MAR 30",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL:
      "https://images.hindustantimes.com/img/2021/09/12/1600x900/BANGLADESH-HEALTH-VIRUS-EDUCATION-2_1631428046899_1631428652121.jpg",
  },
  {
    date: "AUG 12",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL:
      "https://www.wsws.org/asset/096bbd60-25da-4841-a324-7aaad9e57093?rendition=image1280",
  },
  {
    date: "MAR 30",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL:
      "https://www.gage.odi.org/wp-content/uploads/2019/12/Students-at-school-in-Chittagong-Bangladesh-c-NBertrams_NB_1418.jpg",
  },
  {
    date: "AUG 12",
    title:
      " A Delegate of Liaoning Communication University Visited Canadian University of Bangladesh. It was a glorious day.",
    link: "",
    photoURL: "https://ddnews.gov.in/sites/default/files/Bangladesh_86.jpg",
  },
];
