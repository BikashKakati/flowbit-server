import mongoose, { Schema, Document } from 'mongoose';

export interface ICanvas extends Document {
    flowId: string;
    nodes: any[];
    edges: any[];
    createdAt: Date;
    updatedAt: Date;
}

const NodeSchema = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    width: { type: Number },
    height: { type: Number },
    parentId: { type: String, default: null },
    zIndex: { type: Number },
    extent: { type: String, default: null },
    style: { type: Schema.Types.Mixed },
    data: {
        content: {
            text: { type: String, default: null },
            icon: { type: String, default: null },
            image: { type: String, default: null }
        },
        bgColor: { type: String, default: null },
        borderColor: { type: String, default: null },
        identityType: { type: String, default: null },
        handlePosition: { type: String, default: null }
    }
}, { _id: false });

const EdgeSchema = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    sourceHandle: { type: String, default: null },
    targetHandle: { type: String, default: null },
    zIndex: { type: Number },
    animated: { type: Boolean, default: false },
    data: {
        arrowColor: { type: String, default: null },
        arrowText: { type: String, default: null }
    }
}, { _id: false });

const CanvasSchema = new Schema<ICanvas>({
    flowId: { type: String, required: true, unique: true },
    nodes: [NodeSchema],
    edges: [EdgeSchema]
}, { timestamps: true });

export const Canvas = mongoose.model<ICanvas>('Canvas', CanvasSchema);
