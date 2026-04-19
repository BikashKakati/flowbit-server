import mongoose, { Schema, Document } from 'mongoose';

export interface IFlow extends Document {
    id: string; // client UUID
    spaceId: string; // client UUID
    userId: mongoose.Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const FlowSchema = new Schema<IFlow>({
    id: { type: String, required: true, unique: true },
    spaceId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
}, { timestamps: true, _id: false });

export const Flow = mongoose.model<IFlow>('Flow', FlowSchema);
