import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String },
    status: { type: String },
    note: { type: String },
    picture: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date }
});

export const User = model('User', userSchema);

