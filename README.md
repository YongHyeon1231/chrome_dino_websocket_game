# chrome_dino_websocket_game
 스파르타 개인 과제 websocket 익숙해지기


## 패킷 구조 설계

- 패킷 구조 (클라이언트)
<table>
<tr>
<td>필드 명</td>
<td>타입</td>
<td>설명</td>
</tr>

<tr>
<td>handlerId</td>
<td>int</td>
<td>요청을 처리할 Server Handler의 Id</td>
</tr>

<tr>
<td>userId</td>
<td>int</td>
<td>요청을 보내는 유저의 Id (UUID)</td>
</tr>

<tr>
<td>clientVersion</td>
<td>string</td>
<td>현재 클라이언트 버전 ("1.0.0") (고정)</td>
</tr>

<tr>
<td>payload</td>
<td>JSON</td>
<td>요청 내용</td>
</tr>
</table>

<br>

- 게임 시작 payload (handlerId: 2)
<table>
<tr>
<td>필드 명</td>
<td>타입</td>
<td>설명</td>
</tr>

<tr>
<td>timestamp</td>
<td>Date</td>
<td>게임 시작 요청 시 클라이언트 시간</td>
</tr>
</table>

<br>

- 스테이지 이동 요청 payload (handlerId: 11)
<table>
<tr>
<td>필드 명</td>
<td>타입</td>
<td>설명</td>
</tr>

<tr>
<td>currentStage</td>
<td>int</td>
<td>현재 스테이지</td>
</tr>

<tr>
<td>targetStage</td>
<td>int</td>
<td>이동하는 스테이지</td>
</tr>
</table>

<br>

- 아이템 획득 payload (handlerId: 21)

<table>
<tr>
<td>필드 명</td>
<td>타입</td>
<td>설명</td>
</tr>

<tr>
<td>itemId</td>
<td>int</td>
<td>획득하는 아이템 ID</td>
</tr>

<tr>
<td>timestamp</td>
<td>Date</td>
<td>획득하는 아이템 시간</td>
</tr>
</table>

<br>

- 게임 종료 payload (handlerId: 3)

<table>
<tr>
<td>필드 명</td>
<td>타입</td>
<td>설명</td>
</tr>

<tr>
<td>timestamp</td>
<td>Date</td>
<td>게임 종료 시간</td>
</tr>

<tr>
<td>score</td>
<td>int</td>
<td>게임 오버 시 달성한 점수</td>
</tr>
</table>

<br>
<br>

---

<br>
<br>

