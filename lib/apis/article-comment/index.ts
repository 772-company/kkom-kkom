import instance from "../myFetch/instance";
import {
  DeleteCommentsCommentIdResponse,
  GetArticlesArticleIdCommentsResponse,
  PatchCommentsCommentIdResponse,
  PostArticlesArticleIdCommentsResponse,
} from "../type";

interface PostArticlesArticleIdCommentsRequest {
  data: { content: string };
  articleId: number;
}

export async function postArticlesArticleIdComments({
  data,
  articleId,
}: PostArticlesArticleIdCommentsRequest) {
  const response = await instance<PostArticlesArticleIdCommentsResponse>(
    `/articles/${articleId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
  return response;
}

interface GetArticlesArticleIdCommentsRequest {
  articleId: number;
  cursor: number;
}

export async function getArticlesArticleIdComments({
  articleId,
  cursor,
}: GetArticlesArticleIdCommentsRequest) {
  const params = new URLSearchParams({
    limit: "10",
    cursor: String(cursor),
  });
  const response = await instance<GetArticlesArticleIdCommentsResponse>(
    `/articles/${articleId}/comments?${params.toString()}`,
    {
      withCredentials: true,
    },
  );
  return response;
}

interface PatchCommentsCommentIdRequest {
  data: { content: string };
  commentId: number;
}

export async function patchCommentsCommentId({
  data,
  commentId,
}: PatchCommentsCommentIdRequest) {
  const response = await instance<PatchCommentsCommentIdResponse>(
    `/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      withCredentials: true,
    },
  );
  return response;
}

interface DeleteCommentsCommentIdRequest {
  commentId: number;
}

export async function deleteCommentsCommentId({
  commentId,
}: DeleteCommentsCommentIdRequest) {
  const response = await instance<DeleteCommentsCommentIdResponse>(
    `/comments/${commentId}`,
    {
      method: "DELETE",
      withCredentials: true,
    },
  );
  return response;
}
