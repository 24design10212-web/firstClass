# AI_CODING_GUIDE.md

## 목적
이 문서는 `24design10212-web/firstClass` 저장소의 현재 버거킹 로그인 UI 코드를 기준으로, 이후 다른 브랜드의 로그인 UI를 만들 때 기존 HTML/CSS 작성 방식과 구조를 최대한 유지하면서 필요한 부분만 변경하기 위한 AI 코딩 가이드이다.

기준 파일:
- `King/Login.html`
- `CSS/default.css`
- `King/images/*`
- `font/*`

> 기존 코드를 전부 새로 작성하지 않는다. 먼저 현재 구조를 읽고, 새 화면에서 달라진 부분을 찾아 필요한 부분만 수정한다.

## 기준 프로젝트 구조

```text
firstClass
├─ CSS
│  └─ default.css
├─ King
│  ├─ Login.html
│  └─ images
├─ font
└─ index.html
```

| 파일/폴더 | 역할 |
|---|---|
| `King/Login.html` | 버거킹 로그인 화면의 HTML 구조와 페이지별 CSS |
| `CSS/default.css` | reset 및 기본 브라우저 스타일 초기화 |
| `King/images` | 로그인 화면의 아이콘/이미지 |
| `font` | 프로젝트에서 사용하는 폰트 파일 |
| `index.html` | 저장소의 기본 HTML 파일 |

## HTML 구조

현재 버거킹 로그인 화면은 다음 구조를 기준으로 한다.

```text
#wrap
├─ header
│  ├─ h1 로그인
│  └─ 이전 버튼
└─ main
   ├─ h2.title
   │  ├─ 인사말
   │  └─ 브랜드명
   ├─ form
   │  └─ fieldset
   │     ├─ 이메일 로그인
   │     ├─ 이메일 input
   │     ├─ 비밀번호 input
   │     ├─ 비밀번호 보기 button
   │     ├─ 자동로그인 checkbox
   │     ├─ 아이디 저장 checkbox
   │     └─ 로그인 submit button
   ├─ .login_link
   │  ├─ 아이디 찾기
   │  ├─ 비밀번호 재설정
   │  └─ 회원가입
   └─ .sns_login
      ├─ SNS 로그인 안내
      └─ .sns_list
         └─ SNS 로그인 링크들
```

### HTML 원칙

- 기존 `#wrap → header → main` 구조를 우선 유지한다.
- 콘텐츠의 의미에 맞는 HTML 요소를 사용한다.
- Figma Frame을 그대로 모두 `div`로 복사하지 않는다.
- 레이아웃 그룹에 필요한 경우 `div`를 사용한다.
- 입력 영역은 현재처럼 `form`과 `fieldset`을 기준으로 한다.
- 입력 요소에는 `label`, `input` 등 의미 있는 요소를 우선한다.
- 클릭 동작은 기능에 따라 `button` 또는 `a`를 사용한다.
- 새 브랜드의 콘텐츠 구조가 실제로 다르면 기존 구조를 무조건 유지하지 말고 변경 이유를 확인한다.

## 제목 구조

현재 로그인 화면은 `header`의 `h1`과 `main`의 `h2.title`을 사용한다.

```html
<header>
    <h1>로그인</h1>
</header>

<main>
    <h2 class="title">
        <span>안녕하세요:)</span>
        <span>버거킹입니다.</span>
    </h2>
</main>
```

원칙:
- `h1`은 현재 페이지를 대표하는 제목이다.
- `h2`는 main 안의 주요 콘텐츠 제목으로 사용한다.
- 제목 크기는 CSS로 결정하며 글자 크기를 기준으로 heading level을 선택하지 않는다.
- 새 브랜드에서는 인사말과 브랜드명 같은 실제 콘텐츠만 변경한다.

## Form 구조

현재 로그인 입력 영역은 `form → fieldset`을 기준으로 한다.

