//export const REDIRECT_URL = "http://localhost:3000/";

export const KAKAO_OAUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}`;

export const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

// export const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=openid email profile`;
