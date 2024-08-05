// import CloseButton from "@/app/public/icons/x.svg";

// import { OneButtonSection } from "./components/one-button-section";
// import { useModal } from "./modal";

// interface PopupOneButtonProps {
//   title: string;
//   description: string;
//   buttonDescription: string;
//   handleConfirm: () => void;
// }

// /**
//  * 버튼을 하나 갖고 input이 없는 팝업 컴포넌트입니다.
//  *
//  * @author 이승현
//  * @param title 팝업의 제목
//  * @param description 팝업의 설명
//  * @param buttonDescription 버튼의 설명
//  * @param handleConfirm 확인 버튼을 눌렀을 때 실행할 함수
//  * @returns
//  * @example
//  * ```tsx
//  * <Modal button={<button>버튼</button>}>
//  *  <PopupOneButton
//  *   description="그룹에 참여할 수 있는 링크를 복사합니다."
//  *   title="멤버 초대"
//  *   handleConfirm={() => console.log("복사")}
//  *   buttonDescription="복사하기"
//  * />
//  * </Modal>
//  * ```
//  */
// export function PopupOneButton({
//   title,
//   description,
//   handleConfirm,
//   buttonDescription,
// }: PopupOneButtonProps) {
//   const { handleClose } = useModal();
//   const handleClick = () => {
//     handleConfirm();
//     handleClose();
//   };
//   return (
//     <section>
//       <header className="flex justify-end px-4 pt-4">
//         <button onClick={handleClose}>
//           <CloseButton
//             className="rounded-xl hover:scale-105"
//             width={24}
//             height={24}
//           />
//         </button>
//       </header>
//       <div className="mx-12 text-center md:mx-[52px]">
//         <h2 className="mb-2 text-base font-medium text-slate-50 md:text-text-primary">
//           {title}
//         </h2>
//         <p className="break-keep text-[14px] font-medium text-slate-400 md:mb-4 md:text-text-secondary">
//           {description}
//         </p>
//         <OneButtonSection
//           btnStyle="solid"
//           buttonDescription={buttonDescription}
//           onClick={handleClick}
//         />
//       </div>
//     </section>
//   );
// }
