import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {
  DragDropContext, DropResult, DragUpdate, DragStart, Droppable, DroppableProvided,
} from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const App: FC = () => {
  const [data, updateData] = useState(initialData);
  const [homeIndex, updateHomeIndex] = useState<number>(-1);

  const onDragStart = (start: DragStart) => {
    /* ***
     * You want to change doc text color, if it be dragging item.
     * Try this code.
     * 
     * document.body.style.color = 'DarkBlue';
     * document.body.style.transition = 'backgrand-color 0.2s ease'
     */

    updateHomeIndex(data.columnOrder.indexOf(start.source.droppableId));
  };

  const onDragUpdate = (update: DragUpdate) => {
    /* ***
     * You want to change doc background color with relation to item position, if it be dragging item.
     * Try this code.
     * 
     * const { destination } = update;
     * const opacity = destination
     *   ? destination.index / Object.keys(data.tasks).length
     *   : 0;
     *
     * document.body.style.backgroundColor = `rgba(153, 141, 217, ${ opacity })`
     */
  };

  const onDragEnd = (result: DropResult) => {
    /* ***
     * You want to reset changed doc color.
     * Try this code.
     * 
     * document.body.style.color = 'inherit';
     * document.body.style.backgroundColor = 'inherit';
     */

    updateHomeIndex(-1);

    const { destination, source, draggableId, type } = result;

    // drops outside of a list
    if (!destination) {
      return;
    }

    // item back into the position that is started
    // @note
    //   droppableId is column id.
    //   index is position into column in item.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      
      updateData(newState);
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // not change column
    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];

      // remove item "source" position and insert "destination" position
      // @note draggableId is dragging item id
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds.flat(),
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      updateData(newState);
      return;
    }

    // Moving from one list to another
    // remove item "source" position for start column
    const startTaskIds = [...startColumn.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds.flat(),
    };

    // insrt item "destination" column
    const finishTaskIds = [...finishColumn.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds.flat(),
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    updateData(newState);
  }

  return (
    <DragDropContext
      onDragStart={ onDragStart }
      onDragUpdate={ onDragUpdate }
      onDragEnd={ onDragEnd }
    >
      <Droppable
        droppableId="all-columns"
        direction="horizontal"
        type="column"
      >
        {(provided: DroppableProvided) => (
          <Container
            ref={ provided.innerRef }
            { ...provided.droppableProps }
          >
            {
              data.columnOrder.map((columnId: string, index: number) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);

                // don't water-rise
                const isDropDisabled = index < homeIndex;

                return (
                  <Column
                    key={ column.id }
                    column={ column }
                    tasks={ tasks }
                    isDropDisabled={ isDropDisabled }
                    index={ index }
                  />
                );
              })
            }
            { provided.placeholder }
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
