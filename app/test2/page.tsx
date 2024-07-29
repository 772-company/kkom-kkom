"use client";

import ProfileInput from "@/components/profile-input/profile-input";
import { useEffect, useState } from "react";

export default function DropdownTestPage() {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // server에 업로드할 파일
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImage);
    };
  }, []);

  return (
    <>
      <ProfileInput
        type="myProfile"
        image=""
        previewImage={previewImage}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            const preview = URL.createObjectURL(file);
            setImage(file);
            setPreviewImage(preview);
          }
        }}
      />
    </>
  );
}
