import React from "react";
import { useLocation } from "react-router-dom";

export default function ViewEventBody() {
  const location = useLocation();
  console.log(location);

  return <div>Viewing event for: {}</div>;
}
