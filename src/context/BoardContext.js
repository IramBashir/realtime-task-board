// context/BoardContext.js
import { createContext, useState, useContext } from 'react';

const BoardContext = createContext();

export const BoardProvider = ({ children, initialState }) => {
  const [board, setBoard] = useState(initialState || { columns: [] });

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
