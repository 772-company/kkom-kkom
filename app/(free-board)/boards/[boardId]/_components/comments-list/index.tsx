import { comments } from "../../../mock";
import CommentCard from "./_components/comment-card";

export default function CommentsList({ boardId }: { boardId: string }) {
  return (
    <>
      <h2 className="mb-4 block pt-8 text-base font-medium text-text-primary md:mb-6 md:pt-10 md:text-xl">
        댓글 목록
      </h2>
      <section className="flex flex-col gap-4">
        {comments.list.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </section>
    </>
  );
}
