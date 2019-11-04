import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const App = () => {
  const [data, updateData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
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

  const onDragEnd = (result: any) => {
    // TODO: re-order our column
  }

  return (
    <DragDropContext onDragEnd={ onDragEnd }>
      {
        data.columnOrder.map((columnId: string) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);

          return <Column key={ column.id } column={ column } tasks={ tasks } />;
        })
      }
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
