'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { taskSchema } from '@repo/common-types'

export async function addTask(formData: FormData) {
    const supabase = await createClient()

    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: 'You must be logged in to add a task.' }
    }

    // Validate input
    const title = formData.get('title')
    const validatedFields = taskSchema.safeParse({ title })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors.title?.[0] || 'Invalid input' }
    }

    // Insert into Supabase
    const { error } = await supabase
        .from('tasks')
        .insert({
            title: validatedFields.data.title,
            user_id: user.id
        })

    if (error) {
        console.error('Error adding task:', error)
        return { error: 'Failed to add task to database.' }
    }

    revalidatePath('/')
    return { success: true }
}

export async function toggleTask(id: string, currentStatus: boolean) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('tasks')
        .update({ is_completed: !currentStatus })
        .eq('id', id)
        // RLS ensures they can only update their own tasks, but we can be explicit
        .eq('user_id', user.id)

    if (error) {
        console.error('Error toggling task:', error)
        return { error: 'Failed to update task.' }
    }

    revalidatePath('/')
    return { success: true }
}

export async function deleteTask(id: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error deleting task:', error)
        return { error: 'Failed to delete task.' }
    }

    revalidatePath('/')
    return { success: true }
}
