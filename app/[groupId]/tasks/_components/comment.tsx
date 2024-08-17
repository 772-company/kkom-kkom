import Popover from "@/components/popover/popover";
import ProfileIcon from "@/components/profile-Icon/profile-icon";
import { GetCommentResponse } from "@/lib/apis/comment/type";
import Kebab from "@/public/icons/kebab-small.svg";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import React from "react";

const Comment = (commentData: GetCommentResponse) => {
  return (
    <div className="flex min-h-[98px] w-full flex-col gap-4 border-b border-border-primary">
      <div className="mb-3">
        <div className="flex justify-between">
          <p className="max-w-[371px] text-sm font-normal text-text-primary">
            {commentData.content}
          </p>
          <Popover
            content={[{ text: "취소" }, { text: "수정하기" }]}
            triggerWidth={16}
            triggerHeight={16}
            triggerSvg={Kebab}
            triggerImageAlt="케밥"
            className="h-4 w-4"
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProfileIcon
              image={commentData.user.image}
              type="myProfile"
              width={32}
              height={32}
            />
            <p className="text-sm font-medium text-text-primary">
              {commentData.user.nickname}
            </p>
          </div>
          <p className="text-sm font-normal text-text-secondary">
            {convertDiffDateFromNow(new Date(commentData.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
