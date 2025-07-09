import { useEffect,useState, useRef } from 'react';
import io from 'socket.io-client';


const useSocket = (onUpdate) => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io({
      path: '/api/socket',
    });

    socket.current.on('init', onUpdate);
    socket.current.on('update', onUpdate);

    return () => {
      socket.current.disconnect();
    };
  }, [onUpdate]);

  const sendUpdate = (newState) => {
    socket.current.emit('update', newState);
  };
// Add connection state tracking
const [isConnected, setIsConnected] = useState(false);

useEffect(() => {
  socket.current = io({
    path: '/api/socket',
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.current.on('connect', () => setIsConnected(true));
  socket.current.on('disconnect', () => setIsConnected(false));

  return () => {
    socket.current.disconnect();
  };
}, []);
  return { sendUpdate, isConnected };
};

export default useSocket;
