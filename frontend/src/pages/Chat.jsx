import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(currentUser);
  console.log(contacts);
  useEffect(() => {
    const setCurrent = async () => {
      try {
        console.log("kjhg");
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        }
        setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      } catch (error) {
        console.error("Error setting current user:", error);
        // Handle the error (e.g., redirect to an error page)
      }
    };

    setCurrent(); // Move this outside the try block
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImage) {
            const data = await axios.get(`${usersRoute}/${currentUser._id}`);
            console.log(data);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle the error (e.g., redirect to an error page)
      }
    };

    fetchUsers(); // Move this inside the try block
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    const navToHome = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
    };
    navToHome();
  }, []);
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          handleChatChange={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
