import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true,
});

socket.on("connect", () => {
    console.log("✅ Connected:", socket.id);
});
socket.onAny((event, ...args) => {
    console.log("📨 Event:", event, args);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected");
});


export default socket;