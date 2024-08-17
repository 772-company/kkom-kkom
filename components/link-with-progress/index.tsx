// "use client";

// import { useProgress } from "@/hooks/use-progress";
// import Link, { LinkProps } from "next/link";
// import { useRouter } from "next/navigation";
// import { MouseEventHandler, memo, useCallback } from "react";

// interface LinkWithProgressProps extends LinkProps {
//   className?: string;
// }

// export default memo(function LinkWithProgress({
//   href,
//   className,
//   children,
//   ...props
// }: React.PropsWithChildren<LinkWithProgressProps>) {
//   const progress = useProgress();
//   const router = useRouter();

//   const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
//     (e) => {
//       e.preventDefault();
//       progress(() => router.push(href.toString()));
//     },
//     [href, progress, router],
//   );

//   return (
//     <Link href={href} onClick={handleClick} className={className} {...props}>
//       {children}
//     </Link>
//   );
// });
