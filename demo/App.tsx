import { useCallback, useEffect, useRef, useState } from 'react'
import { useShuffledContent } from './useShuffledContent'
import { ShuffledView, RawView } from './ShuffledView'
import { GithubCorner } from './GithubCorner'

const ARTICLE_PARAGRAPHS = [
  '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？——是有人偷了他们罢：那是谁？又藏在何处呢？是他们自己逃走了罢：现在又到了哪里呢？',
  '我不知道他们给了我多少日子；但我的手确乎是渐渐空虚了。在默默里算着，八千多日子已经从我手中溜去；像针尖上一滴水滴在大海里，我的日子滴在时间的流里，没有声音，也没有影子。我不禁头涔涔而泪潸潸了。',
  '去的尽管去了，来的尽管来着；去来的中间，又怎样地匆匆呢？早上我起来的时候，小屋里射进两三方斜斜的太阳。太阳他有脚啊，轻轻悄悄地挪移了；我也茫茫然跟着旋转。于是——洗手的时候，日子从水盆里过去；吃饭的时候，日子从饭碗里过去；默默时，便从凝然的双眼前过去。我觉察他去的匆匆了，伸出手遮挽时，他又从遮挽着的手边过去，天黑时，我躺在床上，他便伶伶俐俐地从我身上跨过，从我脚边飞去了。等我睁开眼和太阳再见，这算又溜走了一日。我掩着面叹息。但是新来的日子的影儿又开始在叹息里闪过了。',
  '在逃去如飞的日子里，在千门万户的世界里的我能做些什么呢？只有徘徊罢了，只有匆匆罢了；在八千多日的匆匆里，除徘徊外，又剩些什么呢？过去的日子如轻烟，被微风吹散了，如薄雾，被初阳蒸融了；我留着些什么痕迹呢？我何曾留着像游丝样的痕迹呢？我赤裸裸来到这世界，转眼间也将赤裸裸的回去罢？但不能平的，为什么偏要白白走这一遭啊？',
]

const styles = {
  hero: {
    textAlign: 'center' as const,
    padding: '64px 0 40px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    fontWeight: 300,
    marginBottom: '4px',
  },
  heroHint: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    opacity: 0.7,
    marginTop: '12px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    margin: '0 0 40px',
    flexWrap: 'wrap' as const,
  },
  btnPrimary: {
    padding: '10px 28px',
    fontSize: '0.95rem',
    fontFamily: 'var(--body-font)',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--accent-gradient)',
    color: '#fff',
    fontWeight: 500,
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 2px 12px rgba(99, 102, 241, 0.3)',
  },
  btnSecondary: {
    padding: '10px 28px',
    fontSize: '0.95rem',
    fontFamily: 'var(--body-font)',
    cursor: 'pointer',
    border: '1.5px solid var(--surface-border)',
    borderRadius: '10px',
    background: 'var(--surface)',
    backdropFilter: 'blur(12px)',
    color: 'var(--text)',
    fontWeight: 500,
    transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
  },
  btnCopy: {
    padding: '10px 28px',
    fontSize: '0.95rem',
    fontFamily: 'var(--body-font)',
    cursor: 'pointer',
    border: '1.5px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '10px',
    background: 'rgba(16, 185, 129, 0.08)',
    color: 'var(--green)',
    fontWeight: 500,
    transition: 'transform 0.15s, background 0.15s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  card: {
    background: 'var(--surface)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--surface-border)',
    borderRadius: 'var(--card-radius)',
    boxShadow: 'var(--card-shadow)',
    overflow: 'hidden',
  },
  cardHeaderVisual: {
    height: '4px',
    background: 'linear-gradient(90deg, var(--green), #34d399)',
  },
  cardHeaderActual: {
    height: '4px',
    background: 'linear-gradient(90deg, var(--orange), #fbbf24)',
  },
  cardLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 24px 8px',
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--text-secondary)',
  },
  dot: (color: string) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }),
  articleBody: {
    padding: '8px 24px 24px',
    lineHeight: 1.9,
    fontSize: '1rem',
    fontWeight: 300,
  },
  rawBody: {
    padding: '8px 24px 24px',
    lineHeight: 1.9,
    fontSize: '0.85rem',
    fontFamily: 'var(--mono-font)',
    wordBreak: 'break-all' as const,
  },
  footer: {
    textAlign: 'center' as const,
    padding: '48px 0 0',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
  },
  footerLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
  },
  playgroundLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  shuffleAnimation: {
    animation: 'shuffleIn 0.4s ease-out',
  },
} as const

