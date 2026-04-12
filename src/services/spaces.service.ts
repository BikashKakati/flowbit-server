import { Space } from '../models/Space';
import mongoose from 'mongoose';

export const spacesService = {
    async getSpaces(userId: string) {
        return Space.find({ userId: new mongoose.Types.ObjectId(userId) }).select('-__v -_id').lean();
    },

    async createSpace(userId: string, payload: { id: string, name: string }) {
        if (!payload.id || !payload.name) {
            throw Object.assign(new Error('Missing required fields id or name'), { status: 400 });
        }

        const existing = await Space.findOne({ id: payload.id });
        if (existing) {
            throw Object.assign(new Error('Space ID already exists'), { status: 409 });
        }

        const space = new Space({
            id: payload.id,
            userId: new mongoose.Types.ObjectId(userId),
            name: payload.name
        });

        await space.save();
        return { id: space.id, name: space.name, createdAt: space.createdAt, updatedAt: space.updatedAt };
    },

    async updateSpace(userId: string, spaceId: string, payload: { name: string }) {
        if (!payload.name) {
            throw Object.assign(new Error('Name is required'), { status: 400 });
        }

        const space = await Space.findOne({ id: spaceId, userId: new mongoose.Types.ObjectId(userId) });
        if (!space) {
            throw Object.assign(new Error('Space not found or unauthorized'), { status: 404 });
        }

        space.name = payload.name;
        await space.save();

        return { id: space.id, name: space.name, updatedAt: space.updatedAt };
    },

    async deleteSpace(userId: string, spaceId: string) {
        const space = await Space.findOneAndDelete({ id: spaceId, userId: new mongoose.Types.ObjectId(userId) });
        if (!space) {
            throw Object.assign(new Error('Space not found or unauthorized'), { status: 404 });
        }
        return { success: true };
    }
};
