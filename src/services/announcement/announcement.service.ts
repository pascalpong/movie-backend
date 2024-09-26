import { Model, Types } from "mongoose";
import { AnnouncementType } from "../../types/announcement.type";


let announcementModel: Model<AnnouncementType>;
export const initializeAnnouncementCollection = (model: Model<AnnouncementType>) => {
    announcementModel = model;
};

export const getActiveAnnouncement = async (active: boolean) => {
    try {
        let filter = {}
        if(active) {
            filter = { status: true }
        }
        const data = await announcementModel.find(filter, {}, { sort: { 'created_at' : -1 }});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createAnnouncement = async (data: AnnouncementType) => {
    try {
        data.status = true
        const newData = await announcementModel.create(data);
        return newData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateAnnouncement = async (id: string) => {
    try {
        const announcement = await announcementModel.findById(id);
        if (!announcement) {
            throw new Error('Announcement not found')
        }
        
        const result = await announcementModel.updateOne({ _id: id }, { $set: {
            status: !announcement.status
        } });

        return result;
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
}

export const deleteAnnouncement = async (id: string) => {
    try {
        const data = await announcementModel.deleteOne({_id: id});
        return data
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
}