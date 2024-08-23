"use client";

import notFoundJson from "@/public/lotties/not-found.json";
import Lottie from "react-lottie-player";

export default function NotFoundAnimation() {
  return (
    <Lottie
      loop
      animationData={notFoundJson}
      play
      style={{ width: 350, height: 350 }}
    />
  );
}
