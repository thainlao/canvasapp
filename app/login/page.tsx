'use client'
import { signIn, useSession } from "next-auth/react"
import '@/styles/login.css';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {motion} from 'framer-motion';

export default function Login(){
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard')
        }
    },[status, router])

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

    return (
        <div className="login">
            <section>
                <h1>Sign In</h1>
                <h2>choose an authorization method that is convenient for you</h2>
                
                <div className="buttons">
                    <button onClick={() => signIn('google')} className="google_button">
                        <img src="https://authjs.dev/img/providers/google.svg"/>
                        <span>Sign in with Google</span>
                    </button>

                    <button onClick={() => signIn('github')} className="github_button">
                        <img src="https://authjs.dev/img/providers/github.svg"/>
                        <span>Sign in with Github</span>
                    </button>
                </div>
            </section>

            <section>
                <div className="section_two_text">
                    <motion.h4 {...buildAnimation}>BUILD</motion.h4>
                    <motion.h4 {...togetherAnimation}>TOGETHER</motion.h4>
                </div>

                <h5>collaboration working platform created with ai</h5>
            </section>
        </div>
    )
}