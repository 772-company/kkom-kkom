import instance from "../myFetch/instance";
import {
  DeleteArticlesArticleIdLikeResponse,
  DeleteArticlesArticleIdResponse,
  GetArticlesArticleIdResponse,
  GetArticlesResponse,
  PatchArticlesArticleIdResponse,
  PostArticlesArticleIdLikeResponse,
  PostArticlesResponse,
} from "../type";

interface PostArticlesRequest {
  image: string;
  title: string;
  content: string;
}

export async function postArticles({
  image,
  title,
  content,
}: PostArticlesRequest) {
  const response = await instance<PostArticlesResponse>("/articles", {
    method: "POST",
    body: JSON.stringify({ image, title, content }),
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
}

interface GetArticlesRequest {
  page?: string;
  keyword?: string;
  orderBy?: "like" | "recent";
}

export async function getArticles({
  page = "1",
  keyword = "",
  orderBy = "recent",
}: GetArticlesRequest) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(10),
    keyword,
    orderBy,
  });
  const response = await instance<GetArticlesResponse>(
    `/articles?${params.toString()}`,
    {
      withCredentials: true,
    },
  );
  return response;
}

interface GetArticlesArticleIdRequest {
  articleId: number;
}

export async function getArticlesArticleId({
  articleId,
}: GetArticlesArticleIdRequest) {
  const response = await instance<GetArticlesArticleIdResponse>(
    `/articles/${articleId}`,
    {
      withCredentials: true,
    },
  );
  return response;
}

interface PatchArticlesArticleIdRequest {
  image: string;
  title: string;
  content: string;
  articleId: number;
}

export async function patchArticlesArticleId({
  image,
  title,
  content,
  articleId,
}: PatchArticlesArticleIdRequest) {
  const response = await instance<PatchArticlesArticleIdResponse>(
    `/articles/${articleId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ image, title, content }),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
  return response;
}

interface DeleteArticlesArticleIdRequest {
  articleId: number;
}

export async function deleteArticlesArticleId({
  articleId,
}: DeleteArticlesArticleIdRequest) {
  const response = await instance<DeleteArticlesArticleIdResponse>(
    `/articles/${articleId}`,
    {
      method: "DELETE",
      withCredentials: true,
    },
  );
  return response;
}

interface PostArticlesArticleIdLikeRequest {
  articleId: number;
}

export async function postArticlesArticleIdLike({
  articleId,
}: PostArticlesArticleIdLikeRequest) {
  const response = await instance<PostArticlesArticleIdLikeResponse>(
    `/articles/${articleId}/like`,
    {
      method: "POST",
      withCredentials: true,
    },
  );
  return response;
}

interface DeleteArticlesArticleIdLikeRequest {
  articleId: number;
}

export async function deleteArticlesArticleIdLike({
  articleId,
}: DeleteArticlesArticleIdLikeRequest) {
  const response = await instance<DeleteArticlesArticleIdLikeResponse>(
    `/articles/${articleId}/like`,
    {
      method: "DELETE",
      withCredentials: true,
    },
  );
  return response;
}
