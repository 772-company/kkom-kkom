"use client";

import { getUser } from "@/lib/apis/user";
import { useQuery } from "@tanstack/react-query";

import LinkButton from "../button/link-button";

export default function LoggedInButtonContent() {
  const { data, isSuccess } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  if (!isSuccess || !data) {
    return null;
  }
  const { memberships } = data;
  return (
    <LinkButton
      btnSize="large"
      btnStyle="gradient"
      href={
        memberships.length === 0 ? "/no-team" : `/${memberships[0].group.id}`
      }
      className="mt-[340px] w-[343px] xl:mt-[360px]"
    >
      지금 시작하기
    </LinkButton>
  );
}
