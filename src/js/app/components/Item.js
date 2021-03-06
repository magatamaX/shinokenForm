import React from "react";
import moment from "moment";
import styled from "styled-components";
import { mq } from "../constants";

const day_ja = ["日", "月", "火", "水", "木", "金", "土"];

const Item = ({ date, start, end, special }) => {
  const dateStr = moment(date).format("M/D");
  const dayStr = day_ja[moment(date).format("d")];
  const today = moment(new Date()).format("YYYYMMDD");
  const isFinished = Number(date) < Number(today);
  return (
    <Li key={date}>
      <Day>{dateStr}</Day>（{dayStr}）{start}
      <Small>開講 ～ </Small>
      {end}
      <Small>終了予定</Small>
      {isFinished && (
        <>
          <Line />
          <EndIcon>終了</EndIcon>
        </>
      )}
      {special && <SpecialMarker />}
    </Li>
  );
};

const Li = styled.li`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
  z-index: 0;
  ${mq} {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;
const Day = styled.span`
  font-size: 24px;
  font-weight: bold;
  width: 3.5em;
  display: inline-block;
  text-align: left;
  ${mq} {
    font-size: 16px;
  }
`;
const Small = styled.span`
  font-size: 14px;
  margin: 0 5px;
  ${mq} {
    font-size: 10px;
    margin: 0 2.5px;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 2px;
  background: #000;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;
const EndIcon = styled.div`
  position: absolute;
  background-color: #a40000;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  padding: 5px 10px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  ${mq} {
    font-size: 12px;
  }
`;
const SpecialMarker = styled.div`
  position: absolute;
  background-color: #ff0;
  top: 50%;
  left: 0;
  width: 100%;
  height: 20px;
  transform: translateY(-50%);
  z-index: -1;
`;

export default Item;
