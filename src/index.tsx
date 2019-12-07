import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext, DropResult, DragUpdate } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, updateData] = useState(initialData);

  const onDragStart = () => {
    /* ***
     * You want to change doc text color, if it be dragging item.
     * Try this code.
     * 
     * document.body.style.color = 'DarkBlue';
     * document.body.style.transition = 'backgrand-color 0.2s ease'
     */
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

    const { destination, source, draggableId } = result;

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

    const column = data.columns[source.droppableId];
    const newTaskIds = [...column.taskIds];

    // remove item "source" position and insert "destination" position
    // @note draggableId is dragging item id
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  }

  return (
    <DragDropContext
      onDragStart={ onDragStart }
      onDragUpdate={ onDragUpdate }
      onDragEnd={ onDragEnd }
    >
      <Container>
        {
          data.columnOrder.map((columnId: string) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);

            return <Column key={ column.id } column={ column } tasks={ tasks } />;
          })
        }
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
