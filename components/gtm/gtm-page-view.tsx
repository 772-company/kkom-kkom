"use client";

import gtmPageView from "@/lib/gtm";
import { useEffect } from "react";

interface GtmPageViewProps {
  pageTitle: string;
}

export default function GtmPageView({ pageTitle }: GtmPageViewProps) {
  useEffect(() => {
    if (pageTitle) {
      gtmPageView({ pageTitle });
    }
  }, [pageTitle]);

  return <></>;
}
