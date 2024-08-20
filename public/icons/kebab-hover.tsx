export function KebabHover({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="7.5" r="1.5" fill="#64748B" />
      <circle cx="12" cy="12" r="1.5" fill="#64748B" />
      <circle cx="12" cy="16.5" r="1.5" fill="#64748B" />
    </svg>
  );
}
