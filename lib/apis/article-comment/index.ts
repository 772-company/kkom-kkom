import { instance } from "../myFetch/instance";
import {
  DeleteCommentsCommentIdResponse,
  PatchCommentsCommentIdResponse,
  PostArticlesArticleIdCommentsResponse,
} from "../type";
import { GetArticlesArticleIdCommentsResponse } from "../type/index";

interface PostArticlesArticleIdCommentsRequest {
  data: { content: string };
  articleId: number;
}

export async function postArticlesArticleIdComments({
  data,
  articleId,
}: PostArticlesArticleIdCommentsRequest) {
  try {
    const response = await instance<PostArticlesArticleIdCommentsResponse>(
      `/articles/${articleId}/comments`,
      {
        method: "POST",
        body: JSON.stringify(data),
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}

interface GetArticlesArticleIdCommentsRequest {
  articleId: number;
  limit: number;
  cursor?: number;
}

export async function getArticlesArticleIdComments({
  articleId,
  limit,
  cursor = 0,
}: GetArticlesArticleIdCommentsRequest) {
  try {
    const params = new URLSearchParams({
      limit: String(limit),
      cursor: String(cursor),
    });
    const response = await instance<GetArticlesArticleIdCommentsResponse>(
      `/articles/${articleId}/comments?${params.toString()}`,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (e) {
    throw e;
  }
}

interface PatchCommentsCommentIdRequest {
  data: { content: string };
  commentId: number;
}

export async function patchCommentsCommentId({
  data,
  commentId,
}: PatchCommentsCommentIdRequest) {
  try {
    const response = await instance<PatchCommentsCommentIdResponse>(
      `/comments/${commentId}`,
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

interface DeleteCommentsCommentIdRequest {
  commentId: number;
}

export async function deleteCommentsCommentId({
  commentId,
}: DeleteCommentsCommentIdRequest) {
  try {
    const response = await instance<DeleteCommentsCommentIdResponse>(
      `/comments/${commentId}`,
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
