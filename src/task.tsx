import React, { FC } from 'react';
import styled from 'styled-components';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface ContainerProps {
  isDragging: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${ props => (
    props.isDragging
      ? 'LightCyan'
      : 'White'
  ) };


  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <Draggable
      draggableId={ task.id }
      index={ index }
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          ref={ provided.innerRef }
          isDragging={ snapshot.isDragging }
          { ...provided.dragHandleProps }
          { ...provided.draggableProps }
        >
          { task.content[0] }
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
