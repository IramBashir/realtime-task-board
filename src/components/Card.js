// components/Card.jsx
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, cardIndex }) => {
  return (
    <Draggable draggableId={`${card.text}-${cardIndex}`} index={cardIndex}>
      {(provided) => (
        <div
          className="bg-white rounded-md shadow-sm p-3 mb-3 border border-gray-200 hover:shadow-md transition"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="text-sm text-gray-700">{card.text}</p>
        </div>

      )}
    </Draggable>
  );
};

export default Card;
