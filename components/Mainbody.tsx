'use client'
import Image from 'next/image';
import '../styles/mainbody.css';
import myImg from '@/assets/jason-goodman-Oalh2MojUuk-unsplash.jpg';
import {motion} from 'framer-motion';
import { useRouter } from 'next/navigation';

const buildAnimation = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7 }
};

const togetherAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7 }
};

export default function Mainpage(){
    const router = useRouter();
    return (
    <div className="mainpage">
        <header>
            <h1>Eclipse Workspace</h1>

            <div>
                <a href='/contact'>contact</a>
                <a href='/about'>about</a>
                <button className='main_button' onClick={() => router.push('/dashboard')}>Start</button>
            </div>
        </header>

        <section className='central_section'>
            <motion.div {...buildAnimation} className='text_section'>
                <div>
                    <h2><span>T</span>urn your plans</h2>
                    <h2>into <span>reality</span></h2>
                </div>

                <h4>absolutely free tool to build your project with your team</h4>

                <button className='main_button' onClick={() => router.push('/dashboard')}>Build</button>
            </motion.div>

            <motion.img alt='something' width={500} height={500} src={myImg as any}/>
        </section>
    </div>
    )
}