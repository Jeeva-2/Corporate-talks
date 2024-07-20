import { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

export default function ChatRoom({ roomId, nickname }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/chatrooms/${roomId}/messages`);
                console.log("🚀 ~ fetchMessages ~ response:", response)
                if (response.status === 500) {
                    alert("invalid user");
                }
                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, [roomId]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const response = await axios.post(`http://localhost:3001/chatrooms/${roomId}/messages`, {
                    userId: nickname,
                    message,
                });
                setMessages([...messages, response.data]);
                setMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow p-6 overflow-auto bg-gray-100">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg max-w-xs break-words ${msg.userId === nickname ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
                                }`}
                        >
                            <strong>{msg.username}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-300">
                <div className="flex items-center">
                    <input
                        type="text"
                        className="flex-grow p-2 mr-2 border rounded-lg"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
