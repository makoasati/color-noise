'use client'
import { useState, useCallback, useRef } from 'react'
import { useEditor, EditorContent, Extension } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'

// Custom FontSize extension using TextStyle
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] } },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: el => el.style.fontSize || null,
          renderHTML: attrs => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
        },
      },
    }]
  },
  addCommands() {
    return {
      setFontSize: (size) => ({ chain }) =>
        chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize: () => ({ chain }) =>
        chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

// Image extension with resizable width attribute
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: el => el.getAttribute('width') || el.style.width || null,
        renderHTML: attrs => attrs.width ? { width: attrs.width, style: `width: ${attrs.width}` } : {},
      },
    }
  },
})

const FONT_FAMILIES = [
  { label: 'Default', value: '' },
  { label: 'DM Sans', value: "'DM Sans', sans-serif" },
  { label: 'Outfit', value: "'Outfit', sans-serif" },
  { label: 'Archivo Narrow', value: "'Archivo Narrow', sans-serif" },
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: "'Courier New', monospace" },
]

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px']

const IMAGE_WIDTHS = [
  { label: '25%', value: '25%' },
  { label: '50%', value: '50%' },
  { label: '75%', value: '75%' },
  { label: '100%', value: '100%' },
]

function ToolbarBtn({ active, onClick, title, children, style: extraStyle }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 30, height: 30,
        border: 'none',
        background: active ? 'rgba(231,59,47,0.12)' : hovered ? 'rgba(0,0,0,0.06)' : 'transparent',
        color: active ? '#E73B2F' : '#111111',
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Archivo Narrow', sans-serif",
        fontSize: 12, fontWeight: 700,
        borderRadius: 2,
        transition: 'background 0.1s, color 0.1s',
        flexShrink: 0, userSelect: 'none',
        padding: '0 4px',
        ...extraStyle,
      }}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div style={{ width: 1, background: '#CCC5B8', margin: '4px 3px', alignSelf: 'stretch', flexShrink: 0 }} />
}

function ToolbarSelect({ value, onChange, title, children, width = 110 }) {
  return (
    <select
      title={title}
      value={value}
      onChange={e => onChange(e.target.value)}
      onMouseDown={e => e.stopPropagation()}
      style={{
        height: 26, fontSize: 11, border: '1px solid #CCC5B8',
        background: '#fff', color: '#111', cursor: 'pointer',
        fontFamily: "'Archivo Narrow', sans-serif",
        padding: '0 4px', borderRadius: 2, width,
        flexShrink: 0,
      }}
    >
      {children}
    </select>
  )
}

