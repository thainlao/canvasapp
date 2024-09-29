'use client'
import '../app/styles/header.css';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header(){
    const {status} = useSession();

    if (status === 'loading') {
        return <div>loading</div>
    }

    return (
        <div className='header'>
            <a href='/'>LOGO</a>
            {status === 'authenticated' 
            ? 
            <button onClick={() => signOut()}>выйти</button>   
            : 
            <button onClick={() => signIn()}>Войти</button>}
        </div>
    )
}