// components/Column.jsx
import Card from './Card';
import AddCardModal from './AddCardModal';
import { useState } from 'react';

const Column = ({ column, columnIndex, onEditCard, onDeleteCard, onAddCard, innerRef, droppableProps, placeholder,}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-yellow-100 rounded-xl shadow-lg p-4 w-80 min-w-[20rem]"  
      ref={innerRef}
      {...droppableProps}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          + Add
        </button>
      </div>

      <div className="min-h-[10px]">
        {column.cards.map((card, idx) => (
          <Card
            key={card.id}
            card={card}
            cardIndex={idx}
            onEditCard={(cardIdx, newText) => onEditCard(columnIndex, cardIdx, newText)}
            onDeleteCard={(cardIdx) => onDeleteCard(columnIndex, cardIdx)}
          />
        ))}
        {placeholder}
      </div>

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
