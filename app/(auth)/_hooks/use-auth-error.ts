// hooks/useHandleMutationError.ts
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";

export default function useAuthError<T>(
  setError: (name: keyof T, error: { type: string; message: string }) => void,
) {
  return async (error: unknown) => {
    if (error instanceof ResponseError) {
      const response: { details: { key: { message: string } } } =
        await error.response?.json();
      if (response) {
        Object.entries(response.details).forEach(([key, { message }]) => {
          setError(key as keyof T, {
            type: "manual",
            message,
          });
        });
      }
    } else {
      throw error;
    }
  };
}
