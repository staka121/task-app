import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { Droppable, DroppableProvided, DroppableStateSnapshot, Draggable, DraggableProvided } from 'react-beautiful-dnd';
import Task from './task';

interface TaskListProps {
  isDraggingOver: boolean;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 400px;

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
  flex-grow: 1;
  min-hight: 100px;
`;

const InnerList: FC<{ tasks: any[] }> = ({
  tasks,
}) => {
  return (
    <>
      {
        tasks.map((task: any, index: number) => (
          <Task key={ task.id } task={ task } index={ index } />
        ))
      }
    </>
  );
};

interface ColumnProps {
  key: string,
  column: any,
  tasks: any[],
  isDropDisabled: boolean,
  index: number,
};

const Column: FC<ColumnProps> = ({
  column,
  tasks,
  isDropDisabled,
  index,
}) => {
  // Reduce task re-rendering
  // ref: https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate
  const memoizedInnerList = useMemo(
    () => <InnerList tasks={ tasks }/>,
    [tasks],
  );

  return (
    <Draggable
      draggableId={ column.id }
      index={ index }
    >
      {(provided: DraggableProvided) => (
        <Container
          ref={ provided.innerRef }
          { ...provided.draggableProps }
        >
          <Title { ...provided.dragHandleProps }>
            { column.title }
          </Title>
          <Droppable
            droppableId={ column.id }
            isDropDisabled={ isDropDisabled }
            type="task"
          >
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <TaskList
                ref={ provided.innerRef }
                isDraggingOver={ snapshot.isDraggingOver }
                { ...provided.droppableProps }
              >
                { memoizedInnerList }
                { provided.placeholder }
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
