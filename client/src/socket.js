import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Ensure backend is on port 4000
export default socket;
