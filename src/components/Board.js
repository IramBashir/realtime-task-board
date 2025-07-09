// components/Board.jsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './Column';

const Board = ({ columns, onMoveCard, onEditCard, onDeleteCard, onAddCard  }) => {
  if (!columns) return <div>Loading board...</div>
  
  
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    )
      return;

    // Moving entire columns
    if (type === 'column') {
      const reordered = [...columns];
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      onMoveCard({ columns: reordered }); // reusing onMoveCard for now
      return;
    }

    // Moving cards
    const newColumns = [...columns];
    const sourceColIndex = parseInt(source.droppableId);
    const destColIndex = parseInt(destination.droppableId);

    const sourceCol = {
      ...newColumns[sourceColIndex],
      cards: [...newColumns[sourceColIndex].cards],
    };
    const destCol = {
      ...newColumns[destColIndex],
      cards: [...newColumns[destColIndex].cards],
    };

    const [movedCard] = sourceCol.cards.splice(source.index, 1);
    destCol.cards.splice(destination.index, 0, movedCard);

    newColumns[sourceColIndex] = sourceCol;
    newColumns[destColIndex] = destCol;

    onMoveCard({ columns: newColumns });
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="board"
        type="column"
        direction="horizontal"
      >
        {(provided) => (
          <div
            className="flex gap-6  p-6 min-h-screen bg-gradient-to-br from-purple-200 to-pink-200 w-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((column, index) => (
              <Draggable draggableId={`column-${index}`} index={index} key={index}>
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <Droppable droppableId={index.toString()} type="card">
                      {(dropProvided) => (
                        <Column
                          column={column}
                          columnIndex={index}
                          onEditCard={onEditCard}
                          onDeleteCard={onDeleteCard}
                          onAddCard={onAddCard}
                          innerRef={dropProvided.innerRef}
                          droppableProps={dropProvided.droppableProps}
                          placeholder={dropProvided.placeholder}
                        />
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
