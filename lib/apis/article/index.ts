import { instance } from "../myFetch/instance";
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
  data: { image: string; title: string; content: string };
}

export async function postArticles({ data }: PostArticlesRequest) {
  try {
    const response = await instance<PostArticlesResponse>(`/articles`, {
      method: "POST",
      body: JSON.stringify(data),
      withCredentials: true,
    });
    return response;
  } catch (e) {
    throw e;
  }
}

interface GetArticlesRequest {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: "like" | "recent";
}

export async function getArticles({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: GetArticlesRequest) {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
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
  } catch (e) {
    throw e;
  }
}

interface GetArticlesArticleIdRequest {
  articleId: number;
}

export async function getArticlesArticleId({
  articleId,
}: GetArticlesArticleIdRequest) {
  try {
    const response = await instance<GetArticlesArticleIdResponse>(
      `/articles/${articleId}`,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}

interface PatchArticlesArticleIdRequest {
  data: { image: string; title: string; content: string };
  articleId: number;
}

export async function patchArticlesArticleId({
  data,
  articleId,
}: PatchArticlesArticleIdRequest) {
  try {
    const response = await instance<PatchArticlesArticleIdResponse>(
      `/articles/${articleId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}

interface DeleteArticlesArticleIdRequest {
  articleId: number;
}

export async function deleteArticlesArticleId({
  articleId,
}: DeleteArticlesArticleIdRequest) {
  try {
    const response = await instance<DeleteArticlesArticleIdResponse>(
      `/articles/${articleId}`,
      {
        method: "DELETE",
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}

interface PostArticlesArticleIdLikeRequest {
  articleId: number;
}

export async function postArticlesArticleIdLike({
  articleId,
}: PostArticlesArticleIdLikeRequest) {
  try {
    const response = await instance<PostArticlesArticleIdLikeResponse>(
      `/articles/${articleId}/like`,
      {
        method: "POST",
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}

interface DeleteArticlesArticleIdLikeRequest {
  articleId: number;
}

export async function deleteArticlesArticleIdLike({
  articleId,
}: DeleteArticlesArticleIdLikeRequest) {
  try {
    const response = await instance<DeleteArticlesArticleIdLikeResponse>(
      `/articles/${articleId}/like`,
      {
        method: "DELETE",
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}
