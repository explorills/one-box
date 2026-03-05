export type PrizeType = 'expl' | 'mineral' | 'nft' | 'letter' | 'grand' | 'empty'

export type RoleTier = 'explorills' | 'rendrill' | 'promdrill'

export interface Prize {
  prize: string
  date: string
}

export interface UserData {
  username: string
  prizes: Prize[]
}

export interface LetterProgress {
  word: string
  collected: string[]
  total: number
}

export interface UserStats {
  expl: number
  minerals: number
  nfts: number
  hasGrandPrize: boolean
  usernameSlots: number
  claimedExpl: number
  claimedMinerals: number
  claimedNfts: number
}

export interface MockUser {
  id: string
  username: string
  avatarUrl: string
  tier: RoleTier
  isOwner: boolean
}
