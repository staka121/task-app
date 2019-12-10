import React, { FC } from 'react';
import styled from 'styled-components';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Task from './task';

interface TaskListProps {
  isDraggingOver: boolean;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${ props => (props.isDraggingOver ? 'DarkCyan' : 'White') };

  display: flex;
`;

interface ColumnProps {
  key: string,
  column: any,
  tasks: any[],
  isDropDisabled: boolean,
};

const Column: FC<ColumnProps> = ({
  column,
  tasks,
  isDropDisabled,
}) => {
  return (
    <Container>
      <Title>{ column.title }</Title>
      <Droppable
        droppableId={ column.id }
        isDropDisabled={ isDropDisabled }
        direction="horizontal"
      >
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <TaskList
            ref={ provided.innerRef }
            isDraggingOver={ snapshot.isDraggingOver }
            { ...provided.droppableProps }
          >
            { tasks.map((task: any, index: number) => (
              <Task key={ task.id } task={ task } index={ index } />
            )) }
            { provided.placeholder }
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
