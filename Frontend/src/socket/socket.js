import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("https://connectx-evdy.onrender.com", {
    query: {
      userId,
    },
  });

  return socket;
};

export const getSocket = () => socket;
