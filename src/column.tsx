import React, { FC } from 'react';
import styled from 'styled-components';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

interface ColumnProps {
  key: string,
  column: any,
  tasks: any[],
};

const Column: FC<ColumnProps> = ({
  column,
  tasks,
}) => {
  return (
    <Container>
      <Title>{ column.title }</Title>
      <TaskList>{ tasks.map((task: any) => <Task key={ task.id } task={ task } />) }</TaskList>
    </Container>
  );
}

export default Column;
