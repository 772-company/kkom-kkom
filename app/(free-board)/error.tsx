"use client";

import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import AlertIcon from "@/public/icons/alert.svg";

export default function Error({
  error,
  reset,
}: {
  error: ResponseError & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid h-lvh place-content-center px-4">
      <div className="text-center">
        <AlertIcon className="mx-auto mb-3 h-16 w-16 text-text-secondary" />
        <p className="text-2xl font-bold tracking-tight text-text-default sm:text-4xl">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
