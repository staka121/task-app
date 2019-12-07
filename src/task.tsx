import React, { FC } from 'react';
import styled from 'styled-components';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface ContainerProps {
  isDragging: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${ props => ( props.isDragging ? 'LightCyan' : 'White' ) };

  display: flex;
`;

interface TaskProps {
  key: string,
  task: any,
  index: number,
};

// drag handle
const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const Task: FC<TaskProps> = ({
  task,
  index,
}) => {
  return (
    <Draggable draggableId={ task.id } index={ index }>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          ref={ provided.innerRef }
          isDragging={ snapshot.isDragging }
          { ...provided.draggableProps }
        >
          <Handle { ...provided.dragHandleProps } />
          { task.content }
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
