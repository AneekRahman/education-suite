import React from "react";
import { useLocation } from "react-router-dom";

export default function ViewEventBody() {
  const location = useLocation();
  const documentUid = location.pathname.split("/").at(-1);

  return <div>Viewing event for: {documentUid}</div>;
}
