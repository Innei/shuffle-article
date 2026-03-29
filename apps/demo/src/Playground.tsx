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

const DEFAULT_TEXT =
  '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？'

const css = `
  .pg-header {
    padding: 48px 0 32px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .pg-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .pg-header a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
  }
  .pg-header a:hover { color: var(--text); }

  .pg-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  @media (max-width: 900px) {
    .pg-grid { grid-template-columns: 1fr; }
    .pg-right { border-left: none !important; border-top: 1px solid var(--border); }
  }

  .pg-left {
    display: flex;
    flex-direction: column;
  }
  .pg-right {
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
  }

  .pg-panel-header {
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
    flex-shrink: 0;
  }

  .pg-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-tertiary);
  }

  .pg-editor {
    flex: 1;
    min-height: 240px;
    padding: 16px;
    outline: none;
    line-height: 1.85;
    font-size: 0.9375rem;
    font-family: var(--font);
    color: var(--text);
    background: var(--bg);
    border: none;
    resize: none;
    word-break: break-all;
  }
  .pg-editor:focus {
    background: var(--bg);
  }

  .pg-section {
    border-top: 1px solid var(--border);
    flex: 1;
  }

  .pg-body {
    padding: 16px;
    line-height: 1.85;
    font-size: 0.9375rem;
    min-height: 120px;
  }

  .pg-raw-body {
    padding: 16px;
    line-height: 1.85;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    word-break: break-all;
    color: var(--text-secondary);
    min-height: 120px;
  }
  .pg-raw-body span { position: static !important; }

  .pg-footer {
    text-align: center;
    padding: 32px 0 0;
    font-size: 0.8125rem;
    color: var(--text-tertiary);
  }
  .pg-footer a {
    color: var(--text-secondary);
    text-decoration: none;
  }
  .pg-footer a:hover { color: var(--text); }
`

export function Playground() {
  const editorRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLDivElement>(null)
  const { shuffledData, doShuffle, reshuffle } = useShuffledContent()
  const [initialized, setInitialized] = useState(false)

  const syncHiddenWidth = useCallback(() => {
    if (hiddenRef.current && editorRef.current) {
      hiddenRef.current.style.width = `${editorRef.current.clientWidth}px`
    }
  }, [])

  const triggerShuffle = useEffectEvent(() => {
    if (!hiddenRef.current || !editorRef.current) return
    syncHiddenWidth()
    hiddenRef.current.innerHTML = editorRef.current.innerHTML
    if (!hiddenRef.current.querySelector('p')) {
      hiddenRef.current.innerHTML = `<p>${hiddenRef.current.innerHTML}</p>`
    }
    doShuffle(hiddenRef.current)
  })

  useEffect(() => {
    if (!initialized && editorRef.current) {
      editorRef.current.innerHTML = `<p>${DEFAULT_TEXT}</p>`
      requestAnimationFrame(() => {
        triggerShuffle()
        setInitialized(true)
      })
    }
  }, [initialized])

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
  }, [])

  const handleResize = useEffectEvent(() => {
    if (!editorRef.current) return
    syncHiddenWidth()
    const cs = getComputedStyle(editorRef.current)
    const width =
      editorRef.current.clientWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight)
    reshuffle(width)
  })

  useEffect(() => {
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
  }, [syncHiddenWidth])

  return (
    <>
      <style>{css}</style>

      <div className="pg-header">
        <h1>Playground</h1>
        <Link to="/">← Back</Link>
      </div>

      <div className="pg-grid">
        {/* Left: Editor + Raw */}
        <div className="pg-left">
          <div className="pg-panel-header">
            <span className="pg-dot" />
            输入
          </div>
          <div
            ref={editorRef}
            className="pg-editor"
            contentEditable
            suppressContentEditableWarning
          />
          <div className="pg-section">
            <div className="pg-panel-header">
              <span className="pg-dot" />
              实际 DOM
            </div>
            <div className="pg-raw-body">
              {shuffledData && <RawView paragraphs={shuffledData.paragraphs} />}
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="pg-right">
          <div className="pg-panel-header">
            <span className="pg-dot" />
            视觉呈现
          </div>
          <div className="pg-body">
            {shuffledData && <ShuffledView paragraphs={shuffledData.paragraphs} />}
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
          lineHeight: '1.85',
          fontSize: '0.9375rem',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', 'PingFang SC', sans-serif",
        }}
      />

      <footer className="pg-footer">
        <p>
          <a href="https://github.com/Innei/shuffle-article" target="_blank" rel="noopener">
            GitHub
          </a>
        </p>
      </footer>
    </>
  )
}
