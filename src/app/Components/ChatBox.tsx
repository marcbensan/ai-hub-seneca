"use client"
import React, { useState, useEffect } from "react";
import Message from "./Message";
import 'bootstrap/dist/css/bootstrap.css'
import "../globals.css"

interface Props {
    apiRoute: string,
    model: string
}

function ChatBox(props : Props) {
  const {apiRoute, model} = props;
  const [messages, setMessages] = useState([{ text: "", sender: "" }]); //array of messages
  const [inputValue, setInputValue] = useState("");

  const responseFetcher = async() => {
    const response = await fetch(apiRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputValue,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return response.json();
  }

  const  handleMessageSend = async () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);
      setInputValue("");
     
      try {
        const data = await responseFetcher();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: model },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container mt-5 chatbox flex-grow-1 d-flex">
      <div className="card chatbox-card flex-grow-1 ">
        <div className="card-body messages chatbox-messages bg-[#2e3337]">
          {messages.map(
            (
              message,
              index
            ) => (
              <Message
                key={index}
                index={index}
                sender={message.sender}
                text={message.text}
              />
            )
          )}
        </div>
        <div className="card-footer container-fluid d-flex input chatbox-input">
          <input
            type="text"
            className="form-control"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={handleMessageSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;