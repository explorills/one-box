# Planning Guide

A gamified mystery box platform where users can select one of five mystery boxes every 7 days to win prizes, collect letters to unlock higher tiers, and track their winnings - all within a single, immersive, no-scroll viewport experience.

**Experience Qualities**:
1. **Suspenseful** - Build anticipation through mysterious box designs, hover states, and dramatic reveal animations that make every selection feel consequential
2. **Rewarding** - Celebrate wins with bold visual feedback, progress tracking, and tier advancement that makes users feel accomplished
3. **Elegant** - Maintain a sophisticated dark aesthetic with fluid animations and premium finishes that elevate the gamified experience

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-purpose gamified experience with user authentication state, cooldown timers, prize tracking, and role progression - but all contained within one view with modal interactions.

## Essential Features

**Mystery Box Selection**
- Functionality: Display 5 identical mystery boxes that users can interact with to claim prizes
- Purpose: Core mechanic that drives engagement and creates anticipation
- Trigger: User clicks one of the 5 box elements
- Progression: Hover reveals subtle glow → Click triggers box opening animation → Brief suspense moment → Prize reveal with celebration animation → Modal shows prize details and progress
- Success criteria: Box opens smoothly, prize is revealed clearly, and user understands what they won

**User Authentication & Role Display**
- Functionality: Show logged-in user's avatar, username, and current tier (explorills/RENDRILL/PROMDRILL)
- Purpose: Personalize experience and display progression status
- Trigger: User connects wallet/authenticates
- Progression: User authenticates → Avatar and username appear in header → Current tier badge displays with appropriate color
- Success criteria: User can see their identity and current tier at all times

**My Loot Inventory**
- Functionality: Display all accumulated prizes, collected letters/word progress, claimed items, and current tier
- Purpose: Track user progress and create collection completionism
- Trigger: User clicks "My Loot" button
- Progression: Click button → Modal slides in from right → Shows categorized assets with counts → Displays letter collection progress → Shows claimed items section → Current tier at bottom
- Success criteria: All prizes are accurately counted and displayed, letter progress is visual and clear

**Cooldown Timer**
- Functionality: Prevent box opening until 7-day cooldown expires, show remaining time
- Purpose: Control engagement frequency and create scarcity
- Trigger: User attempts to open box before cooldown expires
- Progression: User clicks box → System checks last interaction time → Modal shows remaining cooldown time in friendly format → User understands when they can return
- Success criteria: Time remaining is accurate and displayed in human-readable format (days, hours, minutes)

**Prize Reveal System**
- Functionality: Animate prize reveal with different treatments for different prize types (tokens, minerals, NFTs, letters, grand prize)
- Purpose: Create memorable moments and differentiate prize values
- Trigger: Box opening completes after selection
- Progression: Box opens with 3D animation → Brief suspense pause → Prize type determines animation style → Confetti/particles for valuable prizes → Modal with prize details and next steps
- Success criteria: Each prize type has distinct, satisfying reveal animation

**Role Unlock Progression**
- Functionality: Track letter collection to unlock RENDRILL, PROMDRILL roles and reveal CHRONICLES for grand prize
- Purpose: Create long-term engagement through progression mechanics
- Trigger: User collects all unique letters for a word
- Progression: Collect letter → Progress bar updates → Final letter collected → Celebratory animation → Role unlock notification → UI updates to show new tier
- Success criteria: User clearly understands progress toward next tier and celebrates unlock moment

## Edge Case Handling

- **Empty Box Selection** - Show sympathetic message with next availability time instead of generic failure
- **Network Disconnection** - Display reconnection prompt without losing modal state, queue actions for retry
- **Multiple Tabs Open** - Sync state across tabs using storage events, prevent double claiming
- **Cooldown Edge Cases** - Handle cooldown that expires while user is viewing the page, enable boxes dynamically
- **Already Unlocked Roles** - Hide letter progress for completed tiers, show only active progression
- **Grand Prize Winner** - Special UI treatment, remove CHRONICLES letter collection from prize pool
- **No Prizes Yet** - Show encouraging empty state in My Loot instead of blank screen
- **Mobile Orientation Change** - Reflow layout instantly to maintain no-scroll constraint in both orientations
- **Long Usernames** - Truncate with ellipsis in header while showing full name in My Loot modal

## Design Direction

The design should evoke mystery, luxury, and anticipation - like opening a high-end gift box in a dimly lit, exclusive gallery. Dark backgrounds with glowing accents, smooth 3D-style transformations, and premium finishes create a sophisticated gaming experience that feels valuable and exclusive.

## Color Selection

A deep space theme with cyan/electric blue as the signature color - distinct from the ecosystem but complementary, suggesting technology, energy, and rarity.

- **Primary Color**: `oklch(0.65 0.19 235)` - Electric Cyan/Blue - Communicates digital energy, mystery, and premium quality; stands out against dark backgrounds
- **Secondary Colors**: 
  - Background: `oklch(0.12 0.02 265)` - Deep space navy, almost black but with subtle blue undertone
  - Surface: `oklch(0.18 0.03 260)` - Slightly lighter for cards and boxes
