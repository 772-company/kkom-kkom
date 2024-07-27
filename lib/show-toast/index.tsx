import { Id, Slide, ToastContent, ToastOptions, toast } from "react-toastify";

export const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

/**
 * 토스트를 띄웁니다. type에 따라 색상이 변경됩니다.
 * 함수 형태로 사용합니다.
 * 
 * @author 이승현
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 * @example
 *  <button onClick={() => showToast("warning", <p>토스트</p>)}>
          warning toast 열기
        </button>
        <button onClick={() => showToast("default", <p>토스트</p>)}>
          default toast 열기
        </button>
        <button onClick={() => showToast("info", <p>토스트</p>)}>
          info toast 열기
        </button>
        <button onClick={() => showToast("success", <p>토스트</p>)}>
          success toast 열기
        </button>
        <button onClick={() => showToast("error", <p>토스트</p>)}>
          error toast 열기
        </button>
 */
export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {},
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
