import React, { ChangeEvent, useState } from "react";

import Button from "./button";

type CommentInputProps = React.HtmlHTMLAttributes<HTMLInputElement>;
const Commentinput = () => {
  const [value, setValue] = useState<string>("");
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={handleChangeInput}
        placeholder="댓글을 달아주세요"
        className="bg-b h-[24px] w-full bg-background-secondary text-sm text-text-default text-text-primary placeholder:font-normal"
      />
      <Button type="submit" disable={value.length === 0 ? true : false} />
    </div>
  );
};

export default Commentinput;
