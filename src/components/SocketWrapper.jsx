import { useEffect, useCallback  } from 'react';
import { useBoard } from '../context/BoardContext';
import useSocket from '../hooks/useSocket';
import Board from './Board';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 as uuidv4 } from 'uuid'; 

const SocketWrapper = () => {
  const { board, setBoard } = useBoard();
  const ErrorFallback = () => <div>Board failed to load</div>;

 
  useEffect(() => {
  }, [board]);
  
  const deepEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const handleSocketUpdate = useCallback((newBoard) => {
    if (!newBoard || !Array.isArray(newBoard.columns) || newBoard.columns.length === 0) {
      console.warn("Ignoring empty board update from socket");
      return;
    }

    if (!deepEqual(newBoard, board)) {
      console.log("Updating board from socket");
      setBoard(newBoard);
    } else {
      console.log("Skipping identical board update");
    }
  }, [board, setBoard]);


  
  
  const { sendUpdate } = useSocket(handleSocketUpdate);

  const handleMoveCard = (updatedBoard) => {
    const prev = board;
    setBoard(updatedBoard); // optimistic update

    try {
      sendUpdate(updatedBoard); // sync to server
    } catch (e) {
      setBoard(prev); // rollback on failure
    }
  };

  const handleEditCard = (columnIndex, cardIndex, newText) => {
    const prev = board;
    const updatedBoard = {
      ...board,
      columns: board.columns.map((col, idx) => {
        if (idx !== columnIndex) return col;
        return {
          ...col,
          cards: col.cards.map((card, cIdx) =>
            cIdx === cardIndex ? { ...card, text: newText } : card
          ),
        };
      }),
    };

    setBoard(updatedBoard);
    try {
      sendUpdate(updatedBoard);
    } catch (e) {
      console.error("Edit failed, rolling back", e);
      setBoard(prev);
    }
  };

  const handleDeleteCard = (columnIndex, cardIndex) => {
    const prev = board;
    const updatedBoard = {
      ...board,
      columns: board.columns.map((col, idx) => {
        if (idx !== columnIndex) return col;
        return {
          ...col,
          cards: col.cards.filter((_, cIdx) => cIdx !== cardIndex),
        };
      }),
    };

    setBoard(updatedBoard);
    try {
      sendUpdate(updatedBoard);
    } catch (e) {
      console.error("Delete failed, rolling back", e);
      setBoard(prev);
    }
  };

  const handleAddCard = (columnIndex, newCard) => {
    const prev = board;
    const updatedColumns = [...board.columns];
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      cards: [...updatedColumns[columnIndex].cards, newCard],
    };

    const newBoard = { columns: updatedColumns };
    setBoard(newBoard);

    try {
      sendUpdate(newBoard);
    } catch (e) {
      console.error("Add card failed, rolling back", e);
      setBoard(prev);
    }
  };

  return ( 
    // Wraping  Board component
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Board 
        columns={board.columns} 
        onMoveCard={handleMoveCard}
        onEditCard={handleEditCard}
        onDeleteCard={handleDeleteCard} 
        onAddCard={handleAddCard}
      />
    </ErrorBoundary>
  );
};

export default SocketWrapper;
