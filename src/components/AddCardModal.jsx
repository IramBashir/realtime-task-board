// components/AddCardModal.jsx
import { useState } from 'react';
import { useBoard } from '../context/BoardContext';

const AddCardModal = ({ closeModal, columnIndex }) => {
  const [text, setText] = useState('');
  const { board, setBoard } = useBoard();

  const handleAdd = () => {
    if (!text.trim()) return;

    const updatedBoard = { ...board };
    updatedBoard.columns[columnIndex].cards.push({ text });

    setBoard(updatedBoard); // optimistic update
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h3 className="font-semibold text-lg mb-4">Add New Card</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task details..."
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-1 text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
