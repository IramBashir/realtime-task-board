// components/Column.jsx
import Card from './Card';
import AddCardModal from './AddCardModal';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, columnIndex, onEditCard, onDeleteCard, onAddCard, dragHandleProps }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-yellow-100 rounded-xl shadow-lg p-4 w-80 min-w-[20rem]">
      <div {...dragHandleProps} className="flex justify-between items-center mb-3 cursor-grab">
        <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            + Add
          </button>
      </div>

        <Droppable droppableId={column.id} type="card">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[10px]"
            >
            {column.cards.map((card, idx) => (
              <Card
                key={card.id}
                card={card}
                cardIndex={idx}
                onEditCard={(cardIdx, newText) => onEditCard(columnIndex, cardIdx, newText)}
                onDeleteCard={(cardIdx) => onDeleteCard(columnIndex, cardIdx)}
              />
            ))}
            {provided.placeholder}
          </div>
          )}
        </Droppable>

      {showModal && (
        <AddCardModal
          closeModal={() => setShowModal(false)}
          columnIndex={columnIndex}
          onAddCard={onAddCard}
        />
      )}
    </div>
  );
};

export default Column;
