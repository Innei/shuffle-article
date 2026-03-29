import type { ShuffledBlock } from '../src'

interface ShuffledViewProps {
  paragraphs: ShuffledBlock[]
}

export function ShuffledView({ paragraphs }: ShuffledViewProps) {
  return (
    <div>
      {paragraphs.map((p, i) => (
        <div
          key={i}
          data-shuffle-p=""
          style={{ position: 'relative', height: p.height, margin: p.margin }}
        >
          {p.characters.map((c, j) => (
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
  paragraphs: ShuffledBlock[]
}

export function RawView({ paragraphs }: RawViewProps) {
  return (
    <div>
      {paragraphs.map((p, i) => (
        <div key={i} data-shuffle-p="">
          {p.characters.map((c, j) => (
            <span key={j} data-shuffle="">
              {c.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
