import type { ShuffledChar } from './useShuffledContent'

interface ShuffledViewProps {
  paragraphs: { chars: ShuffledChar[]; height: number }[]
}

export function ShuffledView({ paragraphs }: ShuffledViewProps) {
  return (
    <div>
      {paragraphs.map((p, i) => (
        <div
          key={i}
          data-shuffle-p=""
          style={{ position: 'relative', height: p.height }}
        >
          {p.chars.map((c, j) => (
            <span
              key={j}
              data-shuffle=""
              style={{
                position: 'absolute',
                left: c.x,
                top: c.y,
              }}
            >
              {c.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

interface RawViewProps {
  paragraphs: { chars: ShuffledChar[]; height: number }[]
}

export function RawView({ paragraphs }: RawViewProps) {
  return (
    <div>
      {paragraphs.map((p, i) => (
        <div key={i} data-shuffle-p="">
          {p.chars.map((c, j) => (
            <span key={j} data-shuffle="">
              {c.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
