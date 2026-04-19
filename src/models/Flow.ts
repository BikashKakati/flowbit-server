import mongoose, { Schema, Document } from 'mongoose';

export interface IFlow extends Document<string> {
    _id: string; // explicitly override _id type to string
    id: string; // client UUID
    spaceId: string; // client UUID
    userId: mongoose.Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const FlowSchema = new Schema<IFlow>({
    _id: { type: String, default: function (this: any) { return this.id; } },
    id: { type: String, required: true, unique: true },
    spaceId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
}, { timestamps: true });

export const Flow = mongoose.model<IFlow>('Flow', FlowSchema);
