export default function ErrorPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-zinc-950">
            <div className="text-center bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl max-w-md w-full">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
                <p className="text-zinc-300 mb-6">Something went wrong with your authentication request.</p>
                <a
                    href="/login"
                    className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                >
                    Return to Login
                </a>
            </div>
        </div>
    )
}
