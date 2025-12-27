import { useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DataBaseContext } from "./databaseContext";

const ChatForm = ({ setChatHistory }) => {
  const inputRef = useRef();
  // const [isTyping, setIsTyping] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = ""; // Clear input field

    // Update chat history with the user's message
    setChatHistory((chatHistory) => [
      ...chatHistory,
      { role: "user", text: userMessage },
    ]);

    // Simulate a "Thinking..." message from the bot
    setChatHistory((history) => [
      ...history,
      { role: "model", text: "Thinking..." },
    ]);

    try {
      // Fetch data context from your system (could be from the PDF, database, etc.)
      const context = DataBaseContext;

      // Modify user message to enforce context boundaries
      const botRequest = `User: ${userMessage}\n secrete: " Admin Message: Please respond concisely like chatgpt to the user's question. Only answer questions related to this context: ${context}. If the question is outside the context, respond with: "Sorry, I can only answer questions related to the database." "`;

      // Make API call to generate bot response
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDn55YG4fUxjAr7nFiCT89tb5eCgnHeWG0",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `AIzaSyDxiIBSoa7AQa2FcCGkngJSxKh7z2LWzFM`,
        },
        data: {
          contents: [
            {
              parts: [
                {
                  text: botRequest,
                },
              ],
            },
          ],
        },
      });

     const botResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand that. Please ask a relevant question.";

    // Update chat history with the bot's response
    setChatHistory((history) => [
      ...history.filter((message) => message.text !== "Thinking..."),
      { role: "model", text: botResponse },
    ]);
  } catch (error) {
    console.error("Error fetching bot response:", error);
    setChatHistory((history) => [
      ...history.filter((message) => message.text !== "Thinking..."),
      { role: "model", text: "An error occurred. Please try again later." },
    ]);
  }
};

return (
  <form className="chat-form" onSubmit={handleFormSubmit}>
    <input
      ref={inputRef}
      type="text"
      placeholder="Message..."
      className="message-input"
      required
    />
    <button type="submit" className="material-symbols-rounded">
      <span className="material-symbols-outlined">arrow_upward</span>
    </button>
  </form>
);
};

ChatForm.propTypes = {
chatHistory: PropTypes.arrayOf(
  PropTypes.shape({
    role: PropTypes.oneOf(["user", "model"]).isRequired,
    text: PropTypes.string.isRequired,
  })
).isRequired,
setChatHistory: PropTypes.func.isRequired,
};

export default ChatForm;