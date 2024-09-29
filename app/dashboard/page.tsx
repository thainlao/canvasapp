'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '@/styles/dashboard.css';

export default function Dashboard() {
    const { status, data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    if (status === 'authenticated') {
        return (
            <div className="dashboard">
                <header>
                <div>
                    {data.user?.image && (
                        <Image 
                            src={data.user.image} 
                            alt="User Image" 
                            width={50} 
                            height={50}
                        />
                    )}
                    <h3>{data.user?.name}</h3>
                </div>

                <button 
                    className="logout-button"
                    onClick={() => signOut()}>Log out
                </button>
                </header>
            </div>
        );
    }

    return (
        <div>
            Dashboard
        </div>
    );
}