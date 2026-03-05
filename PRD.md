# Planning Guide

A "Coming Soon" landing page for ONE box - a mystery box platform with a single, centered, animated 3D mystery box that creates anticipation for the upcoming launch.

**Experience Qualities**:
1. **Mysterious** - Dark, atmospheric design with glowing effects that builds curiosity about what's inside the box
2. **Premium** - Sophisticated animations and lighting effects that communicate high value and exclusivity
3. **Anticipatory** - Floating animations and pulsing glows that create a sense of something about to happen

**Complexity Level**: Micro Tool (single-purpose application)
This is a pure coming soon page with a single animated mystery box, minimal UI, and social links - designed to build anticipation with zero scroll on any device.

## Essential Features

**Animated Mystery Box**
- Functionality: Display a single, large 3D mystery box with continuous floating and glow animations
- Purpose: Create visual interest and build anticipation for the launch
- Trigger: Page load
- Progression: Page loads → Box fades in with scale animation → Continuous float and glow animations → Shimmer effect passes across periodically
- Success criteria: Box feels premium, mysterious, and alive with smooth 60fps animations

**Coming Soon Message**
- Functionality: Display "Coming Soon" messaging with the ONE box branding
- Purpose: Communicate launch status and build brand identity
- Trigger: Page load
- Progression: Fade in after box animation completes
- Success criteria: Clear, elegant typography that reinforces mystery and premium feel

**Social Links**
- Functionality: Provide access to GitHub, X (Twitter), and Discord communities
- Purpose: Allow interested users to follow and stay updated on launch
- Trigger: Always visible in header
- Progression: User clicks icon → Opens social platform in new tab
- Success criteria: Links are discoverable but don't distract from main mystery box

**No-Scroll Layout**
- Functionality: Entire page fits within viewport on all devices without scrolling
- Purpose: Create focused, immersive experience
- Trigger: Page load and window resize
- Progression: Content auto-adjusts to fit viewport height → Maintains single-screen layout
- Success criteria: No vertical or horizontal scroll on any device size, mobile through desktop

## Edge Case Handling

- **Very Small Screens** - Box scales down proportionally while maintaining visibility and animation quality
- **Very Large Screens** - Content centers and scales appropriately without becoming oversized
- **Landscape Mobile** - Layout adjusts to reduced height while keeping all elements visible
- **Slow Connections** - Animations start smoothly even before full page resources load
- **Reduced Motion Preference** - Respects prefers-reduced-motion and shows static or minimal animation
- **Social Link Failures** - Links open in new tab to preserve coming soon page state

## Design Direction

The design should evoke deep space mystery, premium technology, and anticipation - like witnessing a rare artifact in a private collection. Dark cosmic backgrounds with vibrant purple/magenta glows create an otherworldly, exclusive feeling that builds curiosity about the launch.

## Color Selection

A distinctive purple/magenta palette that stands apart from the ONE ecosystem while feeling connected through shared dark space aesthetic.

- **Primary Color**: `oklch(0.58 0.20 280)` - Rich purple/violet - Communicates mystery, luxury, and digital innovation
- **Secondary Colors**: 
  - Background: `oklch(0.12 0.02 265)` - Deep space navy, creates dramatic contrast
  - Surface: `oklch(0.18 0.03 260)` - Slightly lighter for the box card surface
- **Accent Color**: `oklch(0.70 0.25 320)` - Bright magenta for glows and highlights - creates energy and draws attention
- **Foreground/Background Pairings**:
  - Primary (Rich Purple oklch(0.58 0.20 280)): White text (oklch(0.98 0 0)) - Ratio 5.8:1 ✓
  - Background (Deep Navy oklch(0.12 0.02 265)): Light text (oklch(0.92 0.02 240)) - Ratio 12.8:1 ✓
  - Accent (Bright Magenta oklch(0.70 0.25 320)): White text (oklch(0.98 0 0)) - Ratio 6.2:1 ✓

## Font Selection

Clean, futuristic typography that balances readability with tech-forward personality for the "Coming Soon" message.

- **Primary Font**: Space Grotesk - Modern geometric sans with excellent readability and tech aesthetic
- **Secondary Font**: JetBrains Mono - For any technical details (not heavily used on coming soon page)

**Typographic Hierarchy**:
- H1 (ONE box logo header): Space Grotesk Bold/20px (mobile) → 24px (desktop)/tight spacing
- Hero Title (Coming Soon): Space Grotesk Bold/48px (mobile) → 96px (desktop)/tight letter spacing
- Subtitle: Space Grotesk Regular/16px (mobile) → 20px (desktop)/normal spacing
- Footer: Space Grotesk Regular/12px (mobile) → 14px (desktop)

## Animations

Animations create a living, breathing mystery box that feels like it's waiting to be opened - continuous subtle motion that never becomes distracting.

**Key Animation Moments**:
- Page load hero fade: Title and box fade in with subtle scale (800ms ease-out)
- Box float: Continuous slow vertical float with 3D rotation (4s ease-in-out infinite)
- Glow pulse: Pulsing shadow and border glow (3s ease-in-out infinite)
- Shimmer effect: Periodic light sweep across box surface (3s linear infinite)
- Icon rotations: Sparkle icons rotate continuously (20s linear infinite)
- Text glow: Pulsing text shadow on hero title (3s ease-in-out infinite)
- Button states: Smooth opacity transitions on disabled coming soon button

## Component Selection

**Components**:
- **Button**: Coming Soon CTA (disabled state) - Shadcn Button component
- **Social Icons**: Phosphor icons for GitHub, X, Discord - simple anchor links
- **Logo Icon**: Rotating Sparkle icon for brand presence
- **Mystery Box Icon**: Package icon from Phosphor as box centerpiece

**Customizations**:
- **3D Mystery Box Card**: Custom styled div with perspective transforms, gradients, glows, and shadows to create depth
- **Floating Animation**: Custom CSS keyframes for box hover effect
- **Shimmer Overlay**: Linear gradient animation that sweeps across the box
- **Glow Effects**: Multiple layered box-shadows creating dynamic glow pulses
- **Atmospheric Background**: Radial gradient blobs positioned absolutely with blur for space effect

**States**:
- All components use static or infinite animation states
- No user interaction states beyond social link hovers
- Coming Soon button is permanently disabled but styled to look intentional

**Icon Selection**:
- Sparkle (Phosphor): Rotating logo icon in header
- Package (Phosphor): Central mystery box representation
- GithubLogo, XLogo, DiscordLogo (Phosphor): Social links in header

**Spacing**:
- Header/Footer padding: 12px (mobile), 16px (desktop)
- Main content: flex-centered with auto margin
- Hero text spacing: 12px (mobile), 16px (desktop)
- Box glow margin: 16px offset for visual breathing room

**Mobile**:
- Single column centered layout
- Box scales from 280px max-width (70vw) to maintain proportions
- Text sizes scale down appropriately
- Footer remains single line with year display
- Header collapses social icons to icon-only with reduced padding
- All content remains visible without scroll in both portrait and landscape
