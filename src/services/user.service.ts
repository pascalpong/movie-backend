import { User, IUser } from '../models/user.model';

export const createUser = async (username: string, email: string, password: string) => {
    const user = new User({ username, email, password });
    return user.save();
}

export const findUserByUsername = async (username: string) => {
    return User.findOne({ username });
}

export const findUserById = async (id: string) => {
    return User.findById(id);
}

export const updateUser = async (id: string, updateData: Partial<IUser>) => {
    return User.findByIdAndUpdate(id, updateData, { new: true });
}

export const deleteUser = async (id: string) => {
    const result = await User.findByIdAndDelete(id);
    return !!result;
}

export const findUserByEmail = async (email: string) => { 
    return User.findOne({ email });
}

