"use client";

// import LinkWithProgress from "@/components/link-with-progress";
import { GetArticlesResponse } from "@/lib/apis/type";
import Image from "next/image";

import Card from "../../../_components/card";

interface ArticleCardProps {
  article: GetArticlesResponse["list"][0];
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // const deleteArticlesMutation = useDeleteArticleMutation();
  // const patchArticlesMutation = usePatchArticleMutation();

  // const handleDelete = useCallback(
  //   (id: number) => {
  //     deleteArticlesMutation.mutate(id);
  //   },
  //   [deleteArticlesMutation],
  // );

  // const editOverlay = (
  //   articleId: number,
  //   image: string,
  //   title: string,
  //   content: string,
  // ) =>
  //   useCustomOverlay(({ close }) => (
  //     <Modal close={close} closeOnFocusOut={false}>
  //       <Modal.HeaderWithClose className="fixed right-7 top-7" />
  //       <EditArticleModal
  //         close={close}
  //         articleId={articleId}
  //         content={content}
  //         image={image}
  //         title={title}
  //       />
  //     </Modal>
  //   ));
  return (
    // <LinkWithProgress href={`/boards/${article.id}`}>
    <Card
      key={article.id}
      className="group/card flex p-4 py-6 duration-300 md:px-8"
    >
      {article.image && (
        <div className="relative h-24 w-24 overflow-hidden md:h-32 md:w-32">
          <Image
            fill
            src={article.image}
            alt="thumbnail"
            sizes="(min-width: 744px) 128px, 96px"
          />
        </div>
      )}
      <div className="ml-4 flex flex-1 flex-col justify-between text-sm font-medium text-text-secondary md:text-[18px]">
        <section className="flex items-center justify-between">
          <span className="inline hover:underline">{article.title}</span>
          {/* <Card.KebabButton
                    onDelete={() => handleDelete(article.id)}
                    onPatch={
                      editOverlay(
                        article.id,
                        article.image,
                        article.title,
                        article.content,
                      ).open
                    }
                  /> */}
        </section>
        <section className="flex items-center justify-between">
          <div className="flex items-center">
            <Card.Profile name={article.writer.nickname} className="mr-4" />
            <Card.DateDescription
              date={article.createdAt}
              className="border-l border-l-background-tertiary pl-4"
            />
          </div>
          <Card.LikeDescription
            likeCount={article.likeCount}
            isClicked={true}
          />
        </section>
      </div>
    </Card>
    // </LinkWithProgress>
  );
}
