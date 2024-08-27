import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Image
        src="/icons/tube-spinner.svg"
        alt="로딩 중"
        width={120}
        height={120}
      />
    </div>
  );
}
