import { useCallback, useEffect, useRef, useState } from 'react'
import { useShuffledContent } from './useShuffledContent'
import { ShuffledView, RawView } from './ShuffledView'
import { GithubCorner } from './GithubCorner'

const DEFAULT_TEXT = '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？'

export function Playground() {
  const editorRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLDivElement>(null)
  const { shuffledData, doShuffle } = useShuffledContent()
  const [initialized, setInitialized] = useState(false)

  const triggerShuffle = useCallback(() => {
    if (!hiddenRef.current || !editorRef.current) return
    // Copy editor content to hidden measurement element
    hiddenRef.current.innerHTML = editorRef.current.innerHTML
    // Wrap in <p> if there are none
    if (!hiddenRef.current.querySelector('p')) {
      hiddenRef.current.innerHTML = `<p>${hiddenRef.current.innerHTML}</p>`
    }
    doShuffle(hiddenRef.current)
  }, [doShuffle])

  // Initial shuffle
  useEffect(() => {
    if (!initialized && editorRef.current) {
      editorRef.current.innerHTML = `<p>${DEFAULT_TEXT}</p>`
      // Wait for DOM to be ready
      requestAnimationFrame(() => {
        triggerShuffle()
        setInitialized(true)
      })
    }
  }, [initialized, triggerShuffle])

  // Debounced input handler
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

  // Resize handler
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
      <GithubCorner />
      <div className="g">
        <div>
          <p className="label">在此输入文字或粘贴富文本:</p>
          <div
            ref={editorRef}
            id="editor"
            contentEditable
            suppressContentEditableWarning
          />
          <p className="label">实际上:</p>
          <div className="raw-view">
            {shuffledData && <RawView paragraphs={shuffledData.paragraphs} />}
          </div>
        </div>
        <div>
          <p className="label">视觉上:</p>
          <div className="visual-view">
            {shuffledData && (
              <ShuffledView paragraphs={shuffledData.paragraphs} />
            )}
          </div>
        </div>
      </div>

      {/* Hidden element for measuring text layout */}
      <div
        ref={hiddenRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          width: editorRef.current?.clientWidth ?? 500,
          lineHeight: '1.8',
          fontSize: '16px',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      />
    </>
  )
}
