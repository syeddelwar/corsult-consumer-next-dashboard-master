import React, { useEffect } from "react";

const Receiver = () => {
  useEffect(() => {
    // Add event listener to receive messages from the sender
    window.addEventListener("message", (event) => {
      if (event.origin === "http://localhost:3000") {
        const receivedMessage = event.data;
        localStorage.setItem("receiver", receivedMessage);
        // Display the received message in the HTML
        document.getElementById("message").textContent = receivedMessage;
      }
    });
  }, []);
  return (
    <div className="border-4">
      <h1>Receiver Window</h1>
      <p>
        This document is on the domain: http://localhost:3000 (Consumer App)
      </p>
      <div id="message"></div>
    </div>
  );
};

export default Receiver;
