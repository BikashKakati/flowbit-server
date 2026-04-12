import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name: string;
    profilePictureUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    profilePictureUrl: { type: String, default: null },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);
