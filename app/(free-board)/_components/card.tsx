"use client";

import useClickOutside from "@/hooks/use-click-outside";
import ProfileIcon from "@/public/icons/default-profile.svg";
import { convertDateToYMD } from "@/utils/convert-date";
import Image from "next/image";
import { ButtonHTMLAttributes, useCallback, useState } from "react";

Card.KebabButton = KebabButton;
Card.Profile = Profile;
Card.DateDescription = DateDescription;
Card.LikeDescription = LikeCountSection;

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-background-tertiary bg-background-secondary ${className}`}
    >
      {children}
    </section>
  );
}

interface KebabButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPatch: () => void;
  onDelete: () => void;
}

function KebabButton({ onPatch, onDelete, ...props }: KebabButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));
  const handlePatch = useCallback(() => {
    onPatch();
    setIsOpen(false);
  }, [onPatch]);
  const handleDelete = useCallback(() => {
    onDelete();
    setIsOpen(false);
  }, [onDelete]);
  return (
    <section className="relative h-4 w-4 md:h-6 md:w-6" ref={ref}>
      <button {...props} onClick={() => setIsOpen((prev) => !prev)}>
        <Image
          fill
          src="/icons/kebab-large.svg"
          alt="kebab"
          sizes="(min-width: 744px) 16px, 24px"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 flex w-[94px] flex-col rounded-xl bg-background-tertiary hover:cursor-pointer md:w-[120px]">
          <div
            className="h-10 w-[94px] border-b border-text-default first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-text-default hover:underline md:h-11 md:w-[120px]"
            onClick={handlePatch}
          >
            <div className="flex h-full w-full items-center justify-between px-[14px]">
              수정하기
            </div>
          </div>
          <div
            className="h-10 w-[94px] border-b border-text-default first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-text-default hover:underline md:h-11 md:w-[120px]"
            onClick={handleDelete}
          >
            <div className="flex h-full w-full items-center justify-between px-[14px]">
              삭제하기
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

KebabButton.displayName = "KebabIcon";

function Profile({ name, className }: { name: string; className?: string }) {
  return (
    <section
      className={`flex h-[32px] w-[70px] items-center justify-center gap-[6px] text-xs text-text-primary md:w-[81px] md:gap-3 md:text-sm ${className}`}
    >
      <ProfileIcon width={32} height={32} />
      <span className="leading-3 md:leading-[14px]">{name}</span>
    </section>
  );
}

Profile.displayName = "Profile";

function DateDescription({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const { year, month, day } = convertDateToYMD(new Date(date));
  return (
    <time
      className={
        "text-xs font-medium leading-3 text-text-disabled md:text-sm md:leading-[14px] " +
        className
      }
    >
      {year}. {month}. {day}
    </time>
  );
}

DateDescription.displayName = "DateDescription";

interface LikeCountSectionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  likeCount: number;
  isClicked: boolean;
}

function LikeCountSection({
  likeCount,
  isClicked,
  ...props
}: LikeCountSectionProps) {
  return (
    <section
      className={`flex items-center gap-1 text-sm font-normal leading-4 text-text-disabled`}
    >
      <button {...props}>
        {isClicked ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="url(#gradient1)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#A3E635" />
              </linearGradient>
            </defs>
            <path
              d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
              stroke="url(#gradient1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
              stroke="rgba(100, 116, 139, 1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span className="mb-0.5 flex h-4 items-center">
        {likeCount > 9999 ? "9999+" : likeCount}
      </span>
    </section>
  );
}

LikeCountSection.displayName = "LikeCountSection";
