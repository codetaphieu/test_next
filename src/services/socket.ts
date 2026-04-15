import { io, Socket } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      autoConnect: false, // Tự kết nối khi vào bàn chơi
      auth: (cb) => {
        // Gửi kèm JWT token để backend (NestJS) xác thực socket
        const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
        cb({ token });
      }
    });
  }
  return socket;
};