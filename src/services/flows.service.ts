import { Flow } from '../models/Flow';
import { Space } from '../models/Space';
import { Canvas } from '../models/Canvas';
import mongoose from 'mongoose';

export const flowsService = {
    async getFlows(userId: string, spaceId: string) {
        return Flow.find({ spaceId, userId: new mongoose.Types.ObjectId(userId) }).select('-__v -_id').lean();
    },

    async createFlow(userId: string, spaceId: string, payload: { id: string, name: string }) {
        if (!payload.id || !payload.name) {
            throw Object.assign(new Error('Missing required fields id or name'), { status: 400 });
        }

        const space = await Space.findOne({ id: spaceId, userId: new mongoose.Types.ObjectId(userId) });
        if (!space) {
            throw Object.assign(new Error('Space not found or unauthorized'), { status: 404 });
        }

        const existing = await Flow.findOne({ id: payload.id });
        if (existing) {
            throw Object.assign(new Error('Flow ID already exists'), { status: 409 });
        }

        const flow = new Flow({
            id: payload.id,
            spaceId,
            userId: new mongoose.Types.ObjectId(userId),
            name: payload.name
        });

        await flow.save();

        return { id: flow.id, spaceId: flow.spaceId, name: flow.name, createdAt: flow.createdAt, updatedAt: flow.updatedAt };
    },

    async updateFlowName(userId: string, flowId: string, payload: { name: string }) {
        if (!payload.name) {
            throw Object.assign(new Error('Name is required'), { status: 400 });
        }

        const flow = await Flow.findOne({ id: flowId, userId: new mongoose.Types.ObjectId(userId) });
        if (!flow) {
            throw Object.assign(new Error('Flow not found or unauthorized'), { status: 404 });
        }

        flow.name = payload.name;
        await flow.save();

        return { id: flow.id, name: flow.name, updatedAt: flow.updatedAt };
    },

    async deleteFlow(userId: string, flowId: string) {
        const flow = await Flow.findOneAndDelete({ id: flowId, userId: new mongoose.Types.ObjectId(userId) });
        if (!flow) {
            throw Object.assign(new Error('Flow not found or unauthorized'), { status: 404 });
        }

        await Canvas.deleteOne({ flowId });

        return { success: true };
    }
};
