import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import List from "./components/List";
import { mq } from "./constants";

const App = () => {
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("./json/seminar_schedule.json")
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          setError("不正なデータです。");
          return;
        }

        const dataForState = data.reduce((newData, day) => {
          const month = moment(day.date).format("YYYYMM01");
          if (!newData[month]) {
            newData[month] = [day];
          } else {
            newData[month].push(day);
          }
          return newData;
        }, {});

        setSchedule(dataForState);
      })
      .catch(e => {
        setError(e.message);
      });
  }, []);

  if (!!error) {
    return <Error>日程を表示できません。{error}</Error>;
  }

  if (!schedule) {
    return null;
  }

  return (
    <>
      <Root>
        {Object.entries(schedule).map(([month, list]) => {
          return <List key={month} month={month} list={list} />;
        })}
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
