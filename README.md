# 📌 kkom-kkom

<img src="https://github.com/user-attachments/assets/e67428c0-b96d-49aa-ab1c-b93e1983f982">

## 🔗 배포 링크 : [kkom-kkom](https://kkom-kkom.vercel.app/)

## ✨프로젝트 소개

- **팀 기반 일정 관리**: 팀을 생성하고 팀원들을 초대하여, 함께 일정을 생성하고 관리할 수 있는 협업 툴을 제공합니다. 팀원들과 협력하여 할 일을 설정하고, 매일, 주간, 월간 주기로 반복되는 일정도 간편하게 관리할 수 있습니다.
- **실시간 진행 상황 확인**: 오늘 해야 할 일과 진행 상황을 차트를 통해 한눈에 확인할 수 있습니다. 할 일의 완료 여부를 체크하며, 남은 작업량을 쉽게 파악할 수 있습니다.
- **투명한 일정 공유**: 일정의 상세 내용과 댓글 기능을 통해 팀원 모두가 투명하게 일정을 공유할 수 있습니다. 모든 구성원이 일정을 명확하게 이해하고, 필요한 사항을 논의할 수 있습니다.
- **자유게시판**: 팀별로만 사용하는 기능 외에도, 모든 사용자가 참여할 수 있는 자유게시판을 통해 다양한 의견을 나눌 수 있습니다.

<br/>

## 🌈 772-Company 팀원 소개

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
            </th>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/ldkstellar">이동규</a>
            </th>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/codefug">이승현</a>
            </th>
            <th style="vertical-align: top; text-align: center; padding: 10px;">
                <a href="https://github.com/hyunow">정지현</a>
            </th>
        </tr>
    </tbody>
</table>

### 🐰 김서영

- 소셜 로그인 기능
- 로그인, 회원가입, 로그아웃 기능
- 사용자 정보 수정 기능
- 테마 기능
- next.js의 미들웨어를 통해 로그인 상태에 따른 페이지 접근 제한
- 공통 input 컴포넌트
- 컴파운트 패턴을 적용한 드롭다운 컴포넌트
- 헤더, 모바일 사이드바, 랜딩페이지

### 🦨 이동규

- 공통 프로필 아이콘 및 input
- 할 일 추가 수정 및 삭제 기능
- 댓글 수정 및 삭제 기능

### 🦔 이승현

- 게시글 관련 기능 ( CRUD, 페이지네이션, 낙관적 업데이트 )
- 게시글 댓글 관련 기능 ( CRUD, 무한스크롤, 낙관적 업데이트 )
- 오버레이를 위한 overlay custom hook
- interceptor, base_url등 axios의 기능을 fetch에 더한 myFetch 함수를 구현
- 버튼 공통 컴포넌트
- 마이 히스토리 페이지
- 프로젝트 세팅 ( CI/CD 등 )

### 🐹 정지현

- 공통 버튼 컴포넌트
- 공통 팝오버 컴포넌트
- 팀 생성, 수정, 삭제 기능
- 할 일 목록 생성, 수정, 삭제 기능
- 할 일 목록 드래그 앤 드롭 기능
- 멤버 삭제하기, 팀 탈퇴하기 기능
- 오늘의 진행 상황, 오늘의 꼼꼼이 차트
- 멤버 초대, 팀 참여 기능

<br/>

## 🗓️ 개발 기간

> 2023.07.26 ~ 2024.08.28 (4주)

<br/>

## 🛠️ 기술 스택

### Framework

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">

- Next.js는 SSR과 SSG 기능을 기본 제공하여 SEO에 강점이 있습니다. 최신 App Router 기능을 도입해 페이지와 레이아웃 구조를 유연하게 관리하고, 서버 컴포넌트와 클라이언트 컴포넌트를 구분해 성능을 최적화했습니다. 빠른 페이지 로딩 속도와 향상된 사용자 경험을 제공하고자 Next.js를 선택했습니다.

### Language

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

- TypeScript를 사용하면 코드 작성 중 타입을 명시해 버그를 사전에 방지할 수 있으며, 코드의 가독성과 유지보수성을 높일 수 있습니다. 협업 시 컴파일 단계에서 오류를 발견할 수 있어, 개발 생산성을 크게 향상시킬 수 있는 장점이 있습니다. 타입 정의를 통해 더욱 견고한 서비스를 개발하고자 TypeScript를 도입했습니다.