```html
<form action="">
    <fieldset>
        <legend class="sr-only">로그인화면</legend>
        <div class="input_box">
            <input type="email" id="email" name="email">
        </div>
        <div class="input_box rela">
            <input type="password" name="password">
            <button type="button" class="pw_btn">
                <span class="sr-only">비밀번호 보기</span>
            </button>
        </div>
        <div class="login_option">...</div>
        <button type="submit" class="login_btn">로그인</button>
    </fieldset>
</form>
```

원칙:
- 이메일/아이디, 비밀번호, 로그인 버튼이 같다면 기존 구조를 우선 재사용한다.
- 비밀번호 보기 아이콘은 `button`으로 취급한다.
- 체크박스는 실제 `input[type="checkbox"]`를 사용한다.
- 새 입력이나 다른 로그인 방식이 있으면 화면을 확인한 후 구조를 추가한다.
- 기존 form 전체를 이유 없이 새로 작성하지 않는다.

## CSS 기본 방식

현재 `King/Login.html`에는 페이지 전용 CSS가 `style` 요소 안에 작성되어 있고 `CSS/default.css`를 연결한다.

```text
default.css
→ reset / 브라우저 기본 스타일 초기화

Login.html의 <style>
→ 버거킹 로그인 화면의 페이지 전용 스타일
```

원칙:
- 현재 프로젝트의 CSS 구조를 먼저 재사용한다.
- 필요하지 않은 새로운 CSS 파일을 임의로 추가하지 않는다.
- 기존 CSS 구조로 해결할 수 있으면 새로운 구조로 바꾸지 않는다.

## CSS 변수

현재 주요 브랜드 값은 `:root` 변수로 관리한다.

```css
:root {
    --font: "Sandoll GothicNeoRound", sans-serif;
    --font-pre: "Pretendard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;
    --primary: #512314;
    --focus: #D62302;
    --baseBorder: #D9CFC6;
    --inputBg: #FFFCF9;
    --Button: #E9DDCD;
    --errorColor: #C54734;
    --placeholder: #EBE6E2;
    --text: #766053;
    --bg: #F4EBDC;
    --button: #E9DDCD;
}
```

새 브랜드에서 변경 가능성이 높은 값:
- 브랜드 폰트
- 주요 텍스트 색상
- 배경색
- 입력창 배경색
- 테두리 색상
- 버튼 색상
- placeholder 색상
- 오류 색상

변수 변경으로 해결할 수 있는 부분은 선택자 전체를 다시 만들지 않는다.

## 폰트

현재 HTML은 다음 폰트 CSS 파일을 연결한다.

```html
<link rel="stylesheet" href="../font/css/bkbulmatpro.css">
<link rel="stylesheet" href="../font/css/Sandoll GothicNeoRound.css">
<link rel="stylesheet" href="../font/css/pretendardvariable.css">
```

원칙:
- 새 브랜드의 폰트 파일이 실제로 제공되었는지 확인한다.
- 존재하지 않는 폰트 파일 경로나 폰트명을 임의로 만들지 않는다.
- 폰트 변경 때문에 HTML 전체를 다시 작성하지 않는다.

## 반응형

현재 `#wrap`:

```css
#wrap {
    width: 96%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvh;
    margin: 0 auto;
    background-color: var(--bg);
}
```

새 화면에서도 전체 높이, 최소/최대 폭, 가운데 정렬, 모바일에서의 잘림 여부를 확인한다.

## 주요 스타일

### Header

```css
header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
}

.prev_btn {
    position: absolute;
    left: 0;
    width: 48px;
    height: 48px;
    background: url(images/back_icon.svg) no-repeat scroll center / auto;
}
```

구조가 같다면 우선 재사용한다. 로고, 닫기 버튼, 위치, 높이가 달라질 경우 필요한 부분만 변경한다.

### Input

```css
input[type="email"],
input[type="password"] {
    width: 100%;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
}
```

