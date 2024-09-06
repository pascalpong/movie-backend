import { Types } from 'mongoose'; 

export default interface MovieType {
    _id: Types.ObjectId;
    name: string;
    category: string;
    type?: string;
    introduction?: string;
    starring?: string;
    logo?: string;
    viewCount?: string;
    lastEpisodeAt?: string;
    broadcastedAt?: string;
    active?: string;
    url?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}