import { Canvas } from '../models/Canvas';
import { Flow } from '../models/Flow';
import mongoose from 'mongoose';

const removeNulls = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(removeNulls);
    } else if (obj !== null && typeof obj === 'object') {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null) {
                result[key] = removeNulls(value);
            }
        }
        return result;
    }
    return obj;
};

export const canvasService = {
    async getCanvas(userId: string, flowId: string) {
        const flow = await Flow.findOne({ id: flowId, userId: new mongoose.Types.ObjectId(userId) });
        if (!flow) {
            throw Object.assign(new Error('Flow not found or unauthorized'), { status: 404 });
        }

        let canvas = await Canvas.findOne({ flowId }).select('-_id -__v').lean();
        if (!canvas) {
            return { nodes: [], edges: [], updatedAt: null };
        }

        return {
            nodes: canvas.nodes.map(removeNulls),
            edges: canvas.edges.map(removeNulls),
            updatedAt: canvas.updatedAt
        };
    },

    async saveCanvas(userId: string, flowId: string, payload: { nodes: any[], edges: any[] }) {
        const flow = await Flow.findOne({ id: flowId, userId: new mongoose.Types.ObjectId(userId) });
        if (!flow) {
            throw Object.assign(new Error('Flow not found or unauthorized'), { status: 404 });
        }

        const { nodes, edges } = payload;
        let canvas = await Canvas.findOne({ flowId });

        if (!canvas) {
            canvas = new Canvas({ flowId, nodes: nodes || [], edges: edges || [] });
        } else {
            canvas.nodes = nodes || [];
            canvas.edges = edges || [];
        }

        // timestamps: true will auto update the updatedAt field when save resolves
        await canvas.save();

        return { success: true, updatedAt: canvas.updatedAt };
    }
};
