import React, { useState } from "react";
import axios from "axios";
import Header from "../../../components/Home/Header";
import Footer from "../../../components/Home/Footer";

// Placeholder for API endpoints
const feedbackAPI = "https://api.example.com/submit-feedback";
const faqData = [
  { question: "How do I set up my account?", answer: "To set up your account, go to Settings..." },
  { question: "How can I change my salary expectations?", answer: "Navigate to Salary Settings to adjust..." },
  // Add more FAQs as needed
];

const SupportFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState({ rating: 0, comments: "" });

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

  return (
    <>
      <Header />
      <main className="mt-32 mx-auto">
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Support and Feedback</h2>

          {/* In-App Support Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">In-App Support</h3>
            
            {/* FAQs */}
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-semibold text-gray-900 mb-1">{faq.question}</p>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Feedback Mechanism Section */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  // value={feedback.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
                <label className="block text-gray-700 mb-2 font-medium">Rate your experience</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFeedback({ ...feedback, rating: num })}
                      className={`w-10 h-10 rounded-full transition duration-150 ease-in-out border ${
                        feedback.rating >= num
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-yellow-100"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comments" className="block text-gray-700 mb-2 font-medium">Comments</label>
                <textarea
                  id="comments"
                  value={feedback.comments}
                  onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                  placeholder="Leave your suggestions or feedback here..."
                  className="w-full h-28 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition duration-150 ease-in-out"
              >
                Submit Feedback
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SupportFeedback;