## Style

<img alt="Tailwind CSS" src ="https://img.shields.io/badge/Tailwind_CSS-06B6D4.svg?&style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img src ="https://img.shields.io/badge/framermotion-666666?style=for-the-badge&logoColor=white"/> <img alt="storybook" src ="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"/>

- Tailwind CSS : utility-first 방식의 CSS 프레임워크로, 클래스 기반의 빠르고 직관적인 스타일링이 가능합니다. 별도의 CSS 파일을 작성할 필요 없이 컴포넌트 안에서 스타일을 정의할 수 있어 개발 속도를 높이고, 디자인의 일관성을 유지할 수 있습니다. 반복적인 CSS 작성 시간을 줄이고 커스터마이징을 쉽게 하기 위해 Tailwind CSS를 채택했습니다.
- framer motion : 러닝커브가 높지 않으면서도 안정성이 있는 라이브러리 중에 하나입니다. 사용자 인터페이스에 생동감을 더할 수 있었습니다.
- storybook: 개발 중 발생할 수 있는 UI 오류를 사전에 방지하고, 일관된 UI 컴포넌트를 관리하기 위해 Storybook을 도입했습니다.

### Library

<img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" /> <img src="https://img.shields.io/badge/react--hook--form-663399?style=for-the-badge&logo=react&logoColor=white"> <img src ="https://img.shields.io/badge/zustand-EE4C2C?style=for-the-badge&"/> <img src="https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white"/> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

- Tanstack Query : TanStack Query는 서버 상태 관리에 최적화된 라이브러리로, 데이터 패칭과 캐싱, 동기화, 업데이트를 손쉽게 처리할 수 있습니다. 복잡한 비동기 로직을 선언적으로 간결하게 작성하고, 클라이언트와 서버 상태를 분리해 코드의 복잡성을 줄이기 위해 TanStack Query를 도입했습니다.
- react-hook-form : 이번 프로젝트에서는 form을 사용하는 부분이 굉장히 많았는데요. react-hook-form은 비제어 컴포넌트 관리나 유효성 검사 등 다양한 기능을 손쉽게 할 수 있는 라이브러리로 npm 기준 form중에서 가장 유명한 라이브러리이기에 안정성이 보장됩니다.
- Zustand : Zustand는 심플하고 가벼운 상태 관리 라이브러리로, 작은 규모의 애플리케이션 상태 관리에 적합합니다. 복잡한 설정이 필요 없으며, 빠르고 직관적인 상태 관리를 위해 Zustand를 채택했습니다.
- pnpm : pnpm은 빠르고 효율적인 패키지 매니저로, 모듈 설치 속도가 빠르고, 중복된 패키지를 효율적으로 관리해 디스크 공간을 절약할 수 있습니다. 패키지 관리의 효율성을 높이기 위해 pnpm을 사용했습니다.
- eslint, prettier : 코드 스타일을 자동으로 일관적으로 유지하기 위해 사용하였습니다. 대부분의 규칙은 Airbnb의 코딩 컨벤션을 따랐으나 필요에 따라 예외 규칙은 팀원들과 상의를 통해 수정하였습니다. 팀 내 코드 스타일을 통일하고 유지 보수성을 향상시킵니다.

### CI/CD

<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

- GitHub Actions: GitHub과의 긴밀한 통합으로 코드 변경 시 자동으로 테스트, 빌드, 배포를 수행할 수 있으며, YAML 파일을 통해 유연하게 CI/CD 파이프라인을 구성할 수 있습니다.
- Vercel: Next.js와 완벽하게 호환되는 서버리스 아키텍처로, Git 저장소와 연결하여 자동으로 빌드 및 배포를 할 수 있습니다. 글로벌 캐싱 네트워크와 간단한 설정으로 높은 성능과 편리성을 제공합니다. 이 두 가지를 결합하면 효율적이고 강력한 CI/CD 환경을 구축할 수 있습니다.

<br/>

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

<br/>

## 🔖 유저플로우

