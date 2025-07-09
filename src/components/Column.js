// components/Column.jsx
import Card from './Card';
import AddCardModal from './AddCardModal';
import { useState } from 'react';

const Column = ({ column, columnIndex }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-yellow-100 rounded-xl shadow-lg p-4 w-80 min-w-[20rem]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          + Add
        </button>
      </div>



      <div>
        {column.cards.map((card, idx) => (
          <Card key={idx} card={card} cardIndex={idx} />
        ))}
      </div>

      {showModal && (
        <AddCardModal
          closeModal={() => setShowModal(false)}
          columnIndex={columnIndex}
        />
      )}
    </div>
  );
};

export default Column;
