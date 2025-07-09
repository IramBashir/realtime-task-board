// components/Board.jsx
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

const Board = ({ columns, onMoveCard }) => {
  if (!columns) return <div>Loading board...</div>;
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside list or no movement
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

    const newColumns = [...columns];
    const sourceColIndex = parseInt(source.droppableId);
    const destColIndex = parseInt(destination.droppableId);

    const sourceCol = { ...newColumns[sourceColIndex] };
    const destCol = { ...newColumns[destColIndex] };

    const [movedCard] = sourceCol.cards.splice(source.index, 1);
    destCol.cards.splice(destination.index, 0, movedCard);

    newColumns[sourceColIndex] = sourceCol;
    newColumns[destColIndex] = destCol;

    onMoveCard({ columns: newColumns });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto p-6 min-h-screen bg-gradient-to-br from-purple-200 to-pink-200 w-full">
{/* 
      <div className="flex gap-4 overflow-x-auto p-4 min-h-screen bg-gray-100"> */}
        {columns.map((column, index) => (
          <Droppable
            droppableId={index.toString()}
            key={index}
            isDropDisabled={Boolean(false)}
            isCombineEnabled={Boolean(false)}
            ignoreContainerClipping={Boolean(false)}
            >
            {(provided) => (
                <div className="flex gap-6 overflow-x-auto p-6 min-h-screen bg-gradient-to-br from-purple-200 to-pink-200"

                ref={provided.innerRef}
                {...provided.droppableProps}
                
                >
                <Column column={column} columnIndex={index} />
                {provided.placeholder}
                </div>
            )}
            </Droppable>

        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
