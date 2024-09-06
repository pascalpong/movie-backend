import { Types } from 'mongoose'; 

export default interface UserType {
    _id: Types.ObjectId;
    name: string;
    email: string;
    username: string;
    password: string;
    type?: string;
    status?: string;
    note?: string;
    picture?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}    
