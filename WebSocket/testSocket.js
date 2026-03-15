import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  const orderId = "69b6cc68aa5ed16d81d0bdc5";

  socket.emit("joinOrderRoom", orderId);
});

socket.on("locationUpdate", (data) => {
  console.log("Location update:", data);
});

socket.on("deliveryComplete", (data) => {
  console.log(data);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});