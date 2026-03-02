import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ArrowRight, CheckCircle2, Zap, Lock } from 'lucide-react'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-lime-500/30 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center font-bold text-zinc-950 shadow-neon">
              T
            </div>
            <span className="text-xl font-bold tracking-tight text-white hover:text-lime-400 transition-colors cursor-pointer">
              TodoNeon
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border border-zinc-700">
              <span className="text-xs text-lime-400 font-bold">
                {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 lg:py-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-lime-400 font-medium mb-8">
        
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Manage tasks with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">
             Ultra speed.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Beautifully designed, incredibly fast, and securely synced. TodoNeon brings a premium aesthetic to your daily productivity workflow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-neon hover:shadow-neon-strong text-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-32 grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-zinc-400 leading-relaxed">Built on Next.js 16 and Supabase. Actions execute instantly with optimistic UI updates.</p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sleek Design</h3>
            <p className="text-zinc-400 leading-relaxed">A dark aesthetic with vibrant lime accents. carefully crafted for visual satisfaction.</p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-lime-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Secure by Default</h3>
            <p className="text-zinc-400 leading-relaxed">Protected by Row Level Security. Your data is encrypted, private, and yours alone.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 text-center text-zinc-500 text-sm mt-auto relative z-10 bg-zinc-950/80 backdrop-blur-sm">
        <p>TodoNeon &copy; {new Date().getFullYear()}. Designed with precision.</p>
      </footer>
    </div>
  )
}
