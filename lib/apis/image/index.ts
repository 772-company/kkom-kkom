import instance from "../myFetch/instance";
import { PostImagesUploadResponse } from "../type";

export default async function uploadImage(
  image: File,
): Promise<PostImagesUploadResponse> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await instance<PostImagesUploadResponse>("/images/upload", {
    method: "POST",
    body: formData,
    withCredentials: true,
  });
  return response;
}
