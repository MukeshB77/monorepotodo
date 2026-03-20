// Dashboard Page Component
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { TaskForm } from '@/components/TaskForm'
import { TaskItem } from '@/components/TaskItem'
import { logout } from '@/app/login/actions'
import { LogOut } from 'lucide-react'

export default async function Dashboard() {
    const supabase = await createClient()

    // Verify auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        redirect('/login')
    }

    // Fetch tasks
    const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching tasks:', error)
    }

    const completedCount = tasks?.filter(t => t.is_completed).length || 0
    const totalCount = tasks?.length || 0

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-lime-500/30">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10 transition-all duration-300">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center font-bold text-zinc-900 shadow-neon">
                            T
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white hover:text-lime-400 transition-colors">TodoNeon</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-lime-400 hidden sm:inline-block">
                            @{user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                        </span>
                        <form action={logout}>
                            <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors bg-zinc-800/80 hover:bg-zinc-800 px-3 py-1.5 rounded-md hover:shadow-sm">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight group cursor-default">
                            Your Tasks <span className="opacity-0 group-hover:opacity-100 transition-opacity text-lime-500 inline-block ml-2">✧</span>
                        </h2>
                        <p className="text-zinc-400">
                            {completedCount} of {totalCount} completed
                        </p>
                    </div>

                    {totalCount > 0 && (
                        <div className="w-32 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
                            <div
                                className="h-full bg-lime-500 transition-all duration-1000 ease-out shadow-neon"
                                style={{ width: `${(completedCount / totalCount) * 100}%` }}
                            />
                        </div>
                    )}
                </div>

                <TaskForm />

                {error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center backdrop-blur-sm">
                        Failed to load tasks. Please try again later.
                    </div>
                ) : tasks?.length === 0 ? (
                    <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all hover:border-lime-500/30 hover:bg-zinc-900/50">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                            <span className="text-2xl animate-pulse">✨</span>
                        </div>
                        <h3 className="text-zinc-200 font-medium mb-1">No tasks yet</h3>
                        <p className="text-zinc-500 text-sm">Add a task above to get started and boost your productivity.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {tasks?.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    )
}
