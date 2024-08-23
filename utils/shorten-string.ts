export default function shortenString(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + "..." : str;
}