export function App() {
  const articleRef = useRef<HTMLDivElement>(null)
  const { shuffledData, doShuffle } = useShuffledContent()
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
    // The visual text looks correct but DOM order is shuffled,
    // so copying from the raw view gives scrambled text
    const rawText = shuffledData.paragraphs
      .map((p) => p.chars.map((c) => c.char).join(''))
      .join('\n')
    await navigator.clipboard.writeText(rawText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [shuffledData])

  useEffect(() => {
    if (!shuffled) return
    let timer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (articleRef.current) doShuffle(articleRef.current)
      }, 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [shuffled, doShuffle])

  return (
    <>
      <style>{`
        @keyframes shuffleIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .compare-grid { grid-template-columns: 1fr !important; }
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(99,102,241,0.4) !important; }
        .btn-primary:active { transform: translateY(0); }
        .btn-secondary:hover { border-color: var(--accent) !important; transform: translateY(-1px); }
        .btn-copy:hover { background: rgba(16,185,129,0.15) !important; transform: translateY(-1px); }
        .raw-card span { position: static !important; }
      `}</style>

      <GithubCorner />

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroSubtitle}>朱自清 ·《匆匆》</div>
        <h1 style={styles.heroTitle}>Shuffle Article</h1>
        <p style={styles.heroSubtitle}>
          在不改变视觉呈现的前提下，打乱 DOM 中的文字顺序
        </p>
        <p style={styles.heroHint}>
          打开 DevTools 检查 DOM 树，你会看到字符顺序已被完全打乱
        </p>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button
          className="btn-primary"
          style={styles.btnPrimary}
          onClick={handleShuffle}
          disabled={shuffled}
        >
          打乱文字
        </button>
        <button
          className="btn-secondary"
          style={styles.btnSecondary}
          onClick={handleRestore}
          disabled={!shuffled}
        >
          还原
        </button>
        {shuffled && (
          <button
            className="btn-copy"
            style={styles.btnCopy}
            onClick={handleCopy}
          >
            {copied ? '已复制到剪贴板' : '复制试试'}
          </button>
        )}
        <span style={{ width: '100%', textAlign: 'center' }}>
          <a href="./playground.html" style={styles.playgroundLink}>
            Playground →
          </a>
        </span>
      </div>

      {/* Comparison Grid */}
      <div className="compare-grid" style={styles.grid}>
        {/* Visual Card */}
        <div style={styles.card}>
          <div style={styles.cardHeaderVisual} />
          <div style={styles.cardLabel}>
            <span style={styles.dot('var(--green)')} />
            <span>视觉呈现</span>
          </div>
          <div style={styles.articleBody}>
            {shuffled && shuffledData ? (
              <div style={styles.shuffleAnimation}>
                <ShuffledView paragraphs={shuffledData.paragraphs} />
              </div>
            ) : (
              <div ref={articleRef}>
                {ARTICLE_PARAGRAPHS.map((text, i) => (
                  <p key={i} style={{ textIndent: '2em', margin: '0 0 1em' }}>
                    {text}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actual DOM Card */}
        <div className="raw-card" style={styles.card}>
          <div style={styles.cardHeaderActual} />
          <div style={styles.cardLabel}>
            <span style={styles.dot('var(--orange)')} />
            <span>实际 DOM 顺序</span>
          </div>
          <div style={styles.rawBody}>
            {shuffled && shuffledData ? (
              <div style={styles.shuffleAnimation}>
                <RawView paragraphs={shuffledData.paragraphs} />
              </div>
            ) : (
              ARTICLE_PARAGRAPHS.map((text, i) => (
                <p key={i} style={{ margin: '0 0 1em' }}>
                  {text}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>
          Powered by{' '}
          <a
            href="https://github.com/chenglou/pretext"
            style={styles.footerLink}
            target="_blank"
            rel="noopener"
          >
            @chenglou/pretext
          </a>
          {' · '}
          <a
            href="https://github.com/Innei/shuffle-article"
            style={styles.footerLink}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>
      </footer>
    </>
  )
}
