import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty').max(255, 'Title is too long'),
});

export type TaskTitleForm = z.infer<typeof taskSchema>;

export interface Task {
    id: string;
    title: string;
    is_completed: boolean;
    user_id: string;
    created_at?: string;
}
