import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.resolve('./data/board.json');

export const readBoardFromFile = () => {
  if (!fs.existsSync(filePath)) {
    // fallback default board
    return {
      columns: [
        { id: uuidv4(), title: "To Do", cards: [] },
        { id: uuidv4(), title: "In Progress", cards: [] },
        { id: uuidv4(), title: "Done", cards: [] }
      ]
    };
  }

  const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data);

    // Add IDs if missing
    parsed.columns = parsed.columns.map(col => ({
      id: col.id || uuidv4(),
      ...col,
    }));
  return parsed;
};
