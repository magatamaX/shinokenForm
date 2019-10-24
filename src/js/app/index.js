import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import List from "./components/List";
import { mq } from "./constants";

const App = () => {
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const scheduleData = window.____SEMINAR_SCHEDULE_DATA_ARRAY____ || null;

    if (!scheduleData) {
      setError("データがないか、不正です。");
      return;
    }

    if (!Array.isArray(scheduleData)) {
      setError("不正なデータです。");
      return;
    }

    const dataForState = scheduleData.reduce((newData, day) => {
      const month = moment(day.date).format("YYYYMM01");

      // 今月
      const currentMonth = moment().format("YYYYMM01");
      // 翌月
      const nextMonth = moment()
        .add("months", 1)
        .format("YYYYMM01");

      // 表示させるのは今月と翌月の分だけ
      if (month === currentMonth || month === nextMonth) {
        if (!newData[month]) {
          newData[month] = [day];
        } else {
          newData[month].push(day);
        }
      }

      return newData;
    }, {});

    setSchedule(dataForState);
  }, []);

  useEffect(() => {
    if (!!schedule) {
      const months = Object.keys(schedule);
      const startMonthStr =
        months.length > 0 ? moment(months[0]).format("YYYY年M月") : "";
      const endMonthStr =
        months.length > 0
          ? moment(months[months.length - 1]).format("YYYY年M月")
          : "";
      const targetDom = document.getElementById("seminarPeriod");
      if (targetDom) {
        targetDom.textContent = `${startMonthStr}${
          startMonthStr !== endMonthStr ? `～${endMonthStr}` : ""
        }`;
      }
    }
  }, [schedule]);

  if (!!error) {
    return <Error>日程を表示できません。{error}</Error>;
  }

  if (!schedule) {
    return null;
  }

  return (
    <>
      <Root>
        {Object.entries(schedule).length > 0 &&
          Object.entries(schedule).map(([month, list]) => (
            <List key={month} month={month} list={list} />
          ))}
        {!Object.entries(schedule).length && (
          <NoSchedule>開催予定はありません。</NoSchedule>
        )}
      </Root>
      <Note>
        セミナー内容は、予告なく変更する場合があります。
        <br />
        ご了承ください。
      </Note>
    </>
  );
};

const Root = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  > * {
    flex: 0 0 49%;
    ${mq} {
      flex: 0 0 100%;
      margin-bottom: 20px;
    }
  }
`;

const Error = styled.p`
  margin-top: 20px;
  color: red;
  font-size: 16px;
`;

const NoSchedule = styled.p`
  margin-top: 20px;
  color: #005bac;
  font-size: 16px;
  text-align: center;
  flex: 0 0 100%;
`;

const Note = styled.p`
  color: #005bac;
  font-size: 10px;
  margin-top: 20px;
  text-align: right;
  br {
    display: none;
  }
  ${mq} {
    margin-top: 0;
    text-align: left;
    br {
      display: inline;
    }
  }
`;

export default App;
