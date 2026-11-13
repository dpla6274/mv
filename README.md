# MARIA PARK × VITTORIO — v8

## v5 변경 내용 (v4 대비)
- 모바일 세로 화면의 상단 `← DRAG THE IMAGE TO EXPLORE →` 안내 바 삭제.
- 모바일 하단의 `CHARACTERS · MARIA · VITTORIO · NEWSPAPER · NOTEBOOK` 메뉴 바 삭제.
- 두 바에 연결된 HTML/CSS도 삭제했으며, SVG 이미지 위의 클릭 영역 및 좌우 드래그 탐색은 유지.
- iPhone Safari의 주소창과 브라우저 버튼은 웹사이트 코드로 삭제할 수 없습니다.

## 이전 버전에서 유지한 동작
- 마리아 이름과 연대기를 하나의 그룹(`maria-text-group`)으로 묶고 함께 **20px 아래로 이동**.
- 비토리오 연대기(붉은 문장 포함)를 먼저 **30px 올린 뒤**, 이름·연대기 그룹 전체를 **10px 더 위로 이동**.
  - v3 대비 비토리오 이름 총 -10px, 연대기 총 -40px (v3 이름의 -30px 선행 이동과 합쳐 원래 글줄 간격 복원).
- 실제 링크 주소 5개를 SVG 클릭 영역의 `href`에 직접 기재.
- `script.js`의 SVG 링크 오류 `a.href = url` → `a.setAttribute('href', url)` 수정.
- 연대기(붉은 문장 포함)는 링크 없음. 설명 영역 클릭 시 뒤에 있는 인물 링크가 눌리지 않도록 클릭 차단 영역도 함께 이동.
- 신문 호버 아래로 23px, 수첩 호버 위로 24px 효과와 외곽선 제거 유지.

## 링크 주소
- 신문: https://dpla.tistory.com/category/VITTORIO/VITTORIO
- 중앙 인물: https://youtube.com/playlist?list=PLPOv65CdoMiw&si=33Mn_ayC2dG6dNeY
- MARIA PARK 이름: https://x.com/DPLA_6274
- VITTORIO 이름: https://caveduck.io/ko/share/characters/4dd9205a-b982-496f-9597-72c5ddfc8b49?rc=1qQMZ53X9o&_share_hash=
- 수첩: https://dpla.tistory.com/11

## Cloudflare 배포
`index.html`, `style.css`, `script.js`, `assets/`가 최상위에 있는 **이 ZIP을 그대로 업로드**하거나 압축을 풀어 프로젝트의 새 배포로 업로드하세요. `mv` Worker의 기존 프로젝트에 새 버전을 배포하면 주소가 유지됩니다.
브라우저에서 Ctrl+Shift+R로 강력 새로고침하세요.


- v6: scene-base를 켜져 있는 레이어 기준으로 다시 추출하고, 바이올린 활을 별도 레이어로 추가했습니다. 활의 순서는 scene base 위 / 신문 위 / 텍스트 아래입니다.


## v7: 포토샵 혼합 모드 복원

- `MARIA PARK` 이름: Photoshop **Exclusion** → CSS `mix-blend-mode: exclusion`.
- `VITTORIO` 이름, 두 사람 연대기: Photoshop **Difference** → CSS `mix-blend-mode: difference`.
- 붉은 취소선은 원본처럼 Normal 혼합. 기존 연대기 PNG를 흰 글씨와 빨간 글씨로 분리했습니다.
- 텍스트 그룹의 위치는 `style.css`의 `--maria-text-offset`과 `--vittorio-text-offset`만 변경하면 이름과 연대기가 함께 이동합니다.
- 마리아/비토리오 캐릭터와 호버 소품, 모바일 드래그, 기존 링크는 그대로 유지합니다.
- GitHub Pages 저장소 루트에 `index.html`, `style.css`, `script.js`, `assets/` 폴더를 올리세요.


## v8: 이름 호버 시 방향성 레드 와이프

- `MARIA PARK`: 마우스를 올리면 #FF0000가 **왼쪽 → 오른쪽**으로 0.9초에 걸쳐 채워집니다.
- `VITTORIO`: 마우스를 올리면 #FF0000가 **오른쪽 → 왼쪽**으로 0.9초에 걸쳐 채워집니다.
- `assets/maria-title-red.png`, `assets/vittorio-title-red.png`는 원본 이름의 투명도(글씨 모양)를 그대로 둔 빨간 글씨 이미지입니다.
- 원본 이름의 `mix-blend-mode: exclusion`/`difference`는 그대로이며, 호버 동안에만 일반 합성 방식의 빨간 이미지를 **위에 덮어씌웁니다.** 빨간색 자체는 배경 영향을 받지 않고 정확히 #FF0000입니다.
- 클립 경계의 움직임만 사용하여 그라데이션 없이 채워집니다. 호버를 벗어나면 역방향으로 돌아갑니다.
- 이전 버전의 이름 클릭 링크/새 탭 열기, 인물과 소품 링크, 모바일 UI/드래그, 텍스트 위치는 유지합니다.
- 기존 GitHub 저장소에 업로드할 때는 `index.html`, `style.css`를 업데이트하고 `assets/`의 새 빨간 PNG 두 장을 추가하면 됩니다. `script.js`는 기존 v7과 동일합니다.
