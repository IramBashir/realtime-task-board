// pages/index.js
import dynamic from 'next/dynamic';
import { BoardProvider } from '../context/BoardContext';
import { readBoardFromFile } from '../lib/board';
import '../styles/globals.css';  

const SocketWrapper = dynamic(() => import('../components/SocketWrapper'), {
  ssr: false, // socket runs client-side only
});

export default function Home({ initialBoard }) {
  return (
    <BoardProvider initialState={initialBoard}>
      <SocketWrapper />
    </BoardProvider>
  );
}

export async function getServerSideProps() {
  const initialBoard = readBoardFromFile();
  return {
    props: {
      initialBoard,
    },
  };
}
