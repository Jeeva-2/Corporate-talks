// src/pages/chatrooms/[roomId].js
import { useRouter } from 'next/router';
import ChatRoom from '@/components/ChatRoom';

const Room = () => {
    const router = useRouter();
    const { roomId } = router.query;
    const { userId } = router.query;

    if (!roomId) {
        return <p>Loading...</p>;
    }

    return <ChatRoom roomId={roomId} nickname={userId ? userId : '667ef54bd1cf143a1a6b60e5'} />;
};

export default Room;
