import { Schema, model } from "mongoose";
import { AnnouncementType } from "../types/announcement.type";


const announcementSchema = new Schema<AnnouncementType>({
    announcement: {type: String, required: true},
    status: {type: Boolean},
    createdAt: { type: Date, default: Date.now }
});

export const Announcement = model("announcement", announcementSchema);
