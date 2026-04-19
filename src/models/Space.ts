import mongoose, { Schema, Document } from 'mongoose';

export interface ISpace extends Document<string> {
    _id: string; // explicitly override _id type to string
    id: string; // client UUID
    userId: mongoose.Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const SpaceSchema = new Schema<ISpace>({
    _id: { type: String, default: function (this: any) { return this.id; } },
    id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
}, { timestamps: true });

export const Space = mongoose.model<ISpace>('Space', SpaceSchema);
