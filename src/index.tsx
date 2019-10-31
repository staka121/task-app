import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const App = () => {
  const [data] = useState(initialData);

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
