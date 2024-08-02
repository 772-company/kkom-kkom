// import { SubmitHandler, useForm } from "react-hook-form";

// import { OneButtonSection } from "./components/one-button-section";
// import { useModal } from "./modal";

// interface ModalDetailedOneButtonProps {
//   title: string;
//   description: string;
//   label1: string;
//   label2: string;
//   placeholder1: string;
//   placeholder2: string;
//   handleConfirm: (value1: string, value2: string) => void;
//   buttonDescription: string;
// }

// interface ModalDetailedFormType {
//   content1: string;
//   content2: string;
// }

// /**
//  * 버튼을 하나 갖고 input이 두 개 있는 모달 컴포넌트입니다.
//  *
//  * @author 이승현
//  * @param title 모달의 제목
//  * @param description 모달의 설명
//  * @param label1 첫 번째 input의 label
//  * @param label2 두 번째 input의 label
//  * @param placeholder1 첫 번째 input의 placeholder
//  * @param placeholder2 두 번째 input의 placeholder
//  * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
//  * @param buttonDescription 버튼의 설명
//  * @returns {React.ReactElement}
//  * @example
//  * ```tsx
//  * <Modal button={<button>버튼</button>}>
//  *   <ModalDetailedOneButton
//  *     title="할 일 만들기"
//  *     description="할 일을 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
//  *     label1="할 일 제목"
//  *     label2="할 일 메모"
//  *     placeholder1="할 일 제목을 입력해주세요."
//  *     placeholder2="메모를 입력해주세요."
//  *     handleConfirm={(value1, value2) => {
//  *       console.log(value1, value2);
//  *     }}
//  *     buttonDescription="만들기"
//  *   />
//  * </Modal>
//  * ```
//  */
// export function ModalDetailedOneButton({
//   title,
//   description,
//   label1,
//   label2,
//   placeholder1,
//   placeholder2,
//   handleConfirm,
//   buttonDescription,
// }: ModalDetailedOneButtonProps) {
//   const { handleClose } = useModal();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ModalDetailedFormType>();

//   const onSubmit: SubmitHandler<ModalDetailedFormType> = (data) => {
//     handleConfirm(data.content1, data.content2);
//     handleClose();
//   };

//   return (
//     <section>
//       <header className="h-12 px-6 pt-4"></header>
//       <section className="mx-12 text-center md:mx-[52px]">
//         <h2 className="mb-4 text-base font-medium text-text-primary">
//           {title}
//         </h2>
//         <h3 className="mb-4 break-keep text-sm font-medium text-text-secondary">
//           {description}
//         </h3>
//         <form onSubmit={handleSubmit(onSubmit)} className="text-left">
//           <label htmlFor="content1" className="mt-4 block text-text-primary">
//             {label1}
//           </label>
//           <input
//             placeholder={placeholder1}
//             className="mt-2 h-11 w-full min-w-[280px] rounded-xl border border-text-default bg-background-secondary px-4 py-[13.5px] text-[14px] font-medium text-text-primary placeholder-text-default"
//             {...register("content1", { required: true })}
//           />
//           {errors.content1 && (
//             <aside className="text-center text-xs text-status-danger">
//               필수 입력 사항입니다.
//             </aside>
//           )}
//           <label
//             htmlFor="content2"
//             className="mb-2 mt-4 block text-text-primary"
//           >
//             {label2}
//           </label>
//           <textarea
//             placeholder={placeholder2}
//             rows={3}
//             className="mt-2 block h-[75px] w-full min-w-[280px] resize-none rounded-xl border border-text-default bg-background-secondary px-4 py-[13.5px] text-[14px] font-medium text-text-primary placeholder-text-default"
//             {...register("content2", { required: true })}
//           />
//           {errors.content2 && (
//             <aside className="text-center text-xs text-status-danger">
//               필수 입력 사항입니다.
//             </aside>
//           )}
//           <OneButtonSection
//             btnStyle="solid"
//             buttonDescription={buttonDescription}
//           />
//         </form>
//       </section>
//     </section>
//   );
// }
