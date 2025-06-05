"use client";
import { askQuestion, fetchHistory } from "./api/api";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "./components/sidebar";
import jsPDF from "jspdf";
import removeMd from "remove-markdown";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = {
    p: ({ node, children }) => (
      <p style={{ lineHeight: "1.6", marginTop: "1rem" }}>{children}</p>
    ),
  };

  function downloadPdf(answer, question = "") {
    const doc = new jsPDF();
    const text = removeMd(answer);
    const lines = doc.splitTextToSize(text, 180);

    let y = 10;
    const lineHeight = 8;
    const pageHeight = doc.internal.pageSize.getHeight();

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - 10) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += lineHeight;
    });

    let titleSource = question.trim();
    if (!titleSource) {
      const answerLines = text.split("\n").filter((line) => line.trim() !== "");
      titleSource = answerLines.length > 0 ? answerLines[0] : "kilimo_answer";
    }

    const shortTitle = titleSource
      .slice(0, 50)
      .replace(/[^a-z0-9\s]+/gi, "")
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();

    const filename = `${shortTitle || "kilimo_answer"}.pdf`;
    doc.save(filename);
  }

  useEffect(() => {
    fetchHistory().then(setChats).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
      const result = await askQuestion(question);
      setAnswer(result);
      setChats((prev) => [...prev, { question, answer: result }]);
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching response");
    }
    setLoading(false);
  };

  const handleSelectChat = (chat) => {
    setQuestion(chat.question);
    setAnswer(chat.answer);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 w-64 border-r dark:border-gray-700 overflow-y-auto transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0 sm:flex`}
      >
        <div className="sm:hidden  flex items-center p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-green-600 text-2xl"
          >
            ☰
          </button>
        </div>

        <Sidebar chats={chats} onSelectChat={handleSelectChat} />
      </div>

      {!sidebarOpen && (
        <button
          className="fixed top-2 left-4 z-50 sm:hidden bg-green-600 text-white p-2 rounded"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-4xl font-bold mt-2">KilimoGPT</h1>
        </div>
<div className="flex flex-col-reverse justify-end max-h-screen max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your farming question..."
              className="w-full px-4 py-3 pr-32 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>
        </form>


        {answer && (
          <div className="mt-6 p-4 max-w-2xl md:min-w-2xl mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow">
            <h2 className="font-semibold mb-2 text-green-600">Answer</h2>
            <ReactMarkdown components={components}>{answer}</ReactMarkdown>
            <button
              onClick={() => downloadPdf(answer)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Download Answer as PDF
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
