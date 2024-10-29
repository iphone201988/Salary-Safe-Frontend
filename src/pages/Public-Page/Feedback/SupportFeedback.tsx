import React, { useState } from "react";
import axios from "axios";

// Placeholder for API endpoints
const feedbackAPI = "https://api.example.com/submit-feedback";
const faqData = [
  { question: "How do I set up my account?", answer: "To set up your account, go to Settings..." },
  { question: "How can I change my salary expectations?", answer: "Navigate to Salary Settings to adjust..." },
  // Add more FAQs as needed
];

const SupportFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState({ rating: 0, comments: "" });
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");

  // Handle feedback submission
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(feedbackAPI, feedback);
      alert("Thank you for your feedback!");
      setFeedback({ rating: 0, comments: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Handle chat message submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, chatInput]);
      setChatInput("");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-8">Support and Feedback</h2>

      {/* In-App Support Section */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">In-App Support</h3>
        
        {/* FAQs */}
        <div className="mb-8">
          <h4 className="text-xl font-medium mb-4">Frequently Asked Questions</h4>
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{faq.question}</p>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Chat Support */}
        <div className="border rounded-md p-4 mb-8 bg-gray-50">
          <h4 className="text-xl font-medium mb-4">Chat Support</h4>
          <div className="h-40 overflow-y-auto mb-4">
            {chatMessages.map((message, index) => (
              <p key={index} className="p-2 bg-green-100 rounded-md mb-2">{message}</p>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow px-4 py-2 border rounded-l-md"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Feedback Mechanism Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Feedback</h3>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Rate your experience</label>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setFeedback({ ...feedback, rating: num })}
                  className={`w-10 h-10 rounded-full border ${
                    feedback.rating >= num ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Comments</label>
            <textarea
              value={feedback.comments}
              onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
              placeholder="Leave your suggestions or feedback here..."
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
          >
            Submit Feedback
          </button>
        </form>
      </section>
    </div>
  );
};

export default SupportFeedback;
