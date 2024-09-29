'use client'
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <motion.div animate={{opacity: 1}} initial={{ opacity: 0}}>
            {children}
        </motion.div>
    );
}