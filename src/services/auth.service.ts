import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authService = {
    async signup(payload: any) {
        const { email, password, name } = payload;
        if (!email || !password || !name) {
            const err: any = new Error('Missing required fields');
            err.status = 400;
            throw err;
        }
        const existing = await User.findOne({ email });
        if (existing) {
            const err: any = new Error('Email already in use');
            err.status = 409;
            throw err;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({ email, passwordHash, name });
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        return {
            user: { id: user._id, email: user.email, name: user.name, profilePictureUrl: user.profilePictureUrl },
            token,
        };
    },

    async login(payload: any) {
        const { email, password } = payload;
        if (!email || !password) {
            const err: any = new Error('Missing required fields');
            err.status = 400;
            throw err;
        }
        const user = await User.findOne({ email });
        if (!user) {
            const err: any = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            const err: any = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        return {
            user: { id: user._id, email: user.email, name: user.name, profilePictureUrl: user.profilePictureUrl },
            token,
        };
    },

    async getProfile(userId: string) {
        const user = await User.findById(userId);
        if (!user) {
            const err: any = new Error('User not found');
            err.status = 404;
            throw err;
        }
        return { id: user._id, email: user.email, name: user.name, profilePictureUrl: user.profilePictureUrl };
    },

    async updateProfile(userId: string, payload: any) {
        const { name, profilePictureFile } = payload;
        const user = await User.findById(userId);
        if (!user) {
            const err: any = new Error('User not found');
            err.status = 404;
            throw err;
        }
        if (name) user.name = name;
        if (profilePictureFile) user.profilePictureUrl = profilePictureFile; // stub for file upload

        await user.save();
        return { id: user._id, email: user.email, name: user.name, profilePictureUrl: user.profilePictureUrl };
    }
};
