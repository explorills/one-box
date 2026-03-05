import { type RoleTier, type UserData, type Prize } from './types'

export const PRIZES = {
  EXPL: '`1,111 $EXPL`',
  MINERAL: '`Blue Mineral`',
  NFT: '`explorills Genesis Art`',
  GRAND: '`explorills Grand Mystery Prize`',
  EMPTY: 'empty_box',
}

export const WORDS = {
  RENDRILL: 'RENDRILL',
  PROMDRILL: 'PROMDRILL',
  CHRONICLES: 'CHRONICLES',
}

export const COOLDOWN_DAYS = 7

export function getRemainingCooldown(lastInteraction: string | null): number | null {
  if (!lastInteraction) return null
  
  const last = new Date(lastInteraction)
  const now = new Date()
  const diff = now.getTime() - last.getTime()
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  const remaining = cooldownMs - diff
  
  return remaining > 0 ? remaining : null
}

export function formatCooldownTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`
  }
  
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }
  
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  }
  
  const remainingHours = hours % 24
  return `${days} day${days !== 1 ? 's' : ''} and ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`
}

export function getPrizePool(tier: RoleTier, hasGrandPrize: boolean): string[] {
  if (tier === 'promdrill') {
    if (hasGrandPrize) {
      return [PRIZES.EXPL, PRIZES.MINERAL, PRIZES.NFT, PRIZES.EMPTY, PRIZES.EMPTY]
    }
    return [PRIZES.EXPL, PRIZES.MINERAL, PRIZES.NFT, `Letter from ${WORDS.CHRONICLES}`, PRIZES.EMPTY]
  }
  
  if (tier === 'rendrill') {
    return [
      PRIZES.EXPL,
      PRIZES.MINERAL,
      `Letter from ${WORDS.PROMDRILL}`,
      `Letter from ${WORDS.PROMDRILL}`,
      PRIZES.EMPTY,
    ]
  }
  
  return [
    PRIZES.EXPL,
    `Letter from ${WORDS.RENDRILL}`,
    `Letter from ${WORDS.RENDRILL}`,
    `Letter from ${WORDS.RENDRILL}`,
    PRIZES.EMPTY,
  ]
}

export function getRandomLetter(word: string): string {
  return word[Math.floor(Math.random() * word.length)]
}

export function getCollectedLetters(prizes: Prize[], word: string): Set<string> {
  const collected = new Set<string>()
  
  for (const prize of prizes) {
    if (prize.prize.includes('Letter') && prize.prize.includes(word)) {
      const match = prize.prize.match(/Letter ([A-Z]) from/)
      if (match) {
        collected.add(match[1])
      }
    }
  }
  
  return collected
}

export function isWordComplete(collected: Set<string>, word: string): boolean {
  const uniqueLetters = new Set(word)
  return uniqueLetters.size === collected.size && [...uniqueLetters].every(letter => collected.has(letter))
}

export function calculateStats(userData: UserData | null, legacyData: Record<string, any> = {}) {
  let expl = 0
  let minerals = 0
  let nfts = 0
  let hasGrandPrize = false
  let usernameSlots = 0
  let claimedExpl = 0
  let claimedMinerals = 0
  let claimedNfts = 0

  if (userData) {
    for (const prize of userData.prizes) {
      if (prize.prize === PRIZES.EXPL) expl += 1111
      if (prize.prize === PRIZES.MINERAL) minerals += 1
      if (prize.prize === PRIZES.NFT) nfts += 1
      if (prize.prize === PRIZES.GRAND) hasGrandPrize = true
    }
  }

  if (userData && legacyData[userData.username.toLowerCase()]) {
    const legacy = legacyData[userData.username.toLowerCase()]
    for (const prize of legacy) {
      if (prize.item === '1,111 $EXPL') expl += 1111
      if (prize.item === 'explorills.world username slot') usernameSlots += 1
    }
  }

  return { expl, minerals, nfts, hasGrandPrize, usernameSlots, claimedExpl, claimedMinerals, claimedNfts }
}

export function getNextTierWord(tier: RoleTier, hasGrandPrize: boolean): string | null {
  if (tier === 'explorills') return WORDS.RENDRILL
  if (tier === 'rendrill') return WORDS.PROMDRILL
  if (tier === 'promdrill' && !hasGrandPrize) return WORDS.CHRONICLES
  return null
}
