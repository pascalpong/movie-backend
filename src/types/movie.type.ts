import { Types } from 'mongoose'; 

export default interface MovieType {
    id: number;
    title: string;
    title_id?: string;
    actor?: string;
    author?: string;
    bunny_url?: string;
    cate_id?: string;
    createdBy?: string;
    createdDate?: string;
    des?: string;
    duration?: string;
    genre?: string;
    image?: string;
    latest_ep_date?: string;
    location?: string;
    number_ep?: string;
    producer?: string;
    release_date?: string;
    status?: string;
    statusvideo?: string;
    updatedBy?: string;
    updatedDate?: string;
    url_movie?: string;
    video_episode?: string;
    view_count?: string;
}