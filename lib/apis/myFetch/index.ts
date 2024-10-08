import { clientFetch } from "./clientFetch";
import serverFetch from "./serverFetch";
import { MyFetchOptions } from "./types";

/**
 * myFetch는 서버와 클라이언트에서 사용할 수 있는 fetch 함수입니다.
 * 서버에서 사용할 때는 serverFetch를 사용하고, 클라이언트에서 사용할 때는 clientFetch를 사용합니다.
 * 사용하실 때는 fetch처럼 사용하시면 됩니다.
 * withCredentials 옵션을 사용하면 쿠키를 전송할 수 있습니다.
 * accessToken이 필요한 fetch에서 사용하시면 됩니다.
 * 내부적으로 accessToken이 만료되었을 때, refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
 *
 * @author 이승현
 * @param input
 * @param init
 * @returns Promise<T>
 * @example
 * ```ts
try {
    const response = await myFetch<PostTeamIdAuthSigninResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(data),
      },
    );

    return response;
  } catch (error) {
    throw error;
  }

에러는 사용하는 곳에서 처리해주면 됩니다.
클라이언트에서 사용할 경우 ResponseError 클래스를 사용하고 서버에서 사용할 경우 Error 클래스를 사용하면 됩니다.

클라이언트 단에서 사용 예시

try {
      const response = await login(data);
      const result = response as PostTeamIdAuthSigninResponse;

      setCookie("accessToken", result.accessToken, { maxAge: 60 * 60 });
      setCookie("refreshToken", result.refreshToken, {
        maxAge: 60 * 60 * 24 * 7,
      });

      // NOTE - 로그인 후 랜딩으로 리다이렉트를 위해 push 헤더 업데이트를 위해 refresh
      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        const response: { details: { key: { message: string } } } =
          await error.response?.json();
        if (response) {
          // NOTE - 400인 경우
          for (const [key, { message }] of Object.entries(response.details)) {
            if (message) {
              setError(key as keyof LoginInputValue, {
                type: "manual",
                message,
              });
            }
          }
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  };

서버 단에서는 ResponseError를 사용하지 않습니다.

원래 Error를 사용하시면 됩니다. myFetch 내부에서 401 404 500 등의 에러는 처리해서 message에 넣어주니

```ts
if (error instanceof Error) {
    console.log(error.message);
  }
```

이런식으로 처리해주시면 됩니다.
 */
export async function myFetch<T>(
  input: string | URL | globalThis.Request,
  init?: MyFetchOptions,
): Promise<T> {
  if (typeof window !== "undefined") {
    const response = await clientFetch(input, init);
    if (response.status === 204) {
      return response as T;
    }
    const data = await response.json();
    return data;
  }
  const response = await serverFetch(input, init);
  const data = await response.json();
  return data;
}

/**
 *
 * @author 이승현
 * @param url
 * @returns myFetch에 instance url을 추가한 함수를 반환합니다.
 * @example
 *
 * export const instance = newFetch(`${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}`);
 * // url이 추가된 myFetch 함수를 반환합니다.
 * // 사용할 때는 instance를 사용하면 됩니다.
 */
// instance를 위한 커링 함수
export const mF =
  (url: string) =>
  <T>(input: string | URL | globalThis.Request, init?: MyFetchOptions) =>
    myFetch<T>(url + input, init);
