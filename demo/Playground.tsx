import { useCallback, useEffect, useRef, useState } from 'react'
import { useShuffledContent } from './useShuffledContent'
import { ShuffledView, RawView } from './ShuffledView'
import { GithubCorner } from './GithubCorner'

const DEFAULT_TEXT =
  '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？'

const styles = {
  header: {
    padding: '40px 0 32px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    fontWeight: 300,
  },
  backLink: {
    display: 'inline-block',
    marginTop: '12px',
    fontSize: '0.85rem',
    color: 'var(--accent)',
    textDecoration: 'none',
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
  cardTop: (color: string) => ({
    height: '4px',
    background: color,
  }),
  cardLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 20px 8px',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--text-secondary)',
  },
  dot: (color: string) => ({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }),
  editorToolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderBottom: '1px solid var(--surface-border)',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  toolbarDot: (color: string) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: color,
  }),
  editor: {
    minHeight: '220px',
    padding: '16px 20px',
    outline: 'none',
    lineHeight: 1.9,
    fontSize: '1rem',
    fontFamily: 'var(--body-font)',
    color: 'var(--text)',
    wordBreak: 'break-all' as const,
  },
  previewBody: {
    padding: '8px 20px 20px',
    lineHeight: 1.9,
    fontSize: '1rem',
    fontFamily: 'var(--body-font)',
  },
  rawBody: {
    padding: '8px 20px 20px',
    lineHeight: 1.9,
    fontSize: '0.82rem',
    fontFamily: 'var(--mono-font)',
    wordBreak: 'break-all' as const,
  },
  pulseRing: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--green)',
    marginLeft: 'auto',
    animation: 'pulse 2s ease-in-out infinite',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '32px 0 0',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
  },
  footerLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
  },
} as const

export function Playground() {
  const editorRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLDivElement>(null)
  const { shuffledData, doShuffle } = useShuffledContent()
  const [initialized, setInitialized] = useState(false)

  const triggerShuffle = useCallback(() => {
    if (!hiddenRef.current || !editorRef.current) return
    hiddenRef.current.innerHTML = editorRef.current.innerHTML
    if (!hiddenRef.current.querySelector('p')) {
      hiddenRef.current.innerHTML = `<p>${hiddenRef.current.innerHTML}</p>`
    }
    doShuffle(hiddenRef.current)
  }, [doShuffle])

  useEffect(() => {
    if (!initialized && editorRef.current) {
      editorRef.current.innerHTML = `<p>${DEFAULT_TEXT}</p>`
      requestAnimationFrame(() => {
        triggerShuffle()
        setInitialized(true)
      })
    }
  }, [initialized, triggerShuffle])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onInput = () => {
      clearTimeout(timer)
      timer = setTimeout(triggerShuffle, 300)
    }
    const editor = editorRef.current
    editor?.addEventListener('input', onInput)
    return () => {
      clearTimeout(timer)
      editor?.removeEventListener('input', onInput)
    }
  }, [triggerShuffle])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(triggerShuffle, 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [triggerShuffle])

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        @media (max-width: 900px) {
          .pg-grid { grid-template-columns: 1fr !important; }
        }
        .raw-card span { position: static !important; }
      `}</style>

      <GithubCorner />

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Playground</h1>
        <p style={styles.subtitle}>
          输入或粘贴文字，实时查看打乱效果
        </p>
        <a href="./index.html" style={styles.backLink}>
          ← 返回演示
        </a>
      </div>

      {/* Main grid */}
      <div className="pg-grid" style={styles.grid}>
        {/* Left column: Editor + Raw */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Editor Card */}
          <div style={styles.card}>
            <div style={styles.cardTop('var(--accent-gradient)')} />
            <div style={styles.editorToolbar}>
              <span style={styles.toolbarDot('#ff5f57')} />
              <span style={styles.toolbarDot('#febc2e')} />
              <span style={styles.toolbarDot('#28c840')} />
              <span style={{ marginLeft: '12px', fontFamily: 'var(--mono-font)' }}>
                editor
              </span>
            </div>
            <div
              ref={editorRef}
              style={styles.editor}
              contentEditable
              suppressContentEditableWarning
            />
          </div>

          {/* Raw DOM Card */}
          <div className="raw-card" style={styles.card}>
            <div style={styles.cardTop('linear-gradient(90deg, var(--orange), #fbbf24)')} />
            <div style={styles.cardLabel}>
              <span style={styles.dot('var(--orange)')} />
              <span>实际 DOM 顺序</span>
            </div>
            <div style={styles.rawBody}>
              {shuffledData && <RawView paragraphs={shuffledData.paragraphs} />}
            </div>
          </div>
        </div>

        {/* Right column: Visual Preview */}
        <div style={styles.card}>
          <div style={styles.cardTop('linear-gradient(90deg, var(--green), #34d399)')} />
          <div style={styles.cardLabel}>
            <span style={styles.dot('var(--green)')} />
            <span>视觉呈现</span>
            <span style={styles.pulseRing} title="实时同步" />
          </div>
          <div style={styles.previewBody}>
            {shuffledData && (
              <ShuffledView paragraphs={shuffledData.paragraphs} />
            )}
          </div>
        </div>
      </div>

      {/* Hidden measurement element */}
      <div
        ref={hiddenRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          width: editorRef.current?.clientWidth ?? 500,
          lineHeight: '1.9',
          fontSize: '1rem',
          fontFamily: "'LXGW WenKai', 'Noto Serif SC', 'PingFang SC', serif",
        }}
      />

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
