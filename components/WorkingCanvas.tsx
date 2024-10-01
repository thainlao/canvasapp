'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import '@/styles/canvas.css';
import { IUser } from '@/lib/types';

const socket = io({ path: '/api/socket' });

export interface WorkingCanvasProps {
    participants: string[] | undefined;
}

const WorkingCanvas: React.FC<WorkingCanvasProps> = ({participants}) => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const username = participants?.find(participant => participant === socket.id) || 'Unknown';

        const handleMouseMove = (event: MouseEvent) => {
            const data = {
                x: event.clientX,
                y: event.clientY,
                userId: socket.id,
                username: username,
            };
            socket.emit('mouseMove', data);
        };

        const handleMouseMoveFromOthers = (data: { userId: string; x: number; y: number; username: string }) => {
            setUsers((prevUsers: IUser[]) => {
                const existingUser = prevUsers.find((user: IUser) => user._id === data.userId);
                if (existingUser) {
                    return prevUsers.map((user: IUser) => 
                        user._id === data.userId ? { ...user, x: data.x, y: data.y, username: data.username } : user
                    );
                } else {
                    return [...prevUsers, { _id: data.userId, x: data.x, y: data.y, username: data.username, email: '', name: '', createdAt: '', }]; // Provide default values for other properties
                }
            });
        };

        socket.on('mouseMove', handleMouseMoveFromOthers);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            socket.off('mouseMove', handleMouseMoveFromOthers);
        };
    }, [participants]);

    useEffect(() => {
        const username = participants?.find(participant => participant === socket.id) || 'Unknown';
        socket.emit('registerUser', username); // Register the username
    }, [participants]);

    return (
        <div className="working_canvas">
            {users.map((user) => (
                <div key={user._id} style={{ position: 'absolute', left: user.x, top: user.y }}>
                    <div className="cursor" />
                    <div className="username" style={{ position: 'absolute', left: user.x, top: user.y }}>
                        <h2>{user.username}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkingCanvas;