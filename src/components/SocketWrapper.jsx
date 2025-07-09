import { useEffect, useCallback  } from 'react';
import { useBoard } from '../context/BoardContext';
import useSocket from '../hooks/useSocket';
import Board from './Board';
  import { ErrorBoundary } from 'react-error-boundary';

const SocketWrapper = () => {
  const { board, setBoard } = useBoard();
  console.log("Rendering board with state:", board);
  const ErrorFallback = () => <div>Board failed to load</div>;

 
  useEffect(() => {
    console.log("Board state changed:", board);
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
      console.error("Socket error: rolling back", e);
      setBoard(prev); // rollback on failure
    }
  };

  return ( // Wrap your Board component:
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Board columns={board.columns} onMoveCard={handleMoveCard} />
    </ErrorBoundary>
    // <Board columns={board.columns} onMoveCard={handleMoveCard} />
  );
};

export default SocketWrapper;
