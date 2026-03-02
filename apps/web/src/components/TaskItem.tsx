'use client'

import { useTransition } from 'react'
import { Check, Trash2, Circle } from 'lucide-react'
import { toggleTask, deleteTask } from '@/app/actions/tasks'

import type { Task } from '@repo/common-types'

export function TaskItem({ task }: { task: Task }) {
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        startTransition(async () => {
            await toggleTask(task.id, task.is_completed)
        })
    }

    const handleDelete = () => {
        startTransition(async () => {
            await deleteTask(task.id)
        })
    }

    return (
        <li className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ease-out hover:-translate-y-0.5 ${task.is_completed
            ? 'bg-zinc-900/50 border-zinc-800/50 opacity-60 hover:opacity-100'
            : 'bg-zinc-900/80 border-zinc-800 shadow-sm hover:border-lime-500/30 hover:shadow-neon hover:bg-zinc-900'
            } ${isPending ? 'opacity-50 pointer-events-none scale-[0.98]' : 'scale-100'}`}>

            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={handleToggle}
                    className={`flex-shrink-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500/50 rounded-full hover:scale-110 active:scale-95 ${task.is_completed ? 'text-lime-500 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]' : 'text-zinc-600 hover:text-lime-400'}`}
                >
                    {task.is_completed ? (
                        <Check className="w-6 h-6" />
                    ) : (
                        <Circle className="w-6 h-6" />
                    )}
                </button>
                <span className={`text-zinc-100 flex-1 transition-all duration-500 ${task.is_completed ? 'line-through text-zinc-600' : ''
                    }`}>
                    {task.title}
                </span>
            </div>

            <button
                onClick={handleDelete}
                className="ml-4 p-2 text-zinc-600 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:opacity-100 hover:scale-110 active:scale-95"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </li>
    )
}