function ImageModal({ onInsert, onClose }) {
  const [tab, setTab] = useState('upload')
  const [url, setUrl] = useState('')
  const [base64Data, setBase64Data] = useState(null)
  const [previewSrc, setPreviewSrc] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => { setBase64Data(e.target.result); setPreviewSrc(e.target.result) }
    reader.readAsDataURL(file)
  }

  const canInsert = tab === 'upload' ? !!base64Data : !!url.trim()
  const handleInsert = () => { if (canInsert) onInsert(tab === 'upload' ? base64Data : url.trim()) }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#fff', width: 480, maxWidth: '92vw', border: '1px solid #CCC5B8', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 0', borderBottom: '1px solid #CCC5B8' }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: '#111', marginBottom: 16 }}>Insert Image</div>
          <div style={{ display: 'flex' }}>
            {[['upload', 'Upload File'], ['url', 'Image URL']].map(([t, label]) => (
              <button key={t} type="button" onClick={() => setTab(t)} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, padding: '8px 16px', border: 'none', background: 'transparent', cursor: 'pointer', color: tab === t ? '#E73B2F' : '#8A8A8A', borderBottom: tab === t ? '2px solid #E73B2F' : '2px solid transparent', marginBottom: -1 }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: 24 }}>
          {tab === 'upload' ? (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
                style={{ border: `2px dashed ${dragging ? '#E73B2F' : '#CCC5B8'}`, padding: '36px 24px', textAlign: 'center', cursor: 'pointer', background: dragging ? '#fff5f4' : '#F5F1E8', marginBottom: 16, transition: 'all 0.15s' }}
              >
                <div style={{ fontSize: 28, color: '#CCC5B8', marginBottom: 8 }}>⊞</div>
                <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A' }}>Drop image here or click to browse</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#CCC5B8', marginTop: 4 }}>JPG, PNG, WebP, GIF</div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />
              {previewSrc && <img src={previewSrc} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain', display: 'block', border: '1px solid #CCC5B8', marginBottom: 16 }} />}
            </>
          ) : (
            <>
              <label style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A', display: 'block', marginBottom: 6 }}>Image URL</label>
              <input type="url" value={url} autoFocus onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleInsert()} placeholder="https://..." style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: '#F5F1E8', border: '1px solid #CCC5B8', color: '#111', padding: '10px 12px', width: '100%', boxSizing: 'border-box', marginBottom: 12 }} />
              {url && <img src={url} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain', display: 'block', border: '1px solid #CCC5B8' }} onError={(e) => { e.target.style.display = 'none' }} />}
            </>
          )}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
            <button type="button" onClick={onClose} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', padding: '10px 20px', cursor: 'pointer', background: 'transparent', color: '#8A8A8A', border: '1px solid #CCC5B8', fontWeight: 500 }}>Cancel</button>
            <button type="button" onClick={handleInsert} disabled={!canInsert} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', padding: '10px 20px', cursor: canInsert ? 'pointer' : 'default', background: '#E73B2F', color: '#fff', border: 'none', fontWeight: 700, opacity: canInsert ? 1 : 0.35 }}>Insert</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkModal({ editor, onClose }) {
  const [url, setUrl] = useState(editor.getAttributes('link').href || '')
  const isActive = editor.isActive('link')
  const apply = () => {
    if (url.trim()) editor.chain().focus().setLink({ href: url.trim() }).run()
    else editor.chain().focus().unsetLink().run()
    onClose()
  }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', width: 400, maxWidth: '92vw', padding: 28, border: '1px solid #CCC5B8' }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: '#111', marginBottom: 16 }}>Set Link</div>
        <label style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A', display: 'block', marginBottom: 6 }}>URL</label>
        <input type="url" value={url} autoFocus onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && apply()} placeholder="https://..." style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: '#F5F1E8', border: '1px solid #CCC5B8', color: '#111', padding: '10px 12px', width: '100%', boxSizing: 'border-box' }} />
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          {isActive && <button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); onClose() }} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', padding: '10px 16px', cursor: 'pointer', background: 'transparent', color: '#E73B2F', border: '1px solid #E73B2F', fontWeight: 500 }}>Remove</button>}
          <div style={{ flex: 1 }} />
          <button type="button" onClick={onClose} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', padding: '10px 16px', cursor: 'pointer', background: 'transparent', color: '#8A8A8A', border: '1px solid #CCC5B8', fontWeight: 500 }}>Cancel</button>
          <button type="button" onClick={apply} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', padding: '10px 16px', cursor: 'pointer', background: '#E73B2F', color: '#fff', border: 'none', fontWeight: 700 }}>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default function RichTextEditor({ value, onChange }) {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [linkModalOpen, setLinkModalOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      ResizableImage.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing…' }),
    ],
    immediatelyRender: false,
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: 'cn-editor-body' } },
  })

  const handleInsertImage = useCallback((src) => {
    editor?.chain().focus().setImage({ src }).run()
    setImageModalOpen(false)
  }, [editor])

  if (!editor) return null

  // Detect if cursor is inside/on an image node
  const { selection } = editor.state
  const selectedNode = selection.$anchor.nodeAfter || selection.$from.nodeAfter
  const isImageSelected = selectedNode?.type?.name === 'image' ||
    editor.state.doc.nodeAt(selection.from)?.type?.name === 'image'

  const currentImageWidth = isImageSelected
    ? (editor.state.doc.nodeAt(selection.from) || selectedNode)?.attrs?.width || '100%'
    : '100%'

  const currentFont = editor.getAttributes('textStyle').fontFamily || ''
  const currentSize = editor.getAttributes('textStyle').fontSize || ''

  return (
    <div style={{ border: '1px solid #CCC5B8', background: '#fff' }}>
      {/* Main toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, padding: '5px 8px', background: '#F5F1E8', borderBottom: '1px solid #CCC5B8', position: 'sticky', top: 0, zIndex: 10 }}>
        <ToolbarBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><b>B</b></ToolbarBtn>
        <ToolbarBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><i>I</i></ToolbarBtn>
        <ToolbarBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><span style={{ textDecoration: 'underline' }}>U</span></ToolbarBtn>
        <ToolbarBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><span style={{ textDecoration: 'line-through' }}>S</span></ToolbarBtn>
        <ToolbarDivider />
        <ToolbarBtn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">H2</ToolbarBtn>
        <ToolbarBtn active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">H3</ToolbarBtn>
        <ToolbarBtn active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} title="Heading 4">H4</ToolbarBtn>
        <ToolbarDivider />
        <ToolbarBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">≡</ToolbarBtn>
        <ToolbarBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">1.</ToolbarBtn>
        <ToolbarDivider />
        <ToolbarBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">"</ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">—</ToolbarBtn>
        <ToolbarDivider />
        <ToolbarBtn active={editor.isActive('link')} onClick={() => setLinkModalOpen(true)} title="Link">↗</ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => setImageModalOpen(true)} title="Insert image">⊞</ToolbarBtn>
        <ToolbarDivider />
        <ToolbarBtn active={false} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">×</ToolbarBtn>
      </div>

      {/* Typography toolbar row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', background: '#FAFAF8', borderBottom: '1px solid #CCC5B8', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8A8A8A', marginRight: 2 }}>Font</span>
        <ToolbarSelect
          title="Font family"
          value={currentFont}
          onChange={(val) => {
            if (!val) editor.chain().focus().unsetFontFamily().run()
            else editor.chain().focus().setFontFamily(val).run()
          }}
          width={140}
        >
          {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </ToolbarSelect>

        <ToolbarSelect
          title="Font size"
          value={currentSize}
          onChange={(val) => {
            if (!val) editor.chain().focus().unsetFontSize().run()
            else editor.chain().focus().setFontSize(val).run()
          }}
          width={72}
        >
          <option value="">Size</option>
          {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </ToolbarSelect>

        {isImageSelected && (
          <>
            <ToolbarDivider />
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8A8A8A', marginRight: 2 }}>Image width</span>
            {IMAGE_WIDTHS.map(({ label, value }) => (
              <ToolbarBtn
                key={value}
                active={currentImageWidth === value}
                title={`Set image width to ${label}`}
                onClick={() => {
                  const pos = selection.from
                  const node = editor.state.doc.nodeAt(pos) || selectedNode
                  if (node?.type?.name === 'image') {
                    editor.chain().focus().updateAttributes('image', { width: value }).run()
                  }
                }}
              >
                {label}
              </ToolbarBtn>
            ))}
          </>
        )}
      </div>

      <EditorContent editor={editor} />
      {imageModalOpen && <ImageModal onInsert={handleInsertImage} onClose={() => setImageModalOpen(false)} />}
      {linkModalOpen && <LinkModal editor={editor} onClose={() => setLinkModalOpen(false)} />}
    </div>
  )
}