<img src="https://github.com/user-attachments/assets/489c43e6-9aea-4609-8d03-28a2b157f80c"> 
<img src="https://github.com/user-attachments/assets/ebcdac4f-e175-4fbc-bdb7-2c41b09a2c73">

<br/><br/>

## 💡 페이지별 기능

### 로그인

- 입력값에 대해 다음 사항들을 확인합니다.
  - 이메일 형식이 아닐 경우 에러 메세지를 보여줍니다.
  - 비밀번호는 숫자, 영문, 특수문자(!@#$%^&\*)를 포함해야 합니다.
- 모든 입력값들이 정상일 때 로그인 버튼이 활성화됩니다.
- 로그인에 실패하였을 경우 해당 입력창에 에러 메세지를 보여줍니다.
  - 비밀번호가 다른 경우
  - 존재하지 않는 이메일인 경우
- 구글, 카카오톡으로 간편 로그인할 수 있습니다.
  - 가입하지 않은 계정 경우 회원가입 후 로그인 처리가 됩니다.
- 로그인에 성공한 경우 로그인된 상태로 `/`로 이동합니다.
- 비밀번호가 기억나지 않는 경우 가입한 이메일 계정을 통해 비밀번호를 변경할 수 있습니다.
  - 입력한 이메일로 비밀번호 변경에 필요한 토큰과 함께 비밀번호 변경 페이지로 이동합니다.

| 로그인                                                                                     |
| ------------------------------------------------------------------------------------------ |
| ![로그인](https://github.com/user-attachments/assets/2e284cf6-9c5d-41fe-9998-ecb279cfa101) |

| 소셜 로그인 - 카카오                                                                                     |
| -------------------------------------------------------------------------------------------------------- |
| ![소셜 로그인 - 카카오](https://github.com/user-attachments/assets/86937e7d-9e15-44bf-9007-945e60b85a4d) |

| 소셜 로그인 - 구글                                                                                     |
| ------------------------------------------------------------------------------------------------------ |
| ![소셜 로그인 - 구글](https://github.com/user-attachments/assets/50fcc774-eaac-4198-94ff-b7d3b37e4110) |

| 비밀번호 변경                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![비밀번호 변경](https://github.com/user-attachments/assets/ec95689f-cf46-4a03-83c6-0909f2c4aba4) ![비밀번호 변경](https://github.com/user-attachments/assets/518be160-53f2-4466-a50a-f6970ecb3968) ![비밀번호 변경](https://github.com/user-attachments/assets/591dd592-aeda-42ec-89bf-e074079f1342) |

<br/>

### 로그아웃

- 로그아웃 후 `/`로 이동합니다.

| 로그아웃                                                                                     |
| -------------------------------------------------------------------------------------------- |
| ![로그아웃](https://github.com/user-attachments/assets/e2f5942e-0ee6-4b03-ba89-3f51d70f54ab) |

<br/>

### 회원가입

| 회원가입                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![회원가입-1](https://github.com/user-attachments/assets/f1c2aa2c-6044-47c4-a6ca-fbca1bc6951f) ![회원가입-2](https://github.com/user-attachments/assets/c46dec72-27fd-45b4-96a0-15768e20ae72) |

<br/>

### 마이페이지

- 프로필 이미지와 이름을 변경할 수 있습니다.
- 변경하기 버튼을 누르면 비밀번호 변경 모달창을 통해 비밀번호를 변경할 수 있습니다.
- 회원 탈퇴하기 버튼을 누르면 회원 탈퇴 모달창을 통해 탈퇴가 진행됩니다.
  - 탈퇴 후 `/`로 이동합니다.

| 사용자 정보 수정 - 이미지, 이름                                                                      |
| ---------------------------------------------------------------------------------------------------- |
| ![사용자 정보 수정](https://github.com/user-attachments/assets/b02dac2e-e8f3-43bf-b91a-c2496a8818cf) |

| 사용자 정보 수정 - 비밀번호                                                                          |
| ---------------------------------------------------------------------------------------------------- |
| ![사용자 정보 수정](https://github.com/user-attachments/assets/907a9bd1-c1f4-4b9b-a0e2-995813f20697) |

| 사용자 정보 수정 - 탈퇴                                                                  |
| ---------------------------------------------------------------------------------------- |
| ![탈퇴](https://github.com/user-attachments/assets/da8a00c1-1510-4bd8-a918-4851f07e7115) |

<br/>

### 테마

- 사용자 시스템 설정에 맞는 테마가 적용됩니다.
- 헤더에 토글 버튼을 통해 테마를 변경할 수 있습니다.

| 테마                                                                                     |
| ---------------------------------------------------------------------------------------- |
| ![테마](https://github.com/user-attachments/assets/bd5348c7-a432-4fd4-bd81-9ed6c8894815) |

<br/>

### 팀 페이지

- 팀 페이지는 관리자용과 멤버용으로 분리하여 역할에 따라 다른 권한을 부여합니다.

| 관리자용                                                                                  |
| ----------------------------------------------------------------------------------------- |
| ![image](https://github.com/user-attachments/assets/bbdc921b-a21b-41b5-8d83-28d6c58ed5f5) |

| 멤버용                                                                                    |
| ----------------------------------------------------------------------------------------- |
| ![image](https://github.com/user-attachments/assets/8ecfb839-2fc6-4337-8998-9443efcf54a4) |

### 팀 생성

- 팀 생성하기 메뉴를 통해 팀 생성하기 페이지로 이동할 수 있습니다.
- 팀 프로필 이미지와 이름을 설정할 수 있으며, 이미지는 선택값이지만 이름은 필수값입니다.
- 팀 프로필 이미지를 설정하지 않을 경우에는 기본 이미지가 적용됩니다.
- 팀 생성 후에는 해당 팀 페이지로 이동합니다.

| 팀 생성                                                                                     |
| ------------------------------------------------------------------------------------------- |
| ![addTeam](https://github.com/user-attachments/assets/a095e0fa-2787-4943-8b47-61fabb3ccd83) |

### 팀 정보 수정

- admin의 경우에는 팀 정보를 수정할 수 있습니다.
- 팀 프로필 이미지와 이름을 수정할 수 있습니다.
- 팀 수정 후에는 해당 팀 페이지로 이동합니다.

| 팀 정보 수정                                                                                 |
| -------------------------------------------------------------------------------------------- |
| ![editTeam](https://github.com/user-attachments/assets/10c7bd59-57e9-42ff-8ce2-9930d7ff8b8a) |

### 팀 삭제

- admin의 경우에는 팀을 삭제할 수 있습니다.
- 삭제 후에는 랜딩 페이지로 이동합니다.

### 할 일 목록 추가

- admin의 경우에는 할 일 목록을 추가할 수 있습니다.
- 팀 내에서 중복되는 이름의 할 일 목록을 사용할 수는 없습니다.
- 추가한 할 일 목록은 바로 팀 페이지에 반영됩니다.

| 할 일 목록 추가                                                                                 |
| ----------------------------------------------------------------------------------------------- |
| ![addTaskList](https://github.com/user-attachments/assets/4b99ca7d-78c7-44fb-a5d1-c835d1a0d20c) |

### 할 일 목록 수정

- admin과 member 모두 할 일 목록을 수정할 수 있습니다.
- 할 일 목록 옆의 케밥 버튼을 통해 할 일 목록의 이름을 수정할 수 있으며 수정한 이름은 바로 팀 페이지에 반영됩니다.
- 드래그 앤 드롭으로 할 일 목록의 순서를 수정할 수 있습니다.

| 할 일 이름 수정                                                                                  |
| ------------------------------------------------------------------------------------------------ |
| ![editTaskList](https://github.com/user-attachments/assets/b8dd7afc-26f7-4e1f-bb8f-c407c1e99560) |

| 할 일 목록 순서 수정                                                                    |
| --------------------------------------------------------------------------------------- |
| ![dnd](https://github.com/user-attachments/assets/2880a00f-d9a4-4a4a-b793-14351ca9cccf) |

### 할 일 목록 삭제

- admin과 member 모두 할 일 목록을 삭제할 수 있습니다.
- 할 일 목록 옆의 케밥 버튼을 통해 할 일 목록을 삭제할 수 있으며 삭제한 할 일 목록은 바로 팀 페이지에 반영됩니다.

| 할 일 목록 삭제 |
| --------------- |

### 리포트

- admin의 경우에는 리포트를 확인할 수 있습니다.
- 오늘의 진행 상황과 오늘의 꼼꼼이를 확인할 수 있습니다.
- 오늘의 꼼꼼이 차트에선 오늘 할 일을 가장 많이 완료한 최대 3명의 멤버를 보여줍니다.

| 완료한 일이 없을 때의 리포트                                                                     |
| ------------------------------------------------------------------------------------------------ |
| ![report-empty](https://github.com/user-attachments/assets/11a3acb6-e907-41e6-b8a5-881cf85f453b) |

| 완료한 일이 있을 때의 리포트                                                               |
| ------------------------------------------------------------------------------------------ |
| ![report](https://github.com/user-attachments/assets/06b4b6e5-17f3-4c08-953e-60588c2775ad) |

### 멤버 삭제

- admin의 경우에는 팀원을 삭제할 수 있습니다.
- 멤버 카드 옆의 케밥 버튼을 통해 팀원을 삭제할 수 있으며 삭제한 팀원은 바로 팀 페이지에서 사라집니다.

| 멤버 삭제                                                                                        |
| ------------------------------------------------------------------------------------------------ |
| ![deleteMember](https://github.com/user-attachments/assets/2d3c17f1-bdac-4d0b-9ec9-add92e50fcb3) |

### 팀 탈퇴

- member의 경우에는 팀에서 탈퇴할 수 있습니다.
- 멤버 카드 옆의 케밥 버튼을 통해 팀에서 탈퇴할 수 있으며 탈퇴한 뒤에는 랜딩 페이지로 이동합니다.

| 팀 탈퇴                                                                                      |
| -------------------------------------------------------------------------------------------- |
| ![withdraw](https://github.com/user-attachments/assets/89b5953a-03b0-4adf-a222-c80f7287a429) |

### 멤버 초대 및 팀 참여

- admin의 경우에는 새로운 멤버를 초대할 수 있습니다.
- - 새로운 멤버 초대하기 버튼을 클릭하여 토큰을 포함한 초대 링크를 복사할 수 있습니다.
- 다른 유저가 해당 링크로 접근하면 팀 참여하기 페이지로 이동하며 토큰값을 자동으로 입력됩니다.
- 팀 참여 후에는 해당 팀 페이지로 이동합니다.

| 팀 초대                                                                                    |
| ------------------------------------------------------------------------------------------ |
| ![invite](https://github.com/user-attachments/assets/476c0166-0859-40a6-80d6-6facfcdb91ce) |

| 팀 참여 |
| ------- |

![participate](https://github.com/user-attachments/assets/577d12a4-53e2-4c70-a184-095827603a05)

### 이메일 복사

- 멤버 카드를 클릭하면 나타나는 멤버 프로필 모달에서 이메일을 복사할 수 있습니다.

| 이메일 복사                                                                                   |
| --------------------------------------------------------------------------------------------- |
| ![copyEmail](https://github.com/user-attachments/assets/2518f2f6-ec28-4fe0-bb50-4d75c0b5b25e) |

### 리스트 페이지

- 팀 관리 페이지 할 일 목록을 클릭하면 해당 할 일로 이동
- 할 일 리스트 추가
- 할 일 추가 수정 및 삭제 기능
- 댓글 추가 및 삭제 기능

| 할일 리스트 만들기 |
| ------------------ |

![할일 리스트 만들기](https://github.com/user-attachments/assets/e4ddb814-9a4a-40cf-918a-048d401696c0)

| 할일 만들기 |
| ----------- |

![할일 추가](https://github.com/user-attachments/assets/7b0cb2e2-7171-4190-af8a-6bf41c11b336)

| 댓글 추가 수정 및 삭제 |
| ---------------------- |

![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/7b80d8ca-f12a-4e0b-94b7-03946caad98f)

### 자유게시판 페이지

- streaming 방식으로 렌더링하여 UX 향상
- 모든 api 요청은 텐스택 쿼리로 관리됩니다.
- 낙관적 업데이트가 적용되었습니다.

### 게시글 조회, 추가, 수정, 삭제

| 게시글 조회                                                                                     | 게시글 추가                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![게시글 조회](https://github.com/user-attachments/assets/1654ffb9-8fd6-45c7-b0ae-8ad1046d2cd7) | ![게시글 추가](https://github.com/user-attachments/assets/c8ee759e-0db2-4b31-bbdd-f46e97cf9409) |

| 게시글 수정                                                                                     | 게시글 삭제                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![게시글 수정](https://github.com/user-attachments/assets/d7cea0ca-4161-4ac0-bb9a-8600131d86f8) | ![게시글 삭제](https://github.com/user-attachments/assets/c2dec205-d5e7-4a8a-b904-9115db283d60) |

### 게시글 좋아요, 좋아요 취소

| 게시글 좋아요, 좋아요 취소                                                                                     |
| -------------------------------------------------------------------------------------------------------------- |
| ![게시글 좋아요, 좋아요 취소](https://github.com/user-attachments/assets/1f5f0b60-63bb-42e3-8729-c3485dfc4d79) |

### 댓글 조회, 추가, 수정, 삭제

- streaming + 낙관적 업데이트 + 무한 스크롤 (useInfiniteSuspenseQuery)

| 댓글 조회                                                                                     | 댓글 추가                                                                                     |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![댓글 조회](https://github.com/user-attachments/assets/14fd5327-a282-4127-bf9a-7c9f47177548) | ![댓글 추가](https://github.com/user-attachments/assets/02431c44-014b-40e6-a2eb-bae4eff22938) |

| 댓글 수정                                                                                     | 댓글 삭제                                                                                     |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![댓글 수정](https://github.com/user-attachments/assets/7f177f60-ceb9-475f-a304-7c0b8f8464ff) | ![댓글 삭제](https://github.com/user-attachments/assets/0aca2078-fc97-46bd-a285-2bb8a6a2bfce) |

## 프로젝트 후기

### 🐰 김서영

프로젝트가 한 달 동안 길게 진행되면서, 이전 프로젝트에서 아쉬웠던 부분들을 개선하여 여러 새로운 기술들을 적용해 볼 수 있는 좋은 기회였습니다. 단순히 기능 구현에 그치는 것이 아니라, 재사용성을 고려해 꼼꼼하게 작업한 덕분에 프로젝트명과 팀명처럼 '칠칠이'에서 '꼼꼼이'로 성장할 수 있었던 것 같습니다. 😚 힘든 내색하지 않고 마지막까지 긍정적이고 열정적으로 참여해 주신 팀원들 덕분에 행복하게 작업했던 거 같습니다.
백엔드의 잦은 변동에도 불구하고 묵묵히 끝까지 기능 구현을 맡아주신 동규님, 풍부한 지식을 바탕으로 새로운 기술을 적극 제안해 주신 CTO 승현님, 항상 긍정적인 태도로 팀 분위기를 밝게 만들어 주신 지현님 ! 모두 멋진 FE 개발자로 성장하실 거라고 믿어 의심치 않아요 ~ 우리 칠칠이들 너무 고생하셨습니다 ! 🌈🤍

### 🦨 이동규

이번 프로젝트를 통해서 디버깅 능력을 많이 키웠고 변경되는 ui 와 api에 대해 대응을 잘 했던 것 같습니다. 팀원들 덕분에 많이 성장하게 된 것 같습니다!

### 🦔 이승현

모든 팀원들이 처음부터 끝까지 체계적으로 하기 위해서 모두 노력해왔던 프로젝트였던 것 같습니다. tanstack query, app router, zustand 등등 현업에서 사용하는 기술들을 고도화하여 사용해본 경험은 앞으로 큰 도움이 될 것입니다. 개인적으로도 기술적으로도 많이 성장했습니다. 기억에 많이 남을 것 같아요.

추가 리팩토링이 남아있지만 이전처럼 스프린트 기간을 두진 않았기에 잠시 이별할 것 같네요. 다음에 성장한 모습으로 다시 봤으면 하는 팀이었습니다. 모두 감사했어요 😊

### 🐹 정지현

팀원들이 너무 좋아서 덕분에 배워 가는 점이 많았고 한 달동안 스트레스 받지 않고 프로젝트를 진행할 수 있었어요! 그리고 힘들 땐 순구 테라피가 가능한 최고의 팀!
