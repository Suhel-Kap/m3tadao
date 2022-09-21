import {z} from 'zod'

const versionRegex = /^[\w-.]+$/g;

export const schema = z.object({
    releaseName: z.string()
        .min(3, {message: 'Release name should have at least 3 characters'})
        .max(24, {message: 'Release name should not be longer than 24 characters'})
        .regex(versionRegex, {message: 'Release name can only contain letters, numbers, and dashes'})
        .refine((val: string) => val.toLocaleLowerCase() === val, {message: 'Release name can only contain lowercase letters'}),
    displayName: z.string()
        .min(3, {message: 'Display name should have at least 3 characters'})
        .max(24, {message: 'Display name should not be longer than 32 characters'}),
    description: z.string()
        .max(100, {message: 'Description should be shorter than 100 characters'}),
});