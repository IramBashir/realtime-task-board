// components/Card.jsx
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, cardIndex, onEditCard, onDeleteCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(card.text);

  const handleSave = () => {
    onEditCard(cardIndex, newText);
    console.log("saving card: ", cardIndex, newText);
    setIsEditing(false);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={cardIndex}>
        {(provided) => (
          <div
            className="bg-white rounded-md shadow-sm p-3 mb-3 border border-gray-200 hover:shadow-md transition relative"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p className="text-sm text-gray-700">{card.text}</p>
            <div className="absolute top-1 right-1 flex gap-1">
              <button
                className="text-xs text-blue-600 hover:underline"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="text-xs text-red-500 hover:underline"
                onClick={() => onDeleteCard(cardIndex)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-2">Edit Card</h2>
            <input
              type="text"
              value={newText}
              onChange={(e) => {
                setNewText(e.target.value)
                console.log("on change card: ",e.target.value);
              }}
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
