import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data/board.json');

export const readBoardFromFile = () => {
  if (!fs.existsSync(filePath)) {
    // fallback default board
    return {
      columns: [
        { title: "To Do", cards: [] },
        { title: "In Progress", cards: [] },
        { title: "Done", cards: [] }
      ]
    };
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};
