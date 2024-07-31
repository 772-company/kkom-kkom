// import type { Metadata } from "next";

type Props = {
  params: { boardId: string };
};

// TODO - 메타데이터 동적 생성
// export async function generateMetadata({
//   params: { boardId },
// }: Props): Promise<Metadata> {
//   const product = await fetch(`https://.../${boardId}`).then((res) =>
//     res.json(),
//   );

//   return {
//     title: product.title,
//   };
// }

export default function Page({ params: { boardId } }: Props) {
  return <div></div>;
}
