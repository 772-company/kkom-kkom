import { newFetch } from ".";

export const instance = newFetch(`${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}`);
