import {
  deleteArticlesArticleId,
  deleteArticlesArticleIdLike,
  patchArticlesArticleId,
  postArticles,
  postArticlesArticleIdLike,
} from "@/lib/apis/article";
import {
  deleteCommentsCommentId,
  patchCommentsCommentId,
  postArticlesArticleIdComments,
} from "@/lib/apis/article-comment";
import { uploadImage } from "@/lib/apis/image";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import {
  GetArticlesArticleIdCommentsResponse,
  GetArticlesArticleIdResponse,
} from "@/lib/apis/type";
import { showToast } from "@/lib/show-toast";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { article } from "../boards/mock";

export function useUploadArticleMutation() {
  return useMutation({
    mutationFn: (data: { image: string; title: string; content: string }) =>
      postArticles({
        image: data.image,
        title: data.title,
        content: data.content,
      }),
    onMutate: () => {
      showToast("loading", "게시글을 등록 중입니다.", {
        toastId: "uploadArticle",
      });
      close();
    },
    onSuccess: () => {
      toast.update("uploadArticle", {
        render: "게시글이 성공적으로 등록되었습니다",
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error(error);
      toast.update("uploadArticle", {
        render: "게시글 등록에 실패했습니다.",
        type: "error",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
  });
}

export function useDeleteArticleMutation() {
  return useMutation({
    mutationFn: (articleId: number) => deleteArticlesArticleId({ articleId }),
    onMutate: () => {
      showToast("loading", "게시글을 삭제 중입니다.", {
        toastId: "deleteArticle",
      });
    },
    onSuccess: () => {
      toast.update("deleteArticle", {
        render: "게시글이 성공적으로 삭제되었습니다",
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error(error);
      toast.update("deleteArticle", {
        render: error.message,
        type: "error",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
  });
}

export function usePatchArticleMutation() {
  return useMutation({
    mutationFn: ({
      articleId,
      image,
      title,
      content,
    }: {
      articleId: number;
      image: string;
      title: string;
      content: string;
    }) =>
      patchArticlesArticleId({
        articleId,
        image,
        title,
        content,
      }),
    onMutate: () => {
      showToast("loading", "게시글을 수정 중입니다.", {
        toastId: "patchArticle",
      });
    },
    onSuccess: () => {
      toast.update("patchArticle", {
        render: "게시글이 성공적으로 수정되었습니다",
        type: "success",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error(error);
      toast.update("patchArticle", {
        render: error.message,
        type: "error",
        isLoading: false,
        hideProgressBar: false,
        autoClose: 1000,
      });
    },
  });
}

export function useUploadImageMutation() {
  return useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof ResponseError) {
        showToast("error", error.message);
      }
      showToast("error", "이미지 업로드에 실패했습니다.");
      throw error;
    },
  });
}

interface PostCommentsMutation {
  articleId: number;
  content: string;
  image: string | null;
  nickname: string;
  id: number;
}

export function usePostCommentsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      content,
      id,
      image,
      nickname,
    }: PostCommentsMutation) =>
      postArticlesArticleIdComments({
        articleId,
        data: { content },
      }),
    onMutate: async ({ articleId, content, id, image, nickname }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", { articleId }],
      });

      const previousComments = queryClient.getQueryData<
        InfiniteData<GetArticlesArticleIdCommentsResponse>
      >(["comments", { articleId }]);

      if (previousComments) {
        queryClient.setQueryData<
          InfiniteData<
            GetArticlesArticleIdCommentsResponse,
            GetArticlesArticleIdCommentsResponse["nextCursor"]
          >,
          [string, { articleId: number }],
          InfiniteData<
            GetArticlesArticleIdCommentsResponse,
            GetArticlesArticleIdCommentsResponse["nextCursor"]
          >
        >(
          ["comments", { articleId }],
          (
            input:
              | InfiniteData<
                  GetArticlesArticleIdCommentsResponse,
                  GetArticlesArticleIdCommentsResponse["nextCursor"]
                >
              | undefined,
          ) => {
            if (!input) {
              return {
                pages: [
                  {
                    nextCursor: 0,
                    list: [
                      {
                        writer: {
                          image,
                          nickname,
                          id,
                        },
                        updatedAt: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                        content,
                        id: -1,
                      },
                    ],
                  },
                ],
                pageParams: [0],
              };
            }
            return {
              pages: [
                {
                  nextCursor: 0,
                  list: [
                    {
                      writer: {
                        image,
                        nickname,
                        id,
                      },
                      updatedAt: new Date().toISOString(),
                      createdAt: new Date().toISOString(),
                      content,
                      id: -1,
                    },
                    ...input.pages[0].list,
                  ],
                },
                ...input.pages,
              ],
              pageParams: input.pageParams,
            };
          },
        );
      }
      return { previousComments };
    },
    onError: (error, variables, context) => {
      showToast("error", "댓글 등록에 실패했습니다.");
      if (context?.previousComments) {
        queryClient.setQueryData<
          InfiniteData<GetArticlesArticleIdCommentsResponse>
        >(
          ["comments", { articleId: variables.articleId }],
          context.previousComments,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { articleId: variables.articleId }],
      });
    },
  });
}

