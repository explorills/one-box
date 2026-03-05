import { Badge } from '@/components/ui/badge'
import type { RoleTier } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TierBadgeProps {
  tier: RoleTier
  className?: string
}

const TIER_CONFIG: Record<RoleTier, { label: string; color: string }> = {
  explorills: {
    label: 'explorills',
    color: 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30',
  },
  rendrill: {
    label: 'RENDRILL',
    color: 'bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-accent/30',
  },
  promdrill: {
    label: 'PROMDRILL',
    color: 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border-yellow-500/30',
  },
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  const config = TIER_CONFIG[tier]
  
  return (
    <Badge
      variant="outline"
      className={cn(
        'px-3 py-1 font-mono font-semibold uppercase text-xs tracking-wider border-2',
        config.color,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
