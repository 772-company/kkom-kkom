/**
 * 임시 에러 클래스입니다. 실제 API가 완성되면 수정해야 합니다.
 * @returns
 */
class ResponseError extends Error {
  response: Response;
  constructor(message: string, res: Response) {
    // Error(message)를 만듭니다.
    super(message);
    // Error(message).response에 에러 만들 때 넣어놓은 res를 넣습니다.
    this.response = res;
  }
}

/**
 * 임시 패치입니다. 실제 API가 완성되면 수정해야 합니다.
 * @returns
 */
export async function myFetch(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const res = await fetch(input, init);
  // status가 200 ~ 299 사이가 아니거나 통신을 받아올 수 없으면 에러를 던집니다.
  if (!res.ok) {
    throw new ResponseError("에러가 발생했습니다.", res);
  }
  return res;
}

/**
 * 에러 메시지를 반환하는 함수
 *
 * @param error unknown
 * @returns
 */
export async function getErrorMessage(error: unknown, statusCode: number[]) {
  if (error instanceof ResponseError) {
    // 내가 지정해놓은 에러 코드이고 통신이 온 경우
    if (statusCode.includes(error.response.status)) {
      const data = await error.response.json();
      return data;
    }
    // 에러 코드로 지정되어 있지 않는데 통신은 온 경우
    return error.message;
  } else {
    // 기타 통신을 받아올 수 없는 경우 등등
    if (error instanceof Error) return error.message;
    return String(error);
  }
}
