import React, { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat'; // Chat icon from Material UI
import axios from 'axios'; // Import axios
import styled from 'styled-components';

// Styled-components for the floating button and chat window
const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const MessageContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
`;

const TextInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SendButton = styled.button`
  width: 20%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 5px;
`;

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Toggle the chat window
  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle sending a message to the Azure QnA API
  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { sender: 'user', text: userInput };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await axios.post(
        'https://chatbotinstance.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=qna&api-version=2021-10-01&deploymentName=test',
        {
          question: userInput, 
        },
        {
          headers: {
            'Ocp-Apim-Subscription-Key': '117f956fff5941d8bb9a8f9e1fe35978', 
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        sender: 'bot',
        text: response.data.answers[0].answer,
      };
      setChatHistory([...chatHistory, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
      setChatHistory([...chatHistory, userMessage, errorMessage]);
    }

    setUserInput('');
  };

  return (
    <>
      <FloatingButton onClick={toggleChatWindow}>
        <ChatIcon style={{ fontSize: '30px' }} />
      </FloatingButton>

      <ChatWindow isOpen={isOpen}>
        <h2>Chatbot</h2>
        <MessageContainer>
          {chatHistory.map((msg, index) => (
            <p key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <strong>{msg.sender === 'user' ? 'You' : 'Bot'}: </strong>{msg.text}
            </p>
          ))}
        </MessageContainer>

        <InputContainer>
          <TextInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your question..."
          />
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputContainer>
      </ChatWindow>
    </>
  );
};

export default ChatbotIcon;
