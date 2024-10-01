'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '@/styles/dashboard.css';
import CreateBoardModal from "@/components/CreateBoardModel";
import {motion} from 'framer-motion';
import { IBoard } from "@/lib/types";
import LoadingPage from "@/components/LoadingPage";

export default function Dashboard() {
    const { status, data } = useSession();
    const router = useRouter();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [boards, setBoards] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleCreateBoardClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const fetchBoards = async () => {
        if (!data?.user?.name) return;
        setIsLoading(true);
        try {

            const response = await fetch(`/api/boards?createdBy=${data?.user?.name}`,{
                method: 'GET'
            });
            try {
                const boardsData = await response.json();
                setBoards(boardsData);
            } catch(e) {
                console.log(e)
            }
        } catch (error) {
            console.error('Error fetching boards:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        } 
    }, [status, router])

    useEffect(() => {
        fetchBoards()
    },[status, data])

    const updateBoards = (newBoard: any) => {
        setBoards((prevBoards) => [...prevBoards, newBoard]);
    };

    if (isLoading) return <LoadingPage />

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


                <div className="text_buttons_section">
                    <h2>Working Boards</h2>
                    <button onClick={handleCreateBoardClick}>Create Board</button>
                </div>


                <motion.section 
                    className="all_section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }} 
                    transition={{ duration: 0.5 }} 
                >
                    <div className="box1"></div>
                    {boards.length > 0 ? (
                        <ul>
                            {boards.map((board: IBoard) => (
                                <motion.li 
                                    className="motionli"
                                    key={board._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => router.push(`/boards/${board._id}`)}
                                >
                                    <h1>{board.name}</h1>
                                    <h2>{board.fieldOfWork}</h2>
                                </motion.li>
                            ))}
                        </ul>
                    ) : (
                        <p>You don't have working boards, so start to develop something special</p>
                    )}
                    <div className="box2"></div>
                    <div className="box3"></div>
                </motion.section>
                <CreateBoardModal onBoardCreated={updateBoards} isOpen={isModalOpen} onClose={closeModal} />
            </div>
        );
    }
}