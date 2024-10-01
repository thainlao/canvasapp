'use client'
import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import '@/styles/modal.css'

const modalVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: { opacity: 1, y: '0' },
    exit: { opacity: 0, y: '100vh' },
};

export interface IProps {
    isOpen: any;
    onClose: any;
    boardId: string | undefined;
}


const ModalInvide: React.FC<IProps> =({isOpen, onClose, boardId}) => {
    const [isCopied, setIsCopied] = useState(false);

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

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const handleCopy = () => {
        const textToCopy = `localhost:3000/boards/${boardId}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <motion.div
            className='modal-content'
            initial="hidden"
            variants={modalVariants}
            animate="visible"
            exit="exit"
            >
                <h6>Invite to join your team</h6>
                <div className='copy_section'>
                    <label>{process.env.CLIENT_URL}/boards/{boardId}</label>
                    <button onClick={handleCopy} style={{ color: isCopied ? 'white' : 'white' }}>
                        {isCopied ? 'Copied! ✔️' : 'Copy'}
                    </button>
                </div>
                <button className='close_but' onClick={onClose}>✖</button>
            </motion.div>
        </div>
    )
}

export default ModalInvide;