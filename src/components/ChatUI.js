import {
  Bot,
  MessageSquare,
  RefreshCw,
  Search,
  User,
  Users,
  X,
  Clock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatUI = ({ db, chats, onLoadChats }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef(null);

  // Filter chats based on search term
  const filteredChats = chats;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatMessages = async (chatId) => {
    if (!db || !chatId) return;

    setLoading(true);
    try {
      const snapshot = await db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("createdAt", "asc")
        .get();

      const messagesData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({
          id: doc.id,
          ...data,
        });
      });

      setMessages(messagesData);
      setSelectedChatId(chatId);
      setShowChatList(false); // Hide chat list on mobile when chat is selected
    } catch (error) {
      console.error("Error loading chat messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "-";
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleString();
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat List Sidebar */}
      <div
        className={`${
          showChatList ? "flex" : "hidden"
        } sm:flex flex-col w-full sm:w-80 border-r border-gray-200`}
      >
        {/* Chat List Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chats
            </h3>
            <button
              onClick={onLoadChats}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No chats found</p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChatMessages(chat.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChatId === chat.id ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chat.deviceName || chat.id || "Unknown User"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage || "No messages"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-400">
                        {formatTimestamp(
                          chat.lastMessageTime || chat.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div
        className={`${
          !showChatList ? "flex" : "hidden"
        } sm:flex flex-col flex-1`}
      >
        {selectedChatId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowChatList(true)}
                    className="sm:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <User className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedChat.deviceName ||
                      selectedChat.id ||
                      "Unknown User"}
                  </h3>
                </div>
                <div className="text-sm text-gray-500">
                  {messages.length} messages
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-32 text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No messages in this chat</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.user === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.user === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.user === "user" ? (
                          <User className="w-4 h-4 mt-1 flex-shrink-0" />
                        ) : (
                          <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">
                            {message.text}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              message.user === "user"
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTimestamp(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a chat to start messaging
              </h3>
              <p className="text-gray-600">
                Choose a chat from the sidebar to view and send messages
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
