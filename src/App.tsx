import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Crown, Key, Sparkle, Diamond, Palette, CurrencyCircleDollar, Clock, GithubLogo, XLogo, DiscordLogo } from '@phosphor-icons/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { MysteryBox } from '@/components/MysteryBox'
import { LetterProgress } from '@/components/LetterProgress'
import { TierBadge } from '@/components/TierBadge'
import type { UserData, MockUser, RoleTier } from '@/lib/types'
import {
  PRIZES,
  WORDS,
  getPrizePool,
  getRandomLetter,
  getCollectedLetters,
  isWordComplete,
  calculateStats,
  getRemainingCooldown,
  formatCooldownTime,
  getNextTierWord,
} from '@/lib/prizes'

const MOCK_USER: MockUser = {
  id: '12345',
  username: 'orb.8888',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=orb',
  tier: 'explorills',
  isOwner: true,
}

function App() {
  const [userData, setUserData] = useKV<UserData>('user-data', {
    username: MOCK_USER.username,
    prizes: [],
  })
  
  const [currentTier, setCurrentTier] = useState<RoleTier>(MOCK_USER.tier)
  const [isLootOpen, setIsLootOpen] = useState(false)
  const [prizeModal, setPrizeModal] = useState<{
    open: boolean
    prize: string | null
    letter?: string
    word?: string
  }>({ open: false, prize: null })
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null)

  useEffect(() => {
    const checkCooldown = () => {
      if (!userData?.prizes.length) {
        setCooldownRemaining(null)
        return
      }
      
      const lastPrize = userData.prizes[userData.prizes.length - 1]
      const remaining = getRemainingCooldown(lastPrize.date)
      setCooldownRemaining(remaining)
    }

    checkCooldown()
    const interval = setInterval(checkCooldown, 1000)
    return () => clearInterval(interval)
  }, [userData?.prizes])

  useEffect(() => {
    if (!userData) return
    
    const rendrillLetters = getCollectedLetters(userData.prizes, WORDS.RENDRILL)
    const promdrillLetters = getCollectedLetters(userData.prizes, WORDS.PROMDRILL)
    
    if (currentTier === 'explorills' && isWordComplete(rendrillLetters, WORDS.RENDRILL)) {
      setCurrentTier('rendrill')
    } else if (currentTier === 'rendrill' && isWordComplete(promdrillLetters, WORDS.PROMDRILL)) {
      setCurrentTier('promdrill')
    }
  }, [userData, currentTier])

  const handleBoxClick = () => {
    if (cooldownRemaining && cooldownRemaining > 0) {
      toast.error(`Try again in ${formatCooldownTime(cooldownRemaining)}`, {
        icon: <Clock size={20} weight="duotone" />,
      })
      return
    }

    const stats = calculateStats(userData || null)
    const pool = getPrizePool(currentTier, stats.hasGrandPrize)
    const prize = pool[Math.floor(Math.random() * pool.length)]

    const newPrize = {
      prize,
      date: new Date().toISOString(),
    }

    setUserData((current) => {
      if (!current) return { username: MOCK_USER.username, prizes: [newPrize] }
      return {
        ...current,
        prizes: [...current.prizes, newPrize],
      }
    })

    if (prize === PRIZES.EMPTY) {
      toast.error('Try again in 7 days', {
        description: 'Unfortunately you chose the empty box',
      })
      return
    }

    if (prize.includes('Letter from')) {
      const wordMatch = prize.match(/Letter from (\w+)/)
      const word = wordMatch ? wordMatch[1] : ''
      const letter = getRandomLetter(word)
      
      const updatedPrize = {
        prize: `Letter ${letter} from ${word}`,
        date: newPrize.date,
      }
      
      setUserData((current) => {
        if (!current) return { username: MOCK_USER.username, prizes: [updatedPrize] }
        return {
          username: current.username,
          prizes: [...current.prizes.slice(0, -1), updatedPrize],
        }
      })
      
      setTimeout(() => {
        const collected = getCollectedLetters([...userData!.prizes, updatedPrize], word)
        const complete = isWordComplete(collected, word)
        
        if (complete) {
          if (word === WORDS.CHRONICLES) {
            setPrizeModal({
              open: true,
              prize: PRIZES.GRAND,
            })
          } else {
            const tierName = word === WORDS.RENDRILL ? 'RENDRILL' : 'PROMDRILL'
            toast.success(`Congrats! You unlocked ${tierName} Role!`, {
              icon: <Key size={20} weight="duotone" />,
              duration: 5000,
            })
          }
        } else {
          setPrizeModal({
            open: true,
            prize: 'letter',
            letter,
            word,
          })
        }
      }, 800)
      
      return
    }

    setTimeout(() => {
      setPrizeModal({
        open: true,
        prize,
      })
    }, 800)
  }

  const stats = calculateStats(userData || null)
  const nextWord = getNextTierWord(currentTier, stats.hasGrandPrize)
  const collected: Set<string> = nextWord ? getCollectedLetters(userData?.prizes || [], nextWord) : new Set()

  const isBoxDisabled = cooldownRemaining !== null && cooldownRemaining > 0

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkle size={28} weight="duotone" className="text-primary" />
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
                ONE <span className="text-foreground">box</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Choose wisely, win big</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <TierBadge tier={currentTier} className="hidden sm:flex" />
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary/30">
              <AvatarImage src={MOCK_USER.avatarUrl} alt={MOCK_USER.username} />
              <AvatarFallback>{MOCK_USER.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm hidden md:block">{MOCK_USER.username}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center gap-6 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 sm:space-y-3"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
            Choose Your Mystery Box
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            Select one of 5 boxes every 7 days. Collect prizes, unlock tiers, and win the grand prize!
          </p>
          {nextWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-2 sm:pt-4"
            >
              <LetterProgress word={nextWord} collected={collected} />
            </motion.div>
          )}
        </motion.div>

        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {[0, 1, 2, 3, 4].map((index) => (
            <MysteryBox
              key={index}
              index={index}
              disabled={isBoxDisabled}
              onClick={handleBoxClick}
            />
          ))}
        </div>

        <Button
          size="lg"
          onClick={() => setIsLootOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <Package size={20} weight="duotone" />
          My Loot
        </Button>
      </main>

      <footer className="border-t border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2024 explorills. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/explorills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubLogo size={18} weight="fill" />
            </a>
            <a
              href="https://x.com/explorills_main"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <XLogo size={18} weight="fill" />
            </a>
            <a
              href="https://discord.com/invite/RetTCVq7tJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <DiscordLogo size={18} weight="fill" />
            </a>
          </div>
        </div>
      </footer>

      <Dialog open={isLootOpen} onOpenChange={setIsLootOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {stats.hasGrandPrize && <Crown size={28} weight="duotone" className="text-yellow-400" />}
              <span>@{MOCK_USER.username}</span>
              {stats.hasGrandPrize && <Sparkle size={24} weight="fill" className="text-primary" />}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {stats.hasGrandPrize && (
              <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                <p className="text-sm font-bold text-yellow-400 flex items-center gap-2">
                  <Crown size={20} weight="fill" />
                  Grand Mystery Prize Winner!
                </p>
              </Card>
            )}

            {nextWord && !stats.hasGrandPrize && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Key size={18} weight="duotone" />
                  {currentTier === 'promdrill' ? 'Reveal the hidden word' : 'Unlock the Role'}
                </h3>
                <LetterProgress word={nextWord} collected={collected} />
              </div>
            )}

            {(stats.expl > 0 || stats.minerals > 0 || stats.nfts > 0 || stats.hasGrandPrize || stats.usernameSlots > 0) && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Assets</h3>
                  <div className="space-y-2">
                    {stats.expl > 0 && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <CurrencyCircleDollar size={20} weight="duotone" className="text-primary" />
                          <span className="font-mono font-medium">$EXPL</span>
                        </div>
                        <span className="font-mono font-bold text-primary">{stats.expl.toLocaleString()}</span>
                      </div>
                    )}
                    {stats.minerals > 0 && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Diamond size={20} weight="duotone" className="text-accent" />
                          <span className="font-medium">Blue Mineral</span>
                        </div>
                        <span className="font-mono font-bold text-accent">{stats.minerals}</span>
                      </div>
                    )}
                    {stats.nfts > 0 && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Palette size={20} weight="duotone" className="text-primary" />
                          <span className="font-medium">Genesis Art</span>
                        </div>
                        <span className="font-mono font-bold text-primary">{stats.nfts}</span>
                      </div>
                    )}
                    {stats.usernameSlots > 0 && (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Sparkle size={20} weight="duotone" className="text-primary" />
                          <span className="font-medium">Username Slot</span>
                        </div>
                        <span className="font-mono font-bold text-primary">{stats.usernameSlots}</span>
                      </div>
                    )}
                    {stats.hasGrandPrize && (
                      <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                        <div className="flex items-center gap-2">
                          <Crown size={20} weight="fill" className="text-yellow-400" />
                          <span className="font-medium text-yellow-400">Grand Mystery Prize</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Tier</span>
              <TierBadge tier={currentTier} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {prizeModal.open && (
          <Dialog open={prizeModal.open} onOpenChange={(open) => setPrizeModal({ open, prize: null })}>
            <DialogContent className="max-w-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="text-center space-y-6 py-4"
              >
                {prizeModal.prize === 'letter' && prizeModal.letter && prizeModal.word && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className="flex justify-center"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <span className="text-4xl font-mono font-bold text-primary">{prizeModal.letter}</span>
                      </div>
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">You found `{prizeModal.letter}`</h3>
                      <p className="text-muted-foreground mb-4">
                        Keep collecting letters to {prizeModal.word === WORDS.CHRONICLES ? 'reveal the hidden word' : 'unlock the Role'}
                      </p>
                      <LetterProgress
                        word={prizeModal.word}
                        collected={getCollectedLetters(userData?.prizes || [], prizeModal.word)}
                      />
                    </div>
                  </>
                )}
                
                {prizeModal.prize === PRIZES.EXPL && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CurrencyCircleDollar size={80} weight="duotone" className="text-primary mx-auto" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Congrats!</h3>
                      <p className="text-3xl font-mono font-bold text-primary">1,111 $EXPL</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Keep an eye on announcements for claiming your prizes
                      </p>
                    </div>
                  </>
                )}

                {prizeModal.prize === PRIZES.MINERAL && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Diamond size={80} weight="duotone" className="text-accent mx-auto" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Congrats!</h3>
                      <p className="text-3xl font-bold text-accent">Blue Mineral</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Keep an eye on announcements for claiming your prizes
                      </p>
                    </div>
                  </>
                )}

                {prizeModal.prize === PRIZES.NFT && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 0.8 }}
                    >
                      <Palette size={80} weight="duotone" className="text-primary mx-auto" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Congrats!</h3>
                      <p className="text-2xl font-bold text-primary">explorills Genesis Art</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Keep an eye on announcements for claiming your prizes
                      </p>
                    </div>
                  </>
                )}

                {prizeModal.prize === PRIZES.GRAND && (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: [1, 1.3, 1], rotate: 0 }}
                      transition={{ duration: 1, type: 'spring' }}
                    >
                      <Crown size={100} weight="fill" className="text-yellow-400 mx-auto" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        GRAND PRIZE!
                      </h3>
                      <p className="text-xl font-bold mb-4">You revealed the hidden word!</p>
                      <p className="text-muted-foreground">
                        explorills Grand Mystery Prize is yours! Keep an eye on announcements for the prize reveal and delivery dates.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App