디자인이 같다면 공통 선택자를 유지하고, 차이가 있을 때만 추가한다.

### Password button

```css
.input_box.rela {
    position: relative;
}

.pw_btn {
    position: absolute;
    right: 20px;
    bottom: 12px;
    width: 26px;
    height: 26px;
}
```

현재 아이콘은 background-image 방식이다. 실제 파일이 있는지 확인한 후 경로를 작성한다.

### Checkbox

현재 실제 checkbox와 pseudo-element를 조합한다.

```css
.login_option .check + span::before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(images/Checkbox_disabled.svg) no-repeat center / contain;
}

.login_option .check:checked + span::before {
    background-image: url(images/Checkbox_Active.svg);
}
```

### Login button

현재 `.login_btn`을 사용한다. 새 브랜드에서는 width, height, radius, 색상, 텍스트 색상, 활성/비활성 상태를 실제 디자인과 비교한다. 현재 버거킹의 `opacity` 값을 모든 브랜드에 무조건 적용하지 않는다.

### Links

현재 `.login_link`의 링크 사이 구분선은 `::after`로 표현하고 마지막 링크에서는 숨긴다. 링크 개수가 달라지면 선택자가 실제 구조와 맞는지 확인한다.

### SNS

현재 `.sns_login → .sns_list → a` 구조를 사용하며 아이콘은 각 `a`의 background-image로 연결한다. 새 브랜드의 SNS 종류와 실제 이미지 파일을 먼저 확인한다.

## 경로 확인

현재 `Login.html`은 `King` 폴더 안에 있으므로 이미지 경로가 `images/...` 형태다.

새 HTML을 만들기 전에 반드시 확인한다.
1. HTML 파일 위치
2. 이미지 파일 위치
3. CSS 위치
4. 폰트 위치
5. 상대경로

경로를 추측해서 작성하지 않는다.

## class 이름

현재 주요 class:

```text
.title
.input_box
.rela
.email
.login_option
.check
.login_btn
.login_link
.sns_login
.sns_list
.pw_btn
.prev_btn
```

역할이 같으면 기존 class를 우선 재사용한다. 새로운 역할이 생긴 경우에만 새로운 class를 추가한다.

## 새 브랜드 작업 순서

### STEP 1. 기존 코드 확인
`King/Login.html`, `CSS/default.css`, `King/images`, `font`를 먼저 읽는다.

### STEP 2. 기존 구조 파악
header, main, 제목, form, 입력 영역, 옵션, 로그인 버튼, 링크, SNS 영역을 파악한다.

### STEP 3. 새 화면과 비교
콘텐츠, 입력 항목, 버튼, 링크, SNS, 헤더, 폰트, 색상, 이미지, 간격, 크기가 무엇이 다른지 찾는다.

### STEP 4. 변경 범위 결정

```text
① HTML 콘텐츠만 변경
② CSS 스타일만 변경
③ HTML 구조 자체가 변경
```

가능하면 ① → ② 순서로 처리하고, 실제로 필요한 경우에만 ③을 수행한다.

### STEP 5. 기존 코드 재사용
그대로 사용할 수 있는 부분은 유지한다.

### STEP 6. 필요한 부분만 수정
색상, 폰트, 이미지, 문구, 간격, 크기 등 실제로 달라진 부분만 수정한다.

### STEP 7. 경로 확인
새 이미지와 폰트 경로가 실제 파일 위치와 맞는지 확인한다.

### STEP 8. 결과 확인
HTML 구조, CSS 연결, 이미지, 버튼, 링크, 입력창, 모바일 화면을 확인한다.

## AI가 하지 말아야 할 것

