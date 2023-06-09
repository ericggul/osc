import io from "socket.io-client";
import { useEffect, useRef } from "react";

export default function useSocketInit({ pageURL }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket.current = io({
      rejectUnauthorized: false,
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.current.on("connect", () => {
      console.log("socket connected");
      socket.current.emit("handle-page-location", pageURL);
    });

    socket.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.current.on("new-handle-screen-to-mobile-location-check-request", () => {
      socket.current.emit("handle-page-location", pageURL);
    });
    console.log(socket.current);
  }

  return socket;
}
