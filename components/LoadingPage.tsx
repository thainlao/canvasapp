import { motion } from 'framer-motion';
import '@/styles/loading.css';

export default function LoadingPage() {
    return (
        <motion.div 
            className="loading-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="loader-eight">
                <motion.div 
                    className="eight"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}
