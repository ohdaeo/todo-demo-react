import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; //격자달력
//타임블록 드래그 : npm install @fullcalendar/interaction
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

const datas = [
  {
    title: "월요일 수업",
    date: "2024-12-16",
    backgroundColor: "#ffdbe6",
    textColor: "black",
    borderColor: "transparent",
  },
  {
    title: "화요일 수업",
    date: "2024-12-17",
    backgroundColor: "#f89b00",
    borderColor: "transparent",
  },
  {
    title: "수요일 수업",
    date: "2024-12-18",
    backgroundColor: "#fbceb1",
    borderColor: "transparent",
  },
  {
    title: "프로젝트 기간",
    start: "2024-12-18",
    end: "2024-12-20",
    borderColor: "transparent",
    backgroundColor: "#c8d2ff",
  },
];

function Full() {
  const [events, setEvents] = useState([...datas]);
  //타일 클릭
  const handleTileClick = e => {
    console.log(e.event);
  };
  //타임블록 드래그 처리
  const handleDragEvent = e => {
    console.log(e);
    console.log(e.event);
    console.log(e.event.title);
    console.log(e.event.startStr);
    console.log(e.event.endStr);
  };
  //일정 추가 (리랜더링을 위해 uesState사용)
  const handleAddEvent = e => {
    if (e.title) {
      //data가 있으면 수정기능활성화
    } else {
      //data가 없으면 입력기능활성화
    }

    const sample = {
      title: "타이틀",
      backgroundColor: "#adff2f",
      date: e.dateStr,
    };
    setEvents([...events, sample]);
    // 입력 폼에 사용가자 값을 입력하는 form태그 필요
  };

  //일정 삭제

  return (
    <div>
      <h1>Full Schedule</h1>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} //달력 모양 플러그인, 타임블록 드래그
          initialView="dayGridMonth" //초기 화면
          locale={"ko"} //국가설정
          headerToolbar={{
            left: "prev",
            center: "title,today",
            right: "next",
          }} //상단 툴바 출력 위치
          buttonText={{
            today: "오늘",
          }} // 버튼 수정
          editable={true} // 타임블록 드래그
          eventDrop={e => handleDragEvent(e)}
          eventClick={e => handleTileClick(e)} // 데이터 타이틀을 클릭시 이벤트
          events={events} // 초기 데이터 (속성명은 지정되어있음)
          dateClick={e => handleAddEvent(e)} // 일정추가
        />
      </div>
    </div>
  );
}

export default Full;
