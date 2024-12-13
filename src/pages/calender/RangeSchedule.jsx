import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function RangeSchedule() {
  const [date, setDate] = useState(new Date());

  const scheduleData = {
    "sc-1": {
      startDate: "2024-12-03",
      endDate: "2024-12-14",
      event: {
        id: 1,
        title: "프로젝트 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "#ffbbbb",
        eventColor: "#b65858",
        startDate: "2024-12-03",
        endDate: "2024-12-14",
      },
    },
    "sc-2": {
      startDate: "2024-12-07",
      endDate: "2024-12-24",
      event: {
        id: 2,
        title: "뭔 기간일까",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "#9fd6f7",
        eventColor: "#366f92",
        startDate: "2024-12-07",
        endDate: "2024-12-24",
      },
    },
    "sc-3": {
      startDate: "2024-12-05",
      endDate: "2024-12-10",
      event: {
        id: 3,
        title: "보라색데이",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "#b9aedf",
        eventColor: "#594c88",
        startDate: "2024-12-05",
        endDate: "2024-12-10",
      },
    },
  };
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    return weekName[date.getDay()];
  };

  // 특정 날짜의 모든 일정을 모아 정렬해줄 함수
  const getEventsDate = date => {
    // 날짜를 이용해서 출력 시킬 데이터를 선택하도록 한다.
    // 범위에 맞는 처리
    let allEvents = [];

    //반복문 사용
    //모든 scheduleData에 저장해둔 내용을 반복한다.
    //"sc-1", ...
    Object.keys(scheduleData).forEach(item => {
      //객체에 있는 내용 하나하나를 알아냄
      const rangeSchedule = scheduleData[item];
      // Date 객체로 만들어서 날짜 비교용으로 활용
      //const startDay = new Date(rangeSchedule.startDate); 시작날짜;
      //const endtDay = new Date(rangeSchedule.endDate);  끝나는 날짜
      if (isDateInRange(date, rangeSchedule.startDate, rangeSchedule.endDate)) {
        const content = rangeSchedule.event; // 내용
        allEvents.push(content);
      }
    });
    return allEvents;
  };

  //특정 시간 범위에서 시작, 종료 날짜 유무를 검사하는 함수
  const isDateInRange = (날짜, 시작, 종료) => {
    //날짜가 시작일 보다 작은지
    //날짜가 종료일 보다 큰지
    const checkDay = new Date(날짜); // 2024-12-01 02 03 ...
    const startDay = new Date(시작); // startDate: "2024-12-03"
    const endDay = new Date(종료); // endDate: "2024-12-14"

    return checkDay >= startDay && checkDay <= endDay;
  };

  //날짜 타일에 출력 할 내용 위치
  const tileContent = e => {
    const { date, view } = e;
    //뽑아놓은 데이터를 모아준다
    let dayEvents = [];

    if (view === "month") {
      const formatedDate = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 형식
      // 특정 날짜 전달
      dayEvents = getEventsDate(formatedDate);

      //html 만들기
      if (dayEvents.length > 0) {
        // 데이터가 있다면, 비교 날짜와 시작날짜가 같은 경우에 글자 출력

        //데이터가 있다면, 시작부터 종료일까지 배경색 출력
        return (
          <div>
            {dayEvents.map(item => (
              <div
                key={item.id}
                style={{
                  height: "24px",
                  lineHeight: "25px",
                  backgroundColor: `${item.eventBgColor}`,
                  color: `${item.eventColor}`,
                  borderRadius:
                    formatedDate === item.startDate
                      ? "10px 0px 0px 10px"
                      : formatedDate === item.endDate
                        ? "0px 10px 10px 0px"
                        : "0",
                }}
              >
                {formatedDate === item.startDate && item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1>RangeSchedule</h1>
      <div className="range-bar">
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          value={date}
          onChange={e => setDate(e)}
          tileContent={e => tileContent(e)}
        />
      </div>
    </div>
  );
}
export default RangeSchedule;