interface DeleteCommentsMutation {
  commentId: number;
  articleId: number;
}

export function useDeleteCommentsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, articleId }: DeleteCommentsMutation) =>
      deleteCommentsCommentId({
        commentId,
      }),
    onMutate: async ({ articleId, commentId }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", { articleId }],
      });

      const previousComments = queryClient.getQueryData<
        InfiniteData<GetArticlesArticleIdCommentsResponse>
      >(["comments", { articleId }]);

      queryClient.setQueryData<
        InfiniteData<
          GetArticlesArticleIdCommentsResponse,
          GetArticlesArticleIdCommentsResponse["nextCursor"]
        >,
        [string, { articleId: number }],
        InfiniteData<
          GetArticlesArticleIdCommentsResponse,
          GetArticlesArticleIdCommentsResponse["nextCursor"]
        >
      >(["comments", { articleId }], (input) => {
        if (!input) {
          return input;
        } else {
          return {
            pages: input.pages.map((page) => ({
              nextCursor: page.nextCursor,
              list: page.list.filter((comment) => comment.id !== commentId),
            })),
            pageParams: input.pageParams,
          };
        }
      });
      return { previousComments };
    },
    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<
          InfiniteData<GetArticlesArticleIdCommentsResponse>
        >(
          ["comments", { articleId: variables.articleId }],
          context.previousComments,
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { articleId: variables.articleId }],
      });
    },
  });
}

interface PatchCommentsMutation {
  commentId: number;
  data: { content: string };
  articleId: number;
}

export function usePatchCommentsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, data, articleId }: PatchCommentsMutation) =>
      patchCommentsCommentId({ data, commentId }),
    onMutate: async ({ articleId, data: { content }, commentId }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", { articleId }],
      });

      const previousComments = queryClient.getQueryData<
        InfiniteData<GetArticlesArticleIdCommentsResponse>
      >(["comments", { articleId }]);

      queryClient.setQueryData<
        InfiniteData<
          GetArticlesArticleIdCommentsResponse,
          GetArticlesArticleIdCommentsResponse["nextCursor"]
        >,
        [string, { articleId: number }],
        InfiniteData<
          GetArticlesArticleIdCommentsResponse,
          GetArticlesArticleIdCommentsResponse["nextCursor"]
        >
      >(["comments", { articleId }], (input) => {
        if (!input) {
          return input;
        } else {
          return {
            pages: input.pages.map((page) => ({
              nextCursor: page.nextCursor,
              list: page.list.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    updatedAt: new Date().toISOString(),
                    content,
                  };
                } else {
                  return comment;
                }
              }),
            })),
            pageParams: input.pageParams,
          };
        }
      });
      return { previousComments };
    },
    onError: (error, { articleId }, context) => {
      showToast("error", "댓글 수정에 실패했습니다.");
      if (context?.previousComments) {
        queryClient.setQueryData<
          InfiniteData<GetArticlesArticleIdCommentsResponse>
        >(["comments", { articleId }], context.previousComments);
      }
    },
    onSettled: (data, error, { articleId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", { articleId }],
      });
    },
  });
}

interface HandleArticleLikeMutationProps {
  articleId: number;
  isLiked: boolean;
}

export function useHandleArticleLikeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ articleId, isLiked }: HandleArticleLikeMutationProps) => {
      return isLiked
        ? deleteArticlesArticleIdLike({ articleId })
        : postArticlesArticleIdLike({ articleId });
    },
    onMutate: async ({ articleId, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: ["article", { articleId }],
      });
      const previousArticle =
        queryClient.getQueryData<GetArticlesArticleIdResponse>([
          "article",
          { articleId },
        ]);
      queryClient.setQueryData<
        GetArticlesArticleIdResponse,
        [string, { articleId: number }],
        GetArticlesArticleIdResponse
      >(["article", { articleId }], (input) =>
        input
          ? {
              ...input,
              isLiked: isLiked === false,
              likeCount:
                isLiked === false ? input.likeCount + 1 : input.likeCount - 1,
            }
          : input,
      );
      return { previousArticle };
    },
    onError: (error, { articleId }, context) => {
      if (context?.previousArticle) {
        queryClient.setQueryData<GetArticlesArticleIdResponse>(
          ["article", { articleId }],
          context.previousArticle,
        );
      }
    },
    onSettled: (data, error, { articleId }) => {
      queryClient.invalidateQueries({
        queryKey: ["article", { articleId }],
      });
    },
  });
}
