import { myFetch } from "../myFetch";
import { PostTeamIdImagesUploadResponse } from "../type";

export async function uploadImage(
  image: File,
): Promise<PostTeamIdImagesUploadResponse> {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await myFetch<PostTeamIdImagesUploadResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/images/upload`,
      {
        method: "POST",
        body: formData,
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}
