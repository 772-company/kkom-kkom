import instance from "../myFetch/instance";
import { PostTeamIdImagesUploadResponse } from "../type";

export default async function uploadImage(
  image: File,
): Promise<PostTeamIdImagesUploadResponse> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await instance<PostTeamIdImagesUploadResponse>(
    "/images/upload",
    {
      method: "POST",
      body: formData,
      withCredentials: true,
    },
  );
  return response;
}
