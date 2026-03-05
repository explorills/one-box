import { motion } from 'framer-motion'
import { Gift } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface MysteryBoxProps {
  index: number
  disabled: boolean
  onClick: () => void
}

export function MysteryBox({ index, disabled, onClick }: MysteryBoxProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative w-full aspect-square rounded-2xl',
        'bg-gradient-to-br from-card via-card/95 to-card/90',
        'border-2 border-primary/20',
        'flex items-center justify-center',
        'transition-all duration-300',
        'group overflow-hidden',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'hover:border-primary/50 hover:scale-105 cursor-pointer'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={!disabled ? { y: -8 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <div className={cn(
        'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
        'bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5',
        !disabled && 'group-hover:opacity-100'
      )} />
      
      <div className={cn(
        'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
        'shadow-[0_0_30px_rgba(0,255,255,0.3)]',
        !disabled && 'group-hover:opacity-100'
      )} />
      
      <motion.div
        className="relative z-10"
        animate={!disabled ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <Gift 
          className={cn(
            'transition-all duration-300',
            disabled ? 'text-muted-foreground' : 'text-primary group-hover:text-accent'
          )}
          size={64}
          weight="duotone"
        />
      </motion.div>
      
      <div className={cn(
        'absolute bottom-4 left-0 right-0 text-center',
        'text-sm font-medium tracking-wider uppercase',
        'transition-all duration-300',
        disabled ? 'text-muted-foreground' : 'text-primary/70 group-hover:text-accent'
      )}>
        ?
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
    </motion.button>
  )
}
