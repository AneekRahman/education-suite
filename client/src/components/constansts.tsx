import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

interface SiteInfo {
  bgImageURL: string;
  movingHeader: {
    label: string;
    link: string;
  };
}

interface Event {
  id: string;
  timeCreated: number; // 1663945988679
  title: string;
  imageURLs: string[];
}

interface Notice {
  id: string;
  timeCreated: number; // 1663945988679
  title: string;
  fileURLs: string[];
}

interface MyTab {
  link: string;
  label: string;
  subTabs?: { link: string; label: string }[];
}

// Export the types
export type { Event, Notice, MyTab, SiteInfo };

// EXPORT THE CONSTANT VALUES --------------------

export const SITENAME = "কয়রাবারী বহুমুখী উচ্চ বিদ্যালয়";
export const SITE_FULL_LINK = "https://example.com";
export const MAIN_EMAIL = "example@gmail.com";
export const MAIN_PHONE_NUMBER = "০২-৫৮১৫৫৮৭১";

export const tabsList: MyTab[] = [
  { label: "HOME", link: "/" },
  // {
  //   label: "ACADEMICS",
  //   link: "/academics",
  //   subTabs: [
  //     { label: "BANGLA", link: "/academics/bangla" },
  //     { label: "ENGLISH", link: "/academics/english" },
  //     { label: "MATHEMATICS", link: "/academics/mathematics" },
  //     { label: "PHYSICS", link: "/academics/physics" },
  //     { label: "CHEMISTRY", link: "/academics/chemistry" },
  //     { label: "BIOLOGY", link: "/academics/biology" },
  //   ],
  // },
  {
    label: "ADMISSION & E-SHEBA",
    link: "/",
    subTabs: [
      {
        label: "GENERAL SCHOOL ADMISSION",
        link: "https://gsa.teletalk.com.bd/",
      },
      {
        label: "BOARD EXAM RESULTS",
        link: "https://eboardresults.com/v2/home",
      },
      { label: "PATHSHALA", link: "http://automation.sib.gov.bd/" },
      { label: "PDS", link: "http://pds.sib.gov.bd/" },
    ],
  },
  { label: "NOTICE", link: "/notice" },
  { label: "EVENTS", link: "/events" },
  { label: "CONTACT", link: "/contact" },
  { label: "FACULTY", link: "/faculty" },
  {
    label: "MESSAGES",
    link: "/messages",
    subTabs: [
      { label: "PRINCIPAL'S MESSAGE", link: "/messages/principal" },
      { label: "CHAIRMAN'S MESSAGE", link: "/messages/chairman" },
    ],
  },
  {
    label: "ED. MINISTRY",
    link: "/",
    subTabs: [
      {
        label: "SECONDARY & HIGHER EDUCATION DIVISION",
        link: "http://www.shed.gov.bd/",
      },
      {
        label: "NATIONAL CURRICULUM & TEXT-BOOK BOARD",
        link: "http://www.nctb.gov.bd/",
      },
      {
        label: "NATIONAL ACADEMY FOR EDUCATIONAL MANAGEMENT",
        link: "http://www.naem.gov.bd/",
      },
      {
        label: "BANBEIS",
        link: "http://www.banbeis.gov.bd/",
      },
      {
        label: "MINISTRY OF PRIMARY AND MASS EDUCATION",
        link: "http://www.mopme.gov.bd/",
      },
      {
        label: "ISEB RESULTS",
        link: "http://www.educationboardresults.gov.bd/",
      },
    ],
  },
];

export class FirestoreRequests {
  static getSiteInfo = async (): Promise<SiteInfo> => {
    const snapshot = await getDoc(doc(getFirestore(), "siteInfo/default"));
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        movingHeader: data.movingHeader,
        bgImageURL: data.bgImageURL,
      };
    }
    return {
      movingHeader: {
        label: "",
        link: "",
      },
      bgImageURL: "",
    };
  };
  // Get newest events from /events/
  static getEvents = async (
    docsLimit: number,
    lastTimeCreated?: number
  ): Promise<Event[]> => {
    // Query Without startAfter
    let q = query(
      collection(getFirestore(), "events"),
      orderBy("timeCreated", "desc"),
      limit(docsLimit)
    );
    // Query If we need to use startAfter
    if (lastTimeCreated) {
      q = query(
        collection(getFirestore(), "events"),
        orderBy("timeCreated", "desc"),
        startAfter(lastTimeCreated),
        limit(docsLimit)
      );
    }

    // Do the query
    const snapshots = await getDocs(q);

    if (!snapshots.empty) {
      const events: Event[] = snapshots.docs.map((snapshot) => {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          timeCreated: data.timeCreated,
          title: data.title,
          imageURLs: data.imageURLs,
        };
      });
      return events;
    }
    // If none found return empty
    return [];
  };
  // Get newest notices from /notices/
  static getNotices = async (
    docsLimit: number,
    lastTimeCreated?: number
  ): Promise<Notice[]> => {
    // Query Without startAfter
    let q = query(
      collection(getFirestore(), "notices"),
      orderBy("timeCreated", "desc"),
      limit(docsLimit)
    );
    // Query If we need to use startAfter
    if (lastTimeCreated) {
      q = query(
        collection(getFirestore(), "notices"),
        orderBy("timeCreated", "desc"),
        startAfter(lastTimeCreated),
        limit(docsLimit)
      );
    }

    // Do the query
    const snapshots = await getDocs(q);

    if (!snapshots.empty) {
      const notices: Notice[] = snapshots.docs.map((snapshot) => {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          timeCreated: data.timeCreated,
          title: data.title,
          fileURLs: data.fileURLs,
        };
      });
      return notices;
    }
    // If none found return empty
    return [];
  };
}
