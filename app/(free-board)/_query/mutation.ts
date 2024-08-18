import {
  deleteArticlesArticleId,
  patchArticlesArticleId,
  postArticles,
} from "@/lib/apis/article";
import { uploadImage } from "@/lib/apis/image";
import { ResponseError } from "@/lib/apis/myFetch/clientFetch";
import { showToast } from "@/lib/show-toast";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    onError: (error) => {
      console.error(error);
      if (error instanceof ResponseError) {
        showToast("error", error.message);
        return;
      }
      showToast("error", "이미지 업로드에 실패했습니다.");
    },
  });
}

// TODO - 댓글 등록 mutation Optimistic mutation 적용

// export function usePostCommentsMutation() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: { articleId: number; content: string }) =>
//       postArticlesArticleIdComments({
//         articleId: data.articleId,
//         data: { content: data.content },
//       }),
//     onMutate: async () => {
//       await queryClient.
//     },
//     onSuccess: () => {
//       toast.update("postComments", {
//         render: "댓글이 성공적으로 등록되었습니다",
//         type: "success",
//         isLoading: false,
//         hideProgressBar: false,
//         autoClose: 1000,
//       });
//     },
//   });
// }

// TODO - 댓글 삭제 mutation Optimistic mutation 적용

// TODO - 댓글 수정 mutation Optimistic mutation 적용

// TODO - 댓글 좋아요 mutation Optimistic mutation 적용

// TODO - 댓글 싫어요 mutation Optimistic mutation 적용

// TODO - 게시글 좋아요 mutation Optimistic mutation 적용

// TODO - 게시글 싫어요 mutation Optimistic mutation 적용

// TODO - 게시글 조회수 증가 mutation Optimistic mutation 적용
