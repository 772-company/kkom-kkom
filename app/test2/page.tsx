"use client";

import ProfileInput from "@/components/profile-input/profile-input";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";

interface profileImage {
  preview: string;
  image: File;
}
export default function DropdownTestPage() {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useForm<profileImage>({ mode: "onChange" });

  const preview = watch("preview");

  const handleClickProfileInput = () => {
    URL.revokeObjectURL(preview);
    setValue("preview", "");
  };

  const handleChangeProfileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const preview = URL.createObjectURL(e.target.files[0]);
        setValue("image", e.target.files[0]);
        setValue("preview", preview);
      }
    }
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, []);

  return (
    <>
      <ProfileInput
        type="myProfile"
        image=""
        previewImage={preview}
        onClick={handleClickProfileInput}
        onChange={handleChangeProfileInput}
      />
    </>
  );
}
