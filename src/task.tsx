import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

interface TaskProps {
  key: string,
  task: any,
};

const Task: FC<TaskProps> = ({
  key,
  task,
}) => {
  return (
    <Container>{ task.content }</Container>
  );
}

export default Task;
