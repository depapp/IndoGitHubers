import { cn } from '@/lib/utils'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export function LiquidGlassPromo({ className }: { className?: string }) {
  return (
    <a
      href="https://pamerin.id/?utm_source=indogithubers&utm_medium=referral&utm_campaign=floating-cta"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-50 flex items-center gap-2 overflow-hidden rounded-full bg-white/25 px-4 py-2.5 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-inset ring-white/30 transition-all duration-300 hover:scale-[1.04] active:scale-95 md:bottom-6 md:right-6',
        'shadow-[0_8px_32px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.35)]',
        'dark:bg-white/10 dark:ring-white/20',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-[liquid-sheen_4.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <Sparkles className="relative h-4 w-4 shrink-0 text-foreground/80" />
      <span className="relative whitespace-nowrap text-sm font-medium text-foreground/90">
        Pamerin karyamu di sini
      </span>
      <ArrowUpRight className="relative h-4 w-4 shrink-0 text-foreground/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}
