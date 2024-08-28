# 📌 kkom-kkom

<img src="https://github.com/user-attachments/assets/e67428c0-b96d-49aa-ab1c-b93e1983f982">

> 스마트한 일정 관리 서비스

## 🔗 [kkom-kkom](https://kkom-kkom.vercel.app/)

## 🌈 772-Company

<table align="center" style="border-collapse: collapse;">
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/ssseeo0">
                    <img src="https://avatars.githubusercontent.com/ssseeo0" width="100" height="100"/>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/ldkstellar">
                    <img src="https://avatars.githubusercontent.com/ldkstellar" width="100" height="100"/>
                </a>  
            </td>
            <td align="center">
                <a href="https://github.com/codefug">
                    <img src="https://avatars.githubusercontent.com/codefug" width="100" height="100"/>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/hyunow">
                    <img src="https://avatars.githubusercontent.com/hyunow" width="100" height="100"/>
                </a>  
            </td>
        </tr>
        <tr>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/ssseeo0">김서영</a>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li style="list-style-type: none;">유저 기능</li>
                    <li style="list-style-type: none;">소셜 로그인</li>
                    <li style="list-style-type: none;">테마</li>
                </ul>
            </th>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/ldkstellar">이동규</a>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li style="list-style-type: none;">테스크 페이지</li>
                    <li style="list-style-type: none;">일정 관리 기능</li>
                </ul>
            </th>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/codefug">이승현</a>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li style="list-style-type: none;">자유게시판</li>
                    <li style="line-height: 16px;">공통 오버레이<br>훅 제작</li>
                    <li style="list-style-type: none;">테스트 코드</li>
                </ul>
            </th>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/hyunow">정지현</a>
                <ul style="list-style-type: none; padding-left: 0;">
                    <li style="list-style-type: none;">팀 페이지</li>
                    <li style="list-style-type: none;">차트 제작</li>
                </ul>
            </th>
        </tr>
    </tbody>
</table>

## 🗓️ 개발 기간

> 2023.07.26 ~ 2024.08.28 (4주)

## 🛠️ 기술 스택

### Framework

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">

### Language

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

## Style

<img alt="Tailwind CSS" src ="https://img.shields.io/badge/Tailwind_CSS-06B6D4.svg?&style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img src ="https://img.shields.io/badge/framermotion-666666?style=for-the-badge&logoColor=white"/> <img alt="storybook" src ="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"/>

### Library

<img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" /> <img src="https://img.shields.io/badge/react--hook--form-663399?style=for-the-badge&logo=react&logoColor=white"> <img src ="https://img.shields.io/badge/zustand-EE4C2C?style=for-the-badge&"/> <img src="https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white"/> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

### CI/CD

<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

## 📂폴더 구조

```
📂 app
	 📂(auth)
	   📂 signup
		   📂 _components // 이 페이지 안에서만 쓰는 컴포넌트
	     📑 page.tsx
	   📂 login
	   📂 oauth
	   📂 reset-password
	   📑 layout.tsx
	 📂 (team-setting)
		 📂 addteam
		 📂 paticipate-team
		 📑 layout.tsx
	 📂[groupId]
		  📂edit
		  📂tasks
		  📑 layout.tsx
	 📂 mypage
		 📑 page.tsx
		 📑 layout.tsx
	 📂 myhistory
		 📑 page.tsx
		 📑 layout.tsx
	 📂 no-team
		 📑 page.tsx
		 📑 layout.tsx
	 📂(free-board)
	   📂 boards
		   📂[boardId]
	   📑 layout.tsx
	📑 page.tsx // 랜딩페이지
	📑 layout.tsx

📂 constants // 상수
📂 hooks // 커스텀 훅
📂 utils // 유틸 함수
📂 lib
	📂 apis
		📂article
			 📑 index.ts
📂 public // 이미지 등 리소스
	📂 icons
	📂 images
📂 components // 공통 컴포넌트
	📂 button
	📂 dropdown

📑.env.local
```

## 🔖 유저플로우

<img src="https://github.com/user-attachments/assets/489c43e6-9aea-4609-8d03-28a2b157f80c"> 
<img src="https://github.com/user-attachments/assets/ebcdac4f-e175-4fbc-bdb7-2c41b09a2c73">
