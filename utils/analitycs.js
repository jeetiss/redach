import { useEffect } from "react";
import GAnalytics from "ganalytics";
import { isNode } from "./is-node";

const ga =
  !isNode() && process.env.NODE_ENV === "production"
    ? new GAnalytics("UA-176772118-1", { aid: 1 })
    : { send: console.log };

export const usePageview = () => {
  useEffect(() => {
    ga.send("pageview");
  });
};
