const tasks: { [index: string] : { id: string, content: string } } = {
  'task-1': { id: 'task-1', content: 'Take out the garbage' },
  'task-2': { id: 'task-2', content: 'Watch my favorite show' },
  'task-3': { id: 'task-3', content: 'Change my phone' },
  'task-4': { id: 'task-4', content: 'Cook dinner' },
};

const columns: { [index: string] : { id: string, title: string, taskIds: string[] } } = {
  'column-1': {
    id: 'column-1',
    title: 'To do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
};

const initialData = {
  tasks: tasks,
  columns: columns,
  // Facilitate reordering of the columns
  columnOrder: ['column-1'],
}

export default initialData;