'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '@/styles/modal.css';
import { useSession } from 'next-auth/react';
import { CreateBoardModalProps } from '@/lib/types';

const modalVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: { opacity: 1, y: '0' },
    exit: { opacity: 0, y: '100vh' },
};

const fieldsOfWork = [
    'UX Research',
    'Marketing',
    'Sales',
    'Design',
    'Product Manager',
    'Agile Coach',
    'Scrum Master',
    'Analytics',
    'Data Science',
    'IT Services',
    'HR',
    'Research',
    'Others'
];

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose, onBoardCreated }) => {
    const { data } = useSession();
    const [selectedField, setSelectedField] = useState<string>('');
    const [boardName, setBoardName] = useState('');

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!isOpen) return null;
    const isButtonDisabled = !selectedField || !boardName;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    const handleCreateBoard = async () => {
        const response = await fetch('/api/boards', {
            method: 'POST',

            body: JSON.stringify({
                name: boardName,
                fieldOfWork: selectedField,
                createdBy: data?.user?.name
            }),
        });

        try {
            const boardData = await response.json();
            onBoardCreated(boardData)
            onClose();
        } catch (e) {
            console.log('Ошибка:', e);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <motion.div
                className="modal-content"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onAnimationComplete={(definition) => {
                    if (definition === 'exit') {
                        onClose();
                    }
                }}
            >
                <h2>Welcome, {data?.user?.name}</h2>
                <h3>Quick questions to improve us for you</h3>

                <input 
                    placeholder='Board name...'
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                />

                <label htmlFor="field-of-work">Select your Field of Work:</label>
                <select
                    id="field-of-work"
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    required
                >
                    <option value="" disabled>Select an option</option>
                    {fieldsOfWork.map((field) => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
                <button className='close_but' onClick={onClose}>✖</button>

                <button 
                    className='create_board'
                    disabled={isButtonDisabled}
                    onClick={handleCreateBoard}
                >
                    Create Board
                </button>
            </motion.div>
        </div>
    );
}

export default CreateBoardModal;