- 기존 코드가 있는데 전체 코드를 이유 없이 새로 작성하지 않는다.
- 현재 프로젝트에서 사용하지 않는 라이브러리를 불필요하게 추가하지 않는다.
- 존재하지 않는 이미지/폰트 파일을 임의로 가정하지 않는다.
- Figma Frame을 HTML `div`로 그대로 복사하지 않는다.
- 기존 역할과 같은 class를 모두 새로 만들지 않는다.
- 현재 학습 수준에서 불필요하게 복잡한 기술을 우선 사용하지 않는다.
- 기존 코드의 문제를 발견했더라도 전체 구조를 자동으로 갈아엎지 않는다.

## 현재 코드에서 확인이 필요한 부분

다음은 현재 코드의 상태를 기록한 것이며 새 화면마다 무조건 수정해야 한다는 뜻은 아니다.

### HTML

현재 문서에는 `<html lang="en">`이 사용되고 있다. 한국어 화면을 만들 때 언어 설정이 실제 콘텐츠와 맞는지 확인한다.

현재 `fieldset` 안에서 `legend`가 두 번 사용되고 있으며 두 번째 `legend`에는 `for` 속성이 작성되어 있다. 새 화면을 만들 때 이 구조를 무조건 복사하기보다 각 요소의 의미와 역할을 확인한다.

### CSS

현재 코드에는 `input ::placeholder` 선택자가 있다. 새 코드에서 placeholder 스타일을 작성할 때 실제로 의도한 요소를 선택하는지 확인한다.

또한 `CSS/default.css`가 form 요소의 기본 스타일을 초기화하고 있으므로 페이지 CSS에서 필요한 스타일을 다시 지정하는 현재 방식을 고려한다.

## AI의 코드 제안 방식

AI는 완성 코드만 던지지 않고 다음 순서로 설명한다.

1. 기존 코드에서 무엇을 유지하는지
2. 무엇을 변경하는지
3. 왜 변경하는지
4. 변경할 코드
5. 사용자가 직접 확인할 부분

사용자가 직접 수정할 수 있는 간단한 문제라면 먼저 수정 위치와 힌트를 제공한다.

## 최종 체크리스트

### HTML
- [ ] #wrap 구조를 확인했는가?
- [ ] header와 main의 역할이 명확한가?
- [ ] 페이지 대표 제목이 있는가?
- [ ] form 구조가 실제 화면과 맞는가?
- [ ] input type이 콘텐츠에 맞는가?
- [ ] button과 a를 기능에 맞게 사용했는가?
- [ ] 불필요한 div를 추가하지 않았는가?

### CSS
- [ ] 기존 CSS 구조를 먼저 재사용했는가?
- [ ] CSS 변수를 활용했는가?
- [ ] 브랜드 색상을 실제 디자인에 맞게 적용했는가?
- [ ] 폰트 파일과 이름을 확인했는가?
- [ ] input 크기와 간격이 실제 화면과 맞는가?
- [ ] 버튼 크기와 상태가 맞는가?
- [ ] 모바일 화면에서도 깨지지 않는가?

### 경로
- [ ] HTML 파일 위치를 확인했는가?
- [ ] CSS 파일 경로가 맞는가?
- [ ] 이미지 경로가 실제 파일과 일치하는가?
- [ ] 폰트 경로가 실제 파일과 일치하는가?

### 작업 방식
- [ ] 기존 코드를 먼저 분석했는가?
- [ ] 변경이 필요한 부분만 수정했는가?
- [ ] 새로운 라이브러리를 불필요하게 추가하지 않았는가?
- [ ] 존재하지 않는 이미지나 파일을 임의로 만들지 않았는가?
- [ ] 코드의 변경 이유를 설명할 수 있는가?
- [ ] AI가 만든 코드를 그대로 제출하지 않고 직접 확인했는가?

## 핵심 원칙

> 새 브랜드 로그인 UI를 만들 때는 기존 버거킹 코드의 구조와 작성 방식을 기준으로 삼되, 새 화면에서 실제로 달라진 콘텐츠·구조·스타일만 찾아 수정한다.
