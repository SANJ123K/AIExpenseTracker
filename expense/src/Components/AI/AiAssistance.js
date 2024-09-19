import React, { useState } from "react";
import styled from "styled-components";
import { titles } from "../../utils/Categories";
import { useGlobalContext } from "../../context/globalContext";
import ExpenseHistory from "../LogDash/Page3/ExpenseHistory";
import IncomeHistory from "../LogDash/Page2/AddIncomeHistory";
import BarChart from "../Chart/BarChart";

// Mock NLP function to detect intent and extract entities
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  const expenseKeywords = ["expense", "spent", "purchase", "buy", "pay", "payment", "cost", "charge", "bill", "fees", "bought", "traveling"];
  const isExpense = expenseKeywords.some(keyword => lowerMessage.includes(keyword));

  const incomeKeywords = ["income", "salary", "bonus", "investment", "freelance", "rental income", "add-money", "add", "dividends", "interest", "gift", "earn", "get", "sell", "sold"];
  const isIncome = incomeKeywords.some(keyword => lowerMessage.includes(keyword));

  const showKeywords = ["show", "display", "history", "graph", "chart", "logs"];
  const showHistory = showKeywords.some(keyword => lowerMessage.includes(keyword));

  const graphKeywords = ["graph", "chart", "bar chart", "visualize"];
  const isGraph = graphKeywords.some(keyword => lowerMessage.includes(keyword));

  if (showHistory) {
    if (isIncome) {
      return { intent: "showIncome", amount: 0, title: '' };
    }
    if (isExpense) {
      return { intent: "showExpense", amount: 0, title: '' };
    }
  }

  if (isGraph) {
    return { intent: "showGraph" };
  }

  if (isExpense) {
    const amount = parseFloat(message.match(/\d+/));
    const detectedTitle = titles.find(title => lowerMessage.includes(title));

    return { intent: "AddExpense", amount, title: detectedTitle || "unknown" };
  }

  if (isIncome) {
    const amount = parseFloat(message.match(/\d+/));
    const detectedTitle = titles.find(title => lowerMessage.includes(title));

    return { intent: "AddIncome", amount, title: detectedTitle || "unknown" };
  }

  return { intent: "Unknown" };
};

const AiAssistance = () => {
  const { addIncome, addExpense } = useGlobalContext();
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]); // Chat history
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const currentDate = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { intent, amount, title } = detectIntent(message);
    const mongobj = { title, amount, date: currentDate };

    const userMessage = { sender: 'user', text: message };
    let botMessage = { sender: 'bot', text: '' };

    setChatLog([...chatLog, userMessage]);

    if (intent === "showGraph") {
      setShowBar(true);
      setShowIncome(false);
      setShowExpense(false);
      botMessage.text = "Displaying the bar chart.";
    } else if (intent === "showIncome") {
      setShowIncome(true);
      setShowExpense(false);
      setShowBar(false);
      botMessage.text = "Displaying income history.";
    } else if (intent === "showExpense") {
      setShowExpense(true);
      setShowIncome(false);
      setShowBar(false);
      botMessage.text = "Displaying expense history.";
    } else if (intent === "AddExpense") {
      if (amount && title) {
        try {
          addExpense(mongobj);
          botMessage.text = "Expense added successfully!";
        } catch (error) {
          botMessage.text = "Error adding expense.";
        }
      } else {
        botMessage.text = "Sorry, I didn't understand that.";
      }
    } else if (intent === "AddIncome") {
      if (amount && title) {
        try {
          addIncome(mongobj);
          botMessage.text = "Income added successfully!";
        } catch (error) {
          botMessage.text = "Error adding income.";
        }
      } else {
        botMessage.text = "Sorry, I didn't understand that.";
      }
    } else {
      botMessage.text = "Sorry, I didn't understand that.";
    }

    setChatLog([...chatLog, userMessage, botMessage]);
    setMessage(''); // Clear input field
  };

  return (
    <BotStyled>
      <div>
        <h1>Expense & Income Tracker Bot</h1>
        <div className="chat-container">
          {chatLog.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
              <strong>{msg.sender === 'user' ? 'You: ' : 'Bot: '}</strong>{msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="inp"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <button className="btn">Submit</button>
        </form>
      </div>
      {showExpense && <ExpenseHistory />}
      {showIncome && <IncomeHistory />}
      {showBar && <BarChart />}
    </BotStyled>
  );
};

const BotStyled = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .chat-container {
    width: 100%;
    max-width: 500px;
    height: 300px;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow-y: auto;
    padding: 10px;
    margin-bottom: 20px;
    background-color: white;
  }

  .user-msg {
    text-align: left;  /* User messages on the left */
    margin-bottom: 10px;
    color: blue;
  }

  .bot-msg {
    text-align: right;  /* Bot messages on the right */
    margin-bottom: 10px;
    color: green;
  }

  form {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: space-between;

    .inp {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }

    .btn {
      width: 100px;
      height: 40px;
      background-color: #007bff;
      color: white;
      border-radius: 10px;
      margin-left: 10px;
    }
  }
`;

export default AiAssistance;
