import { login } from './actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function LoginPage({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    const params = await searchParams
    const message = params?.message as string | undefined

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        redirect('/')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Welcome to TodoGo
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Sign in to manage your tasks securely.
                    </p>
                </div>

                {message && (
                    <div className="rounded-md bg-red-900/50 p-4 border border-red-500/50">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-200">{message}</h3>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-lg border-0 bg-zinc-800 py-3 px-4 text-white placeholder-zinc-500 shadow-sm ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6 transition-all"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-lg border-0 bg-zinc-800 py-3 px-4 text-white placeholder-zinc-500 shadow-sm ring-1 ring-inset ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6 transition-all"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            formAction={login}
                            className="flex w-full justify-center rounded-lg bg-lime-500 px-3 py-3 text-sm font-bold text-zinc-950 shadow-neon hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 transition-all hover:shadow-neon-strong"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    <span className="text-zinc-400">Don't have an account? </span>
                    <Link href="/signup" className="font-medium text-lime-500 hover:text-lime-400 transition-colors">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}
