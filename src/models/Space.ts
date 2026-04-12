import mongoose, { Schema, Document } from 'mongoose';

export interface ISpace extends Document {
    id: string; // client UUID
    userId: mongoose.Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const SpaceSchema = new Schema<ISpace>({
    id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
}, { timestamps: true });

export const Space = mongoose.model<ISpace>('Space', SpaceSchema);
