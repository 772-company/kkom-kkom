import Spinner from "@/public/icons/tube-spinner.svg";

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Spinner width={120} height={120} />
    </div>
  );
}
