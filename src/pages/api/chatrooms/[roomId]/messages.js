// src/pages/api/chatrooms/[roomId]/messages.js
import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const { roomId } = req.query;
    const { db } = await connectToDatabase();

    if (req.method === 'POST') {
        try {
            const { userId, message } = req.body;
            const newMessage = {
                roomId: new ObjectId(roomId),
                userId,
                message,
                timestamp: new Date(),
            };
            const result = await db.collection('messages').insertOne(newMessage);
            res.status(201).json(result.ops[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to send message' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
