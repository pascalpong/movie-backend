import User from '../types/user.type';
import { Model, ObjectId as MongooseObjectId, Types } from 'mongoose'; // Ensure ObjectId is imported

let userModel: Model<User>;

export const initializeCollection = (model: Model<User>) => {
    userModel = model;
};

export const getAllUsers = async () => {
    
}