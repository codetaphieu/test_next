import { io, Socket } from "socket.io-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

let gameSocket: Socket | null = null;

export const getGameSocket = () => {
  if (!gameSocket) {
    gameSocket = io(`${BACKEND_URL}/game`, {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });
  }

  return gameSocket;
};
