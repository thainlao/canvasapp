'use client'
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LoginLayoutProps {
    children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <motion.div animate={{opacity: 1}} initial={{ opacity: 0}}>
            {children}
        </motion.div>
    );
}