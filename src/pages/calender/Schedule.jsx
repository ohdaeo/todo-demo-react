//npm i react-calendar

// 1. 기본 캘린더
import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
// 2. css 미적용시 캘린더가 button으로 노출됨
import "react-calendar/dist/Calendar.css";
import "./schedule.css";
import { IoMdClose } from "react-icons/io";

function Schedule() {
  // 4. 선택 된 날짜 기록
  const [date, setDate] = useState(new Date());
  // 5. 샘플 일정 자료
  //스케줄 화면 상세보기
  const [selectSehedule, setSelectSehedule] = useState(null);
  const scheduleData = {
    "2024-12-13": [
      {
        id: 2,
        title: "점심",
        desc: "점심을 먹어야할거아냐",
        time: "12:00",
      },
      {
        id: 3,
        title: "뭐해야하는데",
        desc: "뭐해야하냐고",
        time: "14:00",
      },
    ],
  };
  //스케줄 선택
  const hadeleClikeSehedule = item => {
    setSelectSehedule(item);
  };
  // console.log(scheduleData);
  // 3. 날짜, 요일 출력
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    return weekName[date.getDay()];
  };

  // 5. 타일에 내용 출력
  const tileContent = e => {
    const { date, view } = e;
    console.log(date, view);
    // date       : "2024-11-23T15:00:00.000Z",
    // view       : "month",
    if (view === "month") {
      // 우리 데이터  "2024-12-13"
      const formatedDate = date.toLocaleDateString("en-CA");
      // ["2024-11-23", "15:00:00.000Z"]
      console.log(formatedDate);
      const sechdules = scheduleData[formatedDate];
      if (sechdules) {
        return (
          <div className="schedule-content">
            {sechdules.map(item => (
              <div
                key={item.id}
                className="schedule-item"
                onClick={() => hadeleClikeSehedule(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  useEffect(() => {}, [date]);

  return (
    <div>
      <h1>Schedule</h1>
      <div>
        <Calendar
          // 한국식 달력 출력
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          //4번
          value={date}
          // 4번의 변경된 날짜 값을 보관
          onChange={e => setDate(e)}
          // 5. 각 타일에 일정 출력하기
          tileContent={e => tileContent(e)}
        />
      </div>
      <div>
        {selectSehedule && (
          <div
            className="sehedule-detail"
            onClick={e => {
              setSelectSehedule(null);
            }}
          >
            <div
              className="sehedule-box"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <h2>스케줄 확인</h2>
              <h3>제목 : {selectSehedule.title}</h3>
              <p>시간 : {selectSehedule.time}</p>
              <p>내용 : {selectSehedule.desc}</p>
              <button
                onClick={() => {
                  setSelectSehedule(null);
                }}
              >
                <IoMdClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
