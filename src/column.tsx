import React, { FC } from 'react';

interface ColumnProps {
  key: string,
  column: any,
  tasks: any,
};

const Column: FC<ColumnProps> = ({
  column,
}) => {
  return (
    <div>{ column.title }</div>
  );
}

export default Column;
