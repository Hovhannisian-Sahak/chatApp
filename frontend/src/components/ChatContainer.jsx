import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
const ChatContainer = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser && currentUser._id,
      to: currentChat && currentChat._id,
      message: msg,
    });
  };
  useEffect(() => {
    const fetchCurrentChat = async () => {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser && currentUser._id,
          to: currentChat && currentChat._id,
        });
        console.log(response);
        setMessages(response.data);
      } catch (error) {
        throw error;
      }
    };
    fetchCurrentChat();
  }, []);
  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div key={message._id}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "reveived"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;
