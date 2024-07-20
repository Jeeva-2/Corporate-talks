// src/pages/chatrooms.js

import Link from 'next/link';

export default function Chatrooms() {
  const chatRooms = [
    { id: '667ef1978bf83cd76433e9c1', name: 'General Chat' },
    { id: '667ef550d1cf143a1a6b60e7', name: 'Tech Talk' },
  ];

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <Link href={`/chatrooms/${room.id}`}>
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
