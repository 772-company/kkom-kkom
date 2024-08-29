"use client";

export default function myImageLoader({ src, width, quality }) {
  const secureSrc = src.startsWith("http://")
    ? src.replace("http://", "https://")
    : src;
  return `${secureSrc}?w=${width}&q=${quality || 75}`;
}
