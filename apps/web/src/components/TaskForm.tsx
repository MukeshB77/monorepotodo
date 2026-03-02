'use client'

import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { addTask } from '@/app/actions/tasks'

export function TaskForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true)
        setError(null)

        // Server action
        const response = await addTask(formData)

        if (response?.error) {
            setError(response.error)
        } else {
            // Clear form on success
            formRef.current?.reset()
        }

        setIsPending(false)
    }

    return (
        <div className="mb-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500/20 to-lime-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <form ref={formRef} action={handleSubmit} className="flex gap-2 relative bg-zinc-950 rounded-2xl">
                <input
                    type="text"
                    name="title"
                    placeholder="What needs to be done?"
                    required
                    disabled={isPending}
                    className="peer w-full bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-xl px-5 py-4 pl-12 shadow-inner focus:outline-none focus:ring-1 focus:ring-lime-500/50 focus:border-lime-500 transition-all duration-300 disabled:opacity-50 placeholder:text-zinc-600 focus:bg-zinc-900 hover:border-zinc-700"
                />
                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-5 h-5 peer-focus:text-lime-500 transition-colors duration-300" />
                <button
                    type="submit"
                    disabled={isPending}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-neon hover:shadow-neon-strong disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isPending ? 'Adding...' : 'Add'}
                </button>
            </form>
            {error && (
                <p className="mt-2 text-sm text-red-500 font-medium px-2">{error}</p>
            )}
        </div>
    )
}
