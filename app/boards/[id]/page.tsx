'use client';
import { useEffect, useState } from "react";
import '@/styles/working_board.css'
import { signOut, useSession } from "next-auth/react";
import LoadingPage from "@/components/LoadingPage";
import ModalInvide from "@/components/ModalInvite";
import { useRouter } from "next/navigation";
import WorkingCanvas from "@/components/WorkingCanvas";
import { IBoard } from "@/lib/types";

const BoardDetail = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [board, setBoard] = useState<IBoard | null>(null);
    const { status, data } = useSession();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleCreateBoardClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const fetchBoard = async () => {
            if (id) {
                setLoading(true)
                const response = await fetch(`/api/board?id=${id}`,{
                    method: "GET"
                });
                try {
                    const boardData = await response.json();
                    setBoard(boardData);
                } catch(e) {
                    console.log(e)
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBoard();
    }, [id]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/login?redirect=/boards/${id}`);
        } else if (board && data?.user?.name) {
            if (!board.participants.includes(data?.user?.name)) {
                const addUserToBoard = async () => {
                    await fetch(`/api/board/${id}/add-participant`, {
                        method: 'POST',
                        body: JSON.stringify({ user: data.user?.name }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                };
                addUserToBoard();
            }
        }
    }, [status, router, data, board])
    
    if (loading) return <LoadingPage />;

    return (
        <div className="working_board">
            <header>
                <div>
                    <a href="/">Title</a>
                    <a href="/dashboard">Your boards</a>
                    <h1 className="name_board">{board?.name}</h1>
                </div>

                <div>
                    <h1>all users</h1>
                    <div className="participants">
                        {board?.participants.map((participant: string) => {
                            const initials = participant.split(' ')
                                .map(name => name.charAt(0).toUpperCase())
                                .join('');
                            return (
                                <div 
                                    key={participant}
                                    className="avatar"
                                    title={participant}
                                >
                                    {initials}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={handleCreateBoardClick} className="sharebut">invite</button>
                    <button 
                        className="exit_button"
                        onClick={() => signOut()}>Log out
                    </button>
                </div>
            </header>
            <WorkingCanvas participants={board?.participants} />    
            <ModalInvide boardId={board?._id} isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
};

export default BoardDetail;
