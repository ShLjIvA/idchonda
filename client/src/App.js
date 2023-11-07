import React, { useState, useEffect } from "react";
import socketIO from 'socket.io-client';
import axios from "axios";

 const socket = socketIO.connect('http://localhost:3001');

function App() {
  const [status, setStatus] = useState({});
  
  console.log("ALO")
  useEffect(() => {
    socket.on("status", (data) => setStatus(data));
  }, [socket]);

  return (
    <ul>
      <li>ID: {status.id ?? "/"}</li>
      <li>KM: {status.km ?? "/"}</li>
      <li>LAT: {status.lat ?? "/"}</li>
      <li>LNG: {status.lng ?? "/"}</li>
      <li>DATE: {status.date ?? "/"}</li>
    </ul>
  );
}

export default App;