- **Accent Color**: `oklch(0.75 0.22 195)` - Bright cyan for CTAs, glows, and important highlights - grabs attention for mystery box interactions
- **Foreground/Background Pairings**:
  - Primary (Electric Cyan oklch(0.65 0.19 235)): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓
  - Background (Deep Navy oklch(0.12 0.02 265)): Light text (oklch(0.92 0.02 240)) - Ratio 12.8:1 ✓
  - Surface (Card Navy oklch(0.18 0.03 260)): Light text (oklch(0.92 0.02 240)) - Ratio 9.1:1 ✓
  - Accent (Bright Cyan oklch(0.75 0.22 195)): Dark text (oklch(0.12 0.02 265)) - Ratio 9.8:1 ✓

## Font Selection

Typography should feel futuristic yet readable, with geometric precision that suggests technology while maintaining elegance for the premium mystery box experience.

- **Primary Font**: Space Grotesk - Modern geometric sans with tech-forward personality, excellent readability
- **Secondary Font**: JetBrains Mono - For numerical values and tokens to create technical precision

**Typographic Hierarchy**:
- H1 (App Title/ONE box): Space Grotesk Bold/32px/tight letter spacing (-0.02em)
- H2 (Modal Titles): Space Grotesk SemiBold/24px/normal letter spacing
- H3 (Section Headers): Space Grotesk Medium/18px/normal letter spacing
- Body (Instructions): Space Grotesk Regular/16px/relaxed line height (1.6)
- Prize Values: JetBrains Mono Medium/20px/tabular numbers
- UI Labels: Space Grotesk Medium/14px/uppercase/wide letter spacing (0.05em)
- Timer/Countdown: JetBrains Mono Bold/16px/tabular numbers

## Animations

Animations should create a narrative journey - building suspense on hover, explosive celebration on wins, and smooth transitions between states that feel premium and intentional.

**Key Animation Moments**:
- Box hover: Subtle float + glow intensification (300ms ease-out)
- Box selection: 3D flip/open animation with spring physics (800ms)
- Prize reveal: Scale + fade in with particle burst for rare items (600ms)
- Role unlock: Confetti + badge scale pulse (1200ms)
- Modal transitions: Slide from right with backdrop blur fade (400ms ease-in-out)
- Letter collection: Individual letter slots fill with color + checkmark (300ms stagger)
- Cooldown countdown: Smooth number transitions, pulse on final seconds

## Component Selection

**Components**:
- **Dialog**: For My Loot inventory and prize reveal modals - full customization with slide-in animation
- **Avatar**: User identity in header with online status ring
- **Badge**: Current tier display with role-specific colors
- **Button**: Box selection (styled as 3D box cards), My Loot button, and CTAs
- **Card**: For prize display within modals and stats
- **Progress**: Letter collection visualization (custom with filled/empty states)
- **Separator**: Subtle dividers in My Loot sections
- **Tooltip**: Hover hints for boxes and UI elements

**Customizations**:
- **3D Box Cards**: Custom component using CSS transforms and shadows to create depth, with hover tilt effect
- **Prize Reveal Animation**: Custom framer-motion sequence with particle system using canvas or CSS
- **Letter Progress Slots**: Custom component showing word with filled/empty letter positions
- **Tier Badge**: Custom badge with animated border and glow for current tier
- **Countdown Timer**: Custom component with animated digits and pulse effects

**States**:
- Boxes: default (floating idle), hover (glow + lift), selected (opening animation), disabled (grayed out during cooldown)
- Buttons: default, hover (glow + scale), active (pressed), disabled (muted)
- Modals: closed, opening (slide in), open, closing (slide out)
- Letter Slots: empty (hollow), filled (colored with letter), completing (animation sequence)

**Icon Selection**:
- Gift/Box: Custom 3D box illustration for main boxes
- Crown: Grand prize winner indicator (Phosphor Crown)
- Key: Lock/unlock for role progression (Phosphor Key)
- Sparkles: Prize rarity indicator (Phosphor Sparkle)
- Diamond: For Blue Minerals (Phosphor Diamond)
- Palette: For Genesis Art NFTs (Phosphor Palette)
- Coins: For $EXPL token (Phosphor CurrencyCircleDollar)
- Clock: Cooldown timer (Phosphor Clock)
- Package: My Loot button (Phosphor Package)

**Spacing**:
- Container padding: 24px (mobile), 32px (desktop)
- Box grid gap: 16px (mobile), 24px (desktop)
- Modal content padding: 24px
- Section spacing: 32px
- Element spacing: 12px (related), 24px (unrelated)

**Mobile**:
- Single column box grid (2 boxes per row on smallest screens)
- Collapsible header to icon-only mode
- Full-screen modals on mobile (slide up from bottom instead of right)
- Touch-friendly box sizing (minimum 120px × 120px)
- Bottom sheet style for My Loot on mobile instead of side modal
- Sticky header and footer with main content area flex-filling viewport
