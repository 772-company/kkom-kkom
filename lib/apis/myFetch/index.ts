import { clientFetch } from "./clientFetch";
import { serverFetch } from "./serverFetch";

export interface MyFetchOptions extends RequestInit {
  withCredentials?: boolean;
}

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
): Promise<T | Response> {
  if (typeof window !== "undefined") {
    const data = await clientFetch(input, init);
    if (data.status === 204) {
      //NOTE - no content 일 때
      return data;
    }
    return await data.json();
  } else {
    const data = await serverFetch(input, init);
    return await data.json();
  }
}

export interface ResponseError extends Error {
  response?: Response;
}

export function responseError(res: Response) {
  let newMessage = "알 수 없는 에러가 발생했습니다!";
  switch (res.status) {
    case 401: {
      newMessage = "다시 로그인해주세요!";
      break;
    }
    case 403: {
      newMessage = "권한이 없습니다!";
      break;
    }
    case 404: {
      newMessage = "잘못된 요청입니다!";
      break;
    }
    case 500: {
      newMessage = "서버 오류입니다!";
      break;
    }
  }
  // Error(message)를 만듭니다.
  const error: ResponseError = new Error(newMessage);
  error.response = res;
  return error;
}
