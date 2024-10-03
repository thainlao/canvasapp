import '@/styles/canvas.css';
import { useState } from 'react';

interface LeftItemProps {
}

const LeftItem: React.FC<LeftItemProps> = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: 'Cursor' | 'Text' | 'Sticky' | 'Marker') => {
        setActiveButton(buttonName);
    };

    return (
        <div className='left_table'>
            <button 
                className={activeButton === 'Cursor' ? 'active_button' : ''} 
                onClick={() => handleButtonClick('Cursor')}
            >
                Cursor
            </button>
            <button 
                className={activeButton === 'Text' ? 'active_button' : ''} 
                onClick={() => handleButtonClick('Text')}
            >
                Text
            </button>
            <button 
                className={activeButton === 'Sticky' ? 'active_button' : ''} 
                onClick={() => handleButtonClick('Sticky')}
            >
                Sticky
            </button>
            <button 
                className={activeButton === 'Marker' ? 'active_button' : ''} 
                onClick={() => handleButtonClick('Marker')}
            >
                Marker
            </button>
        </div>
    );
}

export default LeftItem;