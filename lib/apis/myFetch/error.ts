export interface ResponseError extends Error {
  response?: Response;
}

const statusMessages: { [key: number]: string } = {
  401: "다시 로그인해주세요!",
  403: "권한이 없습니다!",
  404: "잘못된 요청입니다!",
  500: "서버 오류입니다!",
};

export function responseError(res: Response): ResponseError {
  // 상태 코드에 따라 메시지를 가져오고 기본 메시지를 사용
  const newMessage =
    statusMessages[res.status] || "알 수 없는 에러가 발생했습니다!";

  // Error(message)를 만듭니다.
  const error: ResponseError = new Error(newMessage);
  error.response = res;
  return error;
}
