import io from "socket.io-client";
import { useEffect, useRef } from "react";

export default function useSocketInit({ handleFaceData }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      console.log("socket connected");
    });

    socket.current.on("new-face-data", (data) => {
      console.log(data);
      handleFaceData(data);
    });
  };

  return socket;
}
