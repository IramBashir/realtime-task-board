// pages/api/socket.js
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';

let boardState = {
  columns: [],
};

const filePath = path.resolve('./data/board.json');

// Load from file on first request
if (fs.existsSync(filePath)) {
  boardState = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export default function handler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/socket',
  });

  res.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.emit('init', boardState); // send board state to new client

    socket.on('update', (newState) => {
    if (
        !newState ||
        !newState.columns ||
        !Array.isArray(newState.columns) ||
        newState.columns.length === 0
    ) {
        console.warn('Rejected empty or invalid board state');
        return;
    }

    boardState = newState;
    fs.writeFileSync(filePath, JSON.stringify(boardState, null, 2));
    socket.broadcast.emit('update', boardState);
    });
  });

  res.end();
}
