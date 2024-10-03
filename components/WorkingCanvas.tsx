'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import '@/styles/canvas.css';
import { ICursor, WorkingCanvasProps } from '@/lib/types';
import { generateRandomColor } from '@/lib/functions';
import LeftItem from './LeftItem';
const socket = io({ path: '/api/socket' });

const WorkingCanvas: React.FC<WorkingCanvasProps> = ({ participants, currentUserName }) => {
    const [cursors, setCursors] = useState<{ [key: string]: ICursor }>({});

    let userColor = generateRandomColor();
    useEffect(() => {
        socket.on("cursorMovement", (data) => {
            setCursors((prev) => ({
                ...prev,
                [data.id]: { x: data.x, y: data.y, name: data.name, color: data.color }
            }));
        });

        return () => { socket.off("cursorMovement"); };
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        socket.emit("cursorMovement", {
            x, y, name: currentUserName, color: userColor
        });
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => { document.removeEventListener('mousemove', handleMouseMove); };
    }, []);

    return (
        <div className='canvas-container'>
            <div className="working_canvas">
                <LeftItem />
                {Object.entries(cursors).map(([id, { x, y, name, color }]) => (
                    <div className='user_cursor' key={id} style={{ position: 'absolute', left: x, top: y }}>
                        <div className="cursor" style={{ backgroundColor: color }} />
                        <h2 className='user_name' style={{ color }}>{name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkingCanvas;
