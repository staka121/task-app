import React, { FC } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

interface TaskProps {
  key: string,
  task: any,
  index: number,
};

const Task: FC<TaskProps> = ({
  task,
  index,
}) => {
  return (
    <Draggable draggableId={ task.id } index={ index }>
      {(provided) => (
        <Container
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
        >
          { task.content }
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
