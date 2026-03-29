import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router'
import { useShuffledContent } from './useShuffledContent'
import { ShuffledView, RawView } from './ShuffledView'

const css = `
  .header { padding: 80px 0 48px; text-align: center; }
  .header h1 {
    font-size: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.04em;
    color: var(--text);
  }
  .header p {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin-top: 8px;
    line-height: 1.5;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 0 0 48px;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    height: 36px;
    padding: 0 16px;
    font-size: 0.875rem;
    font-family: var(--font);
    font-weight: 450;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    border: 1px solid transparent;
  }
  .btn:disabled { opacity: 0.4; cursor: default; }

  .btn-primary {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
  }
  .btn-primary:hover:not(:disabled) {
    opacity: 0.85;
  }

  .btn-secondary {
    background: transparent;
    color: var(--text);
    border-color: var(--border);
  }
  .btn-secondary:hover:not(:disabled) {
    border-color: var(--text-secondary);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .grid { grid-template-columns: 1fr; }
  }

  .panel {
    background: var(--bg);
  }
  .panel + .panel {
    border-left: 1px solid var(--border);
  }
  @media (max-width: 768px) {
    .panel + .panel {
      border-left: none;
      border-top: 1px solid var(--border);
    }
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 0.8125rem;
    color: var(--text-secondary);
    font-weight: 450;
    user-select: none;
  }

  .panel-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-tertiary);
    flex-shrink: 0;
  }

  .panel-body {
    padding: 20px;
    line-height: 1.85;
    font-size: 0.9375rem;
    min-height: 200px;
  }
  .panel-body p {
    text-indent: 2em;
    margin: 0 0 0.8em;
  }

  .raw-panel .panel-body {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    word-break: break-all;
    color: var(--text-secondary);
  }
  .raw-panel span { position: static !important; }

  .nav {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 12px;
  }
  .nav a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.15s;
  }
  .nav a:hover { color: var(--text); }

  .footer {
    text-align: center;
    padding: 48px 0 0;
    font-size: 0.8125rem;
    color: var(--text-tertiary);
  }
  .footer a {
    color: var(--text-secondary);
    text-decoration: none;
  }
  .footer a:hover { color: var(--text); }
`

const PARAGRAPHS = [
  '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？——是有人偷了他们罢：那是谁？又藏在何处呢？是他们自己逃走了罢：现在又到了哪里呢？',
  '我不知道他们给了我多少日子；但我的手确乎是渐渐空虚了。在默默里算着，八千多日子已经从我手中溜去；像针尖上一滴水滴在大海里，我的日子滴在时间的流里，没有声音，也没有影子。我不禁头涔涔而泪潸潸了。',
  '去的尽管去了，来的尽管来着；去来的中间，又怎样地匆匆呢？早上我起来的时候，小屋里射进两三方斜斜的太阳。太阳他有脚啊，轻轻悄悄地挪移了；我也茫茫然跟着旋转。于是——洗手的时候，日子从水盆里过去；吃饭的时候，日子从饭碗里过去；默默时，便从凝然的双眼前过去。我觉察他去的匆匆了，伸出手遮挽时，他又从遮挽着的手边过去，天黑时，我躺在床上，他便伶伶俐俐地从我身上跨过，从我脚边飞去了。等我睁开眼和太阳再见，这算又溜走了一日。我掩着面叹息。但是新来的日子的影儿又开始在叹息里闪过了。',
  '在逃去如飞的日子里，在千门万户的世界里的我能做些什么呢？只有徘徊罢了，只有匆匆罢了；在八千多日的匆匆里，除徘徊外，又剩些什么呢？过去的日子如轻烟，被微风吹散了，如薄雾，被初阳蒸融了；我留着些什么痕迹呢？我何曾留着像游丝样的痕迹呢？我赤裸裸来到这世界，转眼间也将赤裸裸的回去罢？但不能平的，为什么偏要白白走这一遭啊？',
]

export function App() {
  const articleRef = useRef<HTMLDivElement>(null)
  const panelBodyRef = useRef<HTMLDivElement>(null)
  const { shuffledData, doShuffle, reshuffle } = useShuffledContent()
  const [shuffled, setShuffled] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShuffle = useCallback(() => {
    if (shuffled || !articleRef.current) return
    doShuffle(articleRef.current)
    setShuffled(true)
  }, [shuffled, doShuffle])

  const handleRestore = useCallback(() => {
    if (!shuffled) return
    setShuffled(false)
    setCopied(false)
  }, [shuffled])

  const handleCopy = useCallback(async () => {
    if (!shuffledData) return
    const rawText = shuffledData.paragraphs
      .map((p) => p.characters.map((c) => c.char).join(''))
      .join('\n')
    await navigator.clipboard.writeText(rawText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [shuffledData])

  const handleResize = useEffectEvent(() => {
    if (!panelBodyRef.current) return
    const cs = getComputedStyle(panelBodyRef.current)
    const width =
      panelBodyRef.current.clientWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight)
    reshuffle(width)
  })

  useEffect(() => {
    if (!shuffled) return
    let timer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        handleResize()
      }, 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [shuffled])

  return (
    <>
      <style>{css}</style>

      <div className="header">
        <h1>Shuffle Article</h1>
        <p>在不改变视觉呈现的前提下，打乱 DOM 中的文字顺序</p>
      </div>

      <div className="controls">
        <button className="btn btn-primary" onClick={handleShuffle} disabled={shuffled}>
          打乱
        </button>
        <button className="btn btn-secondary" onClick={handleRestore} disabled={!shuffled}>
          还原
        </button>
        {shuffled && (
          <button className="btn btn-secondary" onClick={handleCopy}>
            {copied ? '已复制' : '复制试试'}
          </button>
        )}
      </div>

      <div className="grid">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-dot" />
            视觉呈现
          </div>
          <div className="panel-body" ref={panelBodyRef}>
            {shuffled && shuffledData ? (
              <ShuffledView paragraphs={shuffledData.paragraphs} />
            ) : (
              <div ref={articleRef}>
                {PARAGRAPHS.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="panel raw-panel">
          <div className="panel-header">
            <span className="panel-dot" />
            实际 DOM
          </div>
          <div className="panel-body">
            {shuffled && shuffledData ? (
              <RawView paragraphs={shuffledData.paragraphs} />
            ) : (
              PARAGRAPHS.map((text, i) => (
                <p key={i} style={{ textIndent: 0 }}>{text}</p>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="nav">
        <Link to="/playground">Playground</Link>
        <a href="https://github.com/Innei/shuffle-article" target="_blank" rel="noopener">
          GitHub
        </a>
      </div>

      <footer className="footer">
        <p>
          Powered by{' '}
          <a href="https://github.com/chenglou/pretext" target="_blank" rel="noopener">
            pretext
          </a>
        </p>
      </footer>
    </>
  )
}
