"use client";

import useClickOutside from "@/hooks/use-click-outside";
import ProfileIcon from "@/public/icons/default-profile.svg";
import { KebabHover } from "@/public/icons/kebab-hover";
import { KebabLarge } from "@/public/icons/kebab-large";
import LikeButtonColored from "@/public/icons/like-button-colored";
import { convertDateToYMD } from "@/utils/convert-date";
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

export function KebabButton({ onPatch, onDelete, ...props }: KebabButtonProps) {
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
    <section className="group relative h-6 w-6" ref={ref}>
      <button
        {...props}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <KebabHover className="group-hover:hidden" />

        <KebabLarge className="hidden group-hover:block" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 flex w-[94px] flex-col rounded-xl bg-background-tertiary hover:cursor-pointer xl:w-[120px]">
          <div
            className="h-10 w-full border-b border-text-default first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-brand-primary hover:underline"
            onClick={handlePatch}
          >
            <div className="flex h-full w-full items-center justify-center px-[14px] text-xs xl:text-sm">
              수정하기
            </div>
          </div>
          <div
            className="h-10 w-full border-b border-text-default first:rounded-t-xl last:rounded-b-xl last:border-b-0 hover:text-brand-primary hover:underline"
            onClick={handleDelete}
          >
            <div className="flex h-full w-full items-center justify-center px-[14px] text-xs xl:text-sm">
              삭제하기
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

KebabButton.displayName = "KebabIcon";

export function Profile({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <section
      className={`flex h-[32px] items-center justify-center gap-[6px] text-xs text-text-primary md:gap-3 md:text-sm ${className}`}
    >
      <ProfileIcon width={32} height={32} />
      <span className="leading-3 md:leading-[14px]">{name}</span>
    </section>
  );
}

Profile.displayName = "Profile";

export function DateDescription({
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
      {year}. {month < 10 ? "0" + month : month}. {day < 10 ? "0" + day : day}
    </time>
  );
}

DateDescription.displayName = "DateDescription";

interface LikeCountSectionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  likeCount: number;
  isClicked: boolean;
  size?: number;
}

export function LikeCountSection({
  likeCount,
  isClicked,
  size = 16,
  ...props
}: LikeCountSectionProps) {
  return (
    <section
      className={`flex items-center gap-1 text-sm font-normal leading-4 text-text-disabled`}
    >
      <button type="button" {...props}>
        <LikeButtonColored size={size} isClicked={isClicked} />
      </button>
      <span className="mb-0.5 flex h-4 items-center">
        {likeCount > 9999 ? "9999+" : likeCount}
      </span>
    </section>
  );
}

LikeCountSection.displayName = "LikeCountSection";
