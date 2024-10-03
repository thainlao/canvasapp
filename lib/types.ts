export interface CreateBoardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBoardCreated: (board: { name: string; fieldOfWork: string; createdBy: string }) => void;
}

export interface IUser{
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    x: any;
    y: any;
    username: string;
}

export interface IBoard{
    _id: string;
    name: string;
    fieldOfWork: string;
    createdBy: string;
    participants: string[];
    createdAt: string;
}

export interface WorkingCanvasProps {
    participants: string[] | undefined;
    currentUserName: any;
}

export interface ICursor {
    x: number;
    y: number;
    name: string;
    color: string;
}