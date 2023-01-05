# 원티드 프리온보딩 프론트엔드 챌린지 사전과제

## 📗 Assignment 1 - Login / SignUp

### 💡 `/auth` : 로그인 Form
<img width="1624" alt="스크린샷 2023-01-04 오후 3 02 59" src="https://user-images.githubusercontent.com/53461370/210493803-dc363861-31bf-44da-9350-ea721e3ac354.png">

### 💡 `/sign` : 회원가입 Form
<img width="1624" alt="스크린샷 2023-01-04 오후 3 02 48" src="https://user-images.githubusercontent.com/53461370/210493786-de9f6286-8e87-44b9-a279-bc7912bee06f.png">

```
1. React-Hook-Form을 이용하여 이메일과 비밀번호의 유효성 검사를 진행합니다.

2. useForm의 formState.isValid를 사용하여, 이메일과 비밀번호가 모두 입력되어 있고, 
   조건을 만족해야 제출 버튼이 활성화 되도록 한다.
   
3. 조건을 만족하지 못할 시 메세지를 표시하여 유저에게 알려준다.

4. 로그인 성공 시, 로컬 스토리지에 Token값을 저장한다.
```
### 📷 시연영상

https://user-images.githubusercontent.com/53461370/210496618-7fbc0225-1ec3-4e02-8faf-7bb2473e6492.mov



## 📗 Assignment 2 - Todo List
### 💡 `/todo` : todo 목록 Form
<img width="1624" alt="스크린샷 2023-01-04 오후 3 31 39" src="https://user-images.githubusercontent.com/53461370/210497116-1651b57e-e496-4a06-a66f-26a83600ec27.png">

### 💡 `/todo/:todoId` : todo 목록 및 내용 Form
<img width="1624" alt="스크린샷 2023-01-04 오후 3 32 58" src="https://user-images.githubusercontent.com/53461370/210497272-9a0e4ffd-2996-4227-b33f-8ef53e30d288.png">

```
1. 목록 / 상세 영역으로 나누어 구현.

2. React-Hook-Form과 Recoil을 이용하여 새로운 Todo 등록하고 목록에 표시.

3. 각 항목 클릭시, 클릭한 항목의 상세내용을 볼 수 있음.

4. 상세페이지에서 수정 버튼 클릭 시 수정모드 활성화.

5. 수정모드 활성화가 되어있는상태에서 수정버튼 한번더 클릭 시, 변경사항 취소.
   저장 버튼 누르면 변경사항 적용.

5. 상세페이지에서 삭제 버튼 클릭 시 해당 항목 삭제.
```

### 📷 시연영상

https://user-images.githubusercontent.com/53461370/210498835-25a4b83c-48ad-4475-a173-c7d291c85a40.mov


## ✍️ 실행 방법

[wanted-pre-onboarding-challenge-fe-1-api](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)<br/>
서버와 클라이언트 모두 아래의 명령어로 실행<br/>
localhost환경에서 서버는 port번호 8080, 클라이언트는 port번호 3000을 사용<br/>
```
npm install && npm run start
```

### ✍️ 구현과정
✔︎ [사전과제 구현과정 velog](https://velog.io/@tinubee/%EC%9B%90%ED%8B%B0%EB%93%9C-%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%82%AC%EC%A0%84%EA%B3%BC%EC%A0%9C)

