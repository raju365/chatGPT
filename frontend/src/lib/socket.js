import { io } from "socket.io-client";

const socket = io("https://orivai.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;