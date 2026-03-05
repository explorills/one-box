import { useState, useRef, useEffect } from 'react'
import { CaretDown } from '@phosphor-icons/react'

const ECOSYSTEM_LINKS = [
  { name: 'MAIN', url: 'https://expl.one' },
  { name: 'pump', url: 'https://pump.expl.one' },
  { name: 'network', url: 'https://network.expl.one' },
  { name: 'world', url: 'https://world.expl.one' },
  { name: 'id', url: 'https://id.expl.one' },
  { name: 'EXPL Nodes', url: 'https://node.expl.one' },
  { name: 'docs', url: 'https://docs.expl.one' },
]

export function EcosystemDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary border border-border rounded-lg transition-all duration-200 cursor-pointer"
      >
        ONE ecosystem
        <CaretDown
          size={14}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 py-1.5 bg-card border border-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_oklch(0.58_0.20_280/0.1)] backdrop-blur-xl overflow-hidden z-50">
          {ECOSYSTEM_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
