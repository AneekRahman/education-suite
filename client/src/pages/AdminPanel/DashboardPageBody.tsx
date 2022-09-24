import { User } from "firebase/auth";
import React from "react";
import styles from "../../styles/AdminPanel/DashboardPage.module.scss";

export default function DashboardPageBody({
  currentUser,
}: {
  currentUser: User;
}) {
  return <div>DashboardPageBody</div>;
}
