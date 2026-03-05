import { motion } from 'framer-motion'
import { Package, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PoweredByExplNodes } from '@/components/PoweredByExplNodes'
import { Footer } from '@/components/Footer'
import { EcosystemDropdown } from '@/components/EcosystemDropdown'
import logo from '@/assets/images/logo.png'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-[11px]">
            <img
              src={logo}
              alt="ONE box"
              className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] object-contain"
              width="66"
              height="66"
              loading="eager"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[24px] sm:text-[26px] font-bold tracking-tight leading-none">
                ONE <span className="text-primary">box</span>
              </p>
              <PoweredByExplNodes size="sm" />
            </div>
          </div>
          <EcosystemDropdown />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 relative z-10 overflow-hidden">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8 sm:space-y-12 short-screen-gaps">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-4"
          >
            <motion.div
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(161, 71, 225, 0.5)',
                  '0 0 40px rgba(161, 71, 225, 0.8)',
                  '0 0 20px rgba(161, 71, 225, 0.5)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight short-screen-title"
            >
              <span className="text-primary">ONE</span> <span className="text-foreground">box</span>
            </motion.div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto px-4 short-screen-desc">
              Something mysterious is coming soon
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative mx-auto short-screen-box"
              style={{
                width: 'min(280px, 70vw)',
                height: 'min(280px, 70vw)',
              }}
              animate={{
                y: [0, -15, 0],
                rotateX: [5, 8, 5],
                rotateY: [-5, -8, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/50 to-secondary backdrop-blur-sm"
                style={{
                  boxShadow: `
                    0 0 60px rgba(161, 71, 225, 0.3),
                    0 0 100px rgba(178, 64, 255, 0.2),
                    inset 0 0 60px rgba(161, 71, 225, 0.1)
                  `,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Package size={80} weight="duotone" className="text-primary/80 short-screen-box-icon" />
                  </motion.div>
                </div>

                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(161, 71, 225, 0.3), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkle size={32} weight="fill" className="text-accent/60" />
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card/80 to-transparent rounded-b-3xl flex items-end justify-center pb-6">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary/20 short-screen-question">?</span>
                </div>
              </div>

              <motion.div
                className="absolute -inset-4 rounded-3xl border border-primary/20"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 short-screen-cta"
          >
            <Button
              size="lg"
              disabled
              className="gap-2 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 cursor-not-allowed"
            >
              <Sparkle size={20} weight="duotone" />
              Coming Soon
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Stay tuned for the mystery reveal
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
