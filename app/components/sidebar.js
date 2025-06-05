"use client";
export default function Sidebar({ chats = [], onSelectChat }) {
  return (
    <aside className="w-full sm:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen overflow-y-auto">
      <div className="p-2 text-lg font-bold text-green-600">Chat History</div>

      <ul className="space-y-1 p-4">
        {chats.length === 0 && (
          <li className="text-sm text-gray-500">No previous chats</li>
        )}
        {chats.map((chat, idx) => (
          <li
            key={idx}
            onClick={() => onSelectChat(chat)}
            className="cursor-pointer text-sm p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition border border-gray-300"
          >
            {chat.question.slice(0, 40)}...
          </li>
        ))}
      </ul>
    </aside>
  );
}
