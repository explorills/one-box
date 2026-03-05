import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface LetterProgressProps {
  word: string
  collected: Set<string>
  className?: string
}

export function LetterProgress({ word, collected, className }: LetterProgressProps) {
  const uniqueLetters = Array.from(new Set(word.split('')))
  
  return (
    <div className={cn('flex items-center gap-2 justify-center flex-wrap', className)}>
      <span className="text-sm font-medium text-muted-foreground mr-2">[</span>
      {uniqueLetters.map((letter, index) => {
        const isCollected = collected.has(letter)
        
        return (
          <motion.div
            key={`${letter}-${index}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'relative w-10 h-10 rounded-lg border-2 flex items-center justify-center',
              'transition-all duration-300 font-mono font-bold text-lg',
              isCollected
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-muted-foreground/30 bg-muted/30 text-muted-foreground/40'
            )}
          >
            {isCollected ? (
              <>
                <span>{letter}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check size={12} weight="bold" className="text-primary-foreground" />
                </motion.div>
              </>
            ) : (
              <span className="text-2xl">◇</span>
            )}
          </motion.div>
        )
      })}
      <span className="text-sm font-medium text-muted-foreground ml-2">]</span>
    </div>
  )
}
