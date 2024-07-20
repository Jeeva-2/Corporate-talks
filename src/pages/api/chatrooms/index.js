// src/pages/api/chatrooms/index.js
import { connectToDatabase } from '@/utils/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const chatRooms = await db.collection('chatrooms').find({}).toArray();
    res.status(200).json(chatRooms);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const newRoom = await db.collection('chatrooms').insertOne({ name });
    res.status(201).json(newRoom.ops[0]);
  } else {
    res.status(405).end();
  }
};
