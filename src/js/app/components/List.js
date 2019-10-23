import React from "react";
import moment from "moment";
import styled from "styled-components";
import Item from "../components/Item";

const List = ({ month, list }) => {
  return (
    <Root>
      <Title>{moment(month).format("M")}月の開催予定日</Title>
      <Data>
        <Ul>
          {list.map(item => (
            <Item key={item.date} {...item} />
          ))}
        </Ul>
      </Data>
    </Root>
  );
};

const Root = styled.dl``;

const Title = styled.dt`
  background-color: #e5eef7;
  color: #005bac;
  font-size: 16px;
  padding: 10px 0;
  text-align: center;
  line-height: 1;
  border-radius: 100px;
`;

const Data = styled.dd`
  margin-top: 20px;
`;

const Ul = styled.ul``;

export default List;
