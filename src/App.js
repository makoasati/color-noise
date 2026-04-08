import { useState, useEffect, useRef } from "react"; // useRef used in CoverImageField
import RichTextEditor from "./RichTextEditor";
import "./editor.css";

// Convert legacy plain-text body (newline-separated) to HTML paragraphs
function legacyBodyToHtml(text) {
  if (!text || text.startsWith("<")) return text;
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

const CATEGORIES = ["review", "news", "spotlight"];
const CATEGORY_LABELS = { review: "Heard", news: "Around", spotlight: "Seen" };
const CATEGORY_COLOR = { review: "#E73B2F", news: "#C95C2B", spotlight: "#2D4DFF" };

// ── Noise texture as inline SVG data URI ──
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const STYLES = {
  // ── Layout zones ──
  app: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#111111",
    color: "#F5F1E8",
    minHeight: "100vh",
  },
  darkZone: {
    background: "#111111",
    position: "relative",
    overflow: "hidden",
  },
  lightZone: {
    background: "#F5F1E8",
    position: "relative",
  },
  noiseOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: NOISE_SVG,
    backgroundRepeat: "repeat",
    backgroundSize: "256px 256px",
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.035,
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 24px",
  },
  contentLight: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 24px 48px",
  },

  // ── Header ──
  header: {
    padding: "40px 0 28px",
  },
  mastheadWrapper: {
    display: "block",
    cursor: "pointer",
    userSelect: "none",
  },
  mastheadLine1: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 900,
    fontSize: "clamp(44px, 8.5vw, 75px)",
    letterSpacing: "-3px",
    lineHeight: 0.92,
    color: "#2D4DFF",
    textTransform: "uppercase",
    display: "block",
    margin: 0,
    padding: 0,
  },
  mastheadLine2Outer: {
    display: "block",
    lineHeight: 0.95,
  },
  mastheadAmpersand: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontStyle: "italic",
    color: "#E73B2F",
    fontSize: "clamp(44px, 8.5vw, 75px)",
  },
  mastheadNoise: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontStyle: "italic",
    color: "#F5F1E8",
    fontSize: "clamp(44px, 8.5vw, 75px)",
  },
  tagline: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "3px",
    color: "#8A8A8A",
    marginTop: 14,
  },

  // ── Nav ──
  nav: {
    display: "flex",
    gap: 0,
    borderTop: "1px solid #2A2A2A",
    borderBottom: "1px solid #2A2A2A",
  },
  navItem: (active) => ({
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "2.5px",
    padding: "14px 20px",
    cursor: "pointer",
    background: active ? "#F5F1E8" : "transparent",
    color: active ? "#111111" : "#8A8A8A",
    border: "none",
    fontWeight: 600,
    transition: "all 0.15s",
  }),

  // ── Article Card (on light bg) ──
  card: {
    borderBottom: "1px solid #CCC5B8",
    padding: "32px 0",
    cursor: "pointer",
    transition: "border-left-color 0.15s, padding-left 0.15s",
  },
  cardCategory: (cat) => ({
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "3px",
    color: CATEGORY_COLOR[cat] || "#8A8A8A",
    marginBottom: 8,
    fontWeight: 700,
  }),
  cardTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "clamp(20px, 3vw, 28px)",
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.3px",
    marginBottom: 10,
    transition: "color 0.15s",
  },
  cardMeta: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 12,
    color: "#8A8A8A",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontWeight: 500,
    marginBottom: 10,
  },
  cardExcerpt: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#555555",
    maxWidth: 640,
  },

  // ── Article Full (on light bg) ──
  articleBack: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "3px",
    color: "#E73B2F",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    padding: "28px 0",
    fontWeight: 700,
    display: "block",
  },
  articleTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "clamp(30px, 5vw, 48px)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.5px",
    color: "#111111",
    marginBottom: 16,
  },
  articleMeta: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 13,
    color: "#8A8A8A",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    paddingBottom: 20,
    borderBottom: "2px solid #E73B2F",
    marginBottom: 36,
  },
  articleBody: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    lineHeight: 1.85,
    color: "#333333",
    maxWidth: 640,
    whiteSpace: "pre-wrap",
  },

  // ── CMS (on light bg) ──
  cmsBtn: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "2px",
    padding: "11px 22px",
    cursor: "pointer",
    background: "#E73B2F",
    color: "#FFFFFF",
    border: "none",
    fontWeight: 700,
  },
  cmsForm: {
    background: "#FFFFFF",
    border: "1px solid #CCC5B8",
    padding: 32,
    marginBottom: 30,
  },
  cmsLabel: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#8A8A8A",
    display: "block",
    marginBottom: 6,
    marginTop: 20,
  },
  cmsInput: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    background: "#F5F1E8",
    border: "1px solid #CCC5B8",
    color: "#111111",
    padding: "10px 12px",
    width: "100%",
    boxSizing: "border-box",
  },
  cmsTextarea: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    background: "#F5F1E8",
    border: "1px solid #CCC5B8",
    color: "#111111",
    padding: "10px 12px",
    width: "100%",
    minHeight: 200,
    boxSizing: "border-box",
    lineHeight: 1.7,
    resize: "vertical",
  },
  cmsSelect: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 14,
    background: "#F5F1E8",
    border: "1px solid #CCC5B8",
    color: "#111111",
    padding: "10px 12px",
    width: "100%",
    boxSizing: "border-box",
  },
  cmsActions: {
    display: "flex",
    gap: 12,
    marginTop: 24,
  },
  cmsSaveBtn: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "2px",
    padding: "12px 28px",
    cursor: "pointer",
    background: "#E73B2F",
    color: "#FFFFFF",
    border: "none",
    fontWeight: 700,
  },
  cmsCancelBtn: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "2px",
    padding: "12px 28px",
    cursor: "pointer",
    background: "transparent",
    color: "#8A8A8A",
    border: "1px solid #CCC5B8",
    fontWeight: 500,
  },
  cmsDeleteBtn: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "2px",
    padding: "6px 14px",
    cursor: "pointer",
    background: "transparent",
    color: "#E73B2F",
    border: "1px solid #E73B2F",
    fontWeight: 500,
    marginLeft: "auto",
  },

  // ── Footer ──
  footer: {
    padding: "40px 0",
    textAlign: "center",
  },
  footerText: {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "3px",
    color: "#8A8A8A",
    lineHeight: 2.2,
  },
};

// ── Storage helpers ──
const STORAGE_KEY = "zine-articles";

async function loadArticles() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    return result ? JSON.parse(result.value) : null;
  } catch {
    return null;
  }
}

async function saveArticles(articles) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error("Storage save failed:", e);
  }
}

// ── Components ──

function Header({ onHome }) {
  return (
    <header style={STYLES.header}>
      <div style={STYLES.mastheadWrapper} onClick={onHome}>
        <div style={STYLES.mastheadLine1}>COLOR</div>
        <div style={STYLES.mastheadLine2Outer}>
          <span style={STYLES.mastheadAmpersand}>&amp;</span>
          <span style={STYLES.mastheadNoise}>Noise</span>
        </div>
      </div>
      <div style={STYLES.tagline}>Sight, sound, scene</div>
    </header>
  );
}

const NAV_TABS = [
  { key: "all",       label: "All",     square: null },
  { key: "news",      label: "Around",  square: "#C95C2B" },
  { key: "review",    label: "Heard",   square: "#E73B2F" },
  { key: "spotlight", label: "Seen",    square: "#2D4DFF" },
  { key: "cms",       label: "Editor",  square: null },
];

function NavTab({ tab, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isActive = active;
  const showFull = isActive || hovered;

  return (
    <button
      style={{
        ...STYLES.navItem(isActive),
        color: isActive ? "#111111" : hovered ? "#F5F1E8" : "#8A8A8A",
        display: "flex",
        alignItems: "center",
        gap: tab.square ? 6 : 0,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tab.square && (
        <span style={{
          display: "inline-block",
          width: 8,
          height: 8,
          background: tab.square,
          flexShrink: 0,
          opacity: showFull ? 1 : 0.5,
          transition: "opacity 0.15s",
        }} />
      )}
      {tab.label}
    </button>
  );
}

function Nav({ view, setView, setActiveArticle, cmsMode, setCmsMode }) {
  return (
    <nav style={STYLES.nav}>
      {NAV_TABS.map((t) => (
        <NavTab
          key={t.key}
          tab={t}
          active={view === t.key || (t.key === "cms" && cmsMode)}
          onClick={() => {
            if (t.key === "cms") {
              setCmsMode(true);
              setView("all");
              setActiveArticle(null);
            } else {
              setCmsMode(false);
              setView(t.key);
              setActiveArticle(null);
            }
          }}
        />
      ))}
    </nav>
  );
}

function CategoryLabel({ category, neighborhood }) {
  const color = CATEGORY_COLOR[category] || "#8A8A8A";
  return (
    <div style={{ ...STYLES.cardCategory(category), display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ display: "inline-block", width: 8, height: 8, background: color, flexShrink: 0 }} />
      {CATEGORY_LABELS[category]}
      {neighborhood ? ` — ${neighborhood}` : ""}
    </div>
  );
}

function ArticleCard({ article, onClick }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLOR[article.category] || "#8A8A8A";
  const hasCover = !!article.coverImage;

  return (
    <div
      style={{
        ...STYLES.card,
        paddingLeft: hovered ? 18 : 20,
        borderLeft: hovered ? `6px solid ${catColor}` : "4px solid transparent",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hasCover && (
        <img
          src={article.coverImage}
          alt=""
          style={{
            width: "100%",
            maxHeight: 220,
            objectFit: "cover",
            display: "block",
            marginBottom: 18,
            borderRadius: 3,
          }}
        />
      )}
      <CategoryLabel category={article.category} neighborhood={article.neighborhood} />
      <div style={{ ...STYLES.cardTitle, color: hovered ? catColor : "#111111" }}>
        {article.title}
      </div>
      <div style={STYLES.cardMeta}>
        {article.author} · {article.date}
        {article.venue ? ` · ${article.venue}` : ""}
      </div>
      <div style={STYLES.cardExcerpt}>{article.excerpt}</div>
    </div>
  );
}

function ArticleFull({ article, onBack }) {
  const htmlBody = legacyBodyToHtml(article.body || article.excerpt);
  return (
    <div>
      <button style={STYLES.articleBack} onClick={onBack}>
        ← Back
      </button>
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt=""
          style={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            display: "block",
            borderRadius: 4,
            marginBottom: 28,
          }}
        />
      )}
      <CategoryLabel category={article.category} neighborhood={article.neighborhood} />
      <h1 style={STYLES.articleTitle}>{article.title}</h1>
      <div style={STYLES.articleMeta}>
        {article.author} · {article.date}
        {article.venue ? ` · ${article.venue}` : ""}
      </div>
      <div
        className="cn-article-body"
        style={{ maxWidth: 640 }}
        dangerouslySetInnerHTML={{ __html: htmlBody }}
      />
    </div>
  );
}

// ── Cover image drop zone ──

function CoverImageField({ value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <label style={STYLES.cmsLabel}>Cover Image</label>
      {value ? (
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
          <img
            src={value}
            alt="Cover"
            style={{ width: "100%", maxHeight: 260, objectFit: "cover", display: "block", borderRadius: 3, border: "1px solid #CCC5B8" }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute", top: 10, right: 10,
              fontFamily: "'Archivo Narrow', sans-serif",
              fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px",
              padding: "5px 12px", cursor: "pointer",
              background: "rgba(0,0,0,0.7)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)", fontWeight: 600,
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          style={{
            border: `2px dashed ${dragging ? "#E73B2F" : "#CCC5B8"}`,
            padding: "40px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#fff5f4" : "#F5F1E8",
            transition: "all 0.15s",
          }}
        >
          <div style={{ fontSize: 24, color: "#CCC5B8", marginBottom: 8 }}>⊞</div>
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "2px", color: "#8A8A8A" }}>
            Add cover image
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#CCC5B8", marginTop: 4 }}>
            Drop here or click to browse · JPG, PNG, WebP
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

// ── CMS Panel ──

function CmsPanel({ articles, setArticles }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const startNew = () => {
    setForm({
      title: "",
      category: "review",
      author: "",
      date: new Date().toISOString().slice(0, 10),
      venue: "",
      neighborhood: "",
      excerpt: "",
      body: "",
      coverImage: "",
    });
    setEditing("new");
  };

  const startEdit = (a) => {
    // Migrate legacy plain-text body to HTML on first edit
    const body = legacyBodyToHtml(a.body || "");
    setForm({ ...a, body });
    setEditing(a.id);
  };

  const handleSave = async () => {
    if (!form.title || !form.excerpt) return;
    let updated;
    if (editing === "new") {
      const newArticle = { ...form, id: `article-${Date.now()}` };
      updated = [newArticle, ...articles];
    } else {
      updated = articles.map((a) => (a.id === editing ? { ...form } : a));
    }
    setArticles(updated);
    await saveArticles(updated);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    await saveArticles(updated);
    setEditing(null);
  };

  if (editing !== null) {
    return (
      <div style={{ padding: "28px 0" }}>
        <div style={STYLES.cmsForm}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: "#E73B2F", marginBottom: 20 }}>
            {editing === "new" ? "New Article" : "Edit Article"}
          </div>

          {/* Cover image */}
          <CoverImageField
            value={form.coverImage || ""}
            onChange={(val) => setForm({ ...form, coverImage: val })}
          />

          <label style={STYLES.cmsLabel}>Title</label>
          <input style={STYLES.cmsInput} value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article title" />

          <label style={STYLES.cmsLabel}>Category</label>
          <select style={STYLES.cmsSelect} value={form.category || "review"} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={STYLES.cmsLabel}>Author</label>
              <input style={STYLES.cmsInput} value={form.author || ""} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={STYLES.cmsLabel}>Date</label>
              <input style={STYLES.cmsInput} type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={STYLES.cmsLabel}>Venue (optional)</label>
              <input style={STYLES.cmsInput} value={form.venue || ""} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={STYLES.cmsLabel}>Neighborhood</label>
              <input style={STYLES.cmsInput} value={form.neighborhood || ""} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} />
            </div>
          </div>

          <label style={STYLES.cmsLabel}>Excerpt / Lede</label>
          <textarea
            style={{ ...STYLES.cmsTextarea, minHeight: 80 }}
            value={form.excerpt || ""}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8A8A8A", marginTop: 4 }}>
            Short preview text shown on the homepage
          </div>

          <label style={{ ...STYLES.cmsLabel, marginTop: 28 }}>Body</label>
          <RichTextEditor
            value={form.body || ""}
            onChange={(html) => setForm((f) => ({ ...f, body: html }))}
          />

          <div style={STYLES.cmsActions}>
            <button style={STYLES.cmsSaveBtn} onClick={handleSave}>Publish</button>
            <button style={STYLES.cmsCancelBtn} onClick={() => setEditing(null)}>Cancel</button>
            {editing !== "new" && (
              <button style={STYLES.cmsDeleteBtn} onClick={() => handleDelete(editing)}>Delete</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 26, color: "#111111" }}>
          Content Manager
        </div>
        <button style={STYLES.cmsBtn} onClick={startNew}>+ New Article</button>
      </div>

      {articles.map((a) => (
        <div
          key={a.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: "1px solid #CCC5B8",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ ...STYLES.cardCategory(a.category), marginBottom: 0, display: "inline", marginRight: 12, fontSize: 11 }}>
              {CATEGORY_LABELS[a.category]}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#333333" }}>
              {a.title}
            </span>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: "#8A8A8A", marginLeft: 12, textTransform: "uppercase", letterSpacing: "1px" }}>
              {a.date}
            </span>
          </div>
          <button
            style={{ ...STYLES.cmsCancelBtn, padding: "4px 14px", fontSize: 11, letterSpacing: "1.5px", flexShrink: 0, marginLeft: 12 }}
            onClick={() => startEdit(a)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Main App ──

export default function ConcreteFrequency() {
  const [articles, setArticles] = useState(SAMPLE_ARTICLES);
  const [view, setView] = useState("all");
  const [activeArticle, setActiveArticle] = useState(null);
  const [cmsMode, setCmsMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await loadArticles();
      if (stored && stored.length > 0) {
        setArticles(stored);
      } else {
        await saveArticles(SAMPLE_ARTICLES);
      }
      setLoaded(true);
    })();
  }, []);

  const filtered = view === "all" ? articles : articles.filter((a) => a.category === view);

  const handleHome = () => {
    setView("all");
    setActiveArticle(null);
    setCmsMode(false);
  };

  if (!loaded) {
    return (
      <div style={{ ...STYLES.app, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 32, color: "#E73B2F" }}>
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div style={STYLES.app}>
      {/* Dark header zone */}
      <div style={STYLES.darkZone}>
        <div style={STYLES.noiseOverlay} />
        <div style={STYLES.content}>
          <Header onHome={handleHome} />
          <Nav view={view} setView={setView} setActiveArticle={setActiveArticle} cmsMode={cmsMode} setCmsMode={setCmsMode} />
        </div>
      </div>

      {/* Light reading zone */}
      <div style={STYLES.lightZone}>
        <div style={STYLES.contentLight}>
          {cmsMode ? (
            <CmsPanel articles={articles} setArticles={setArticles} />
          ) : activeArticle ? (
            <ArticleFull article={activeArticle} onBack={() => setActiveArticle(null)} />
          ) : (
            <>
              {filtered.length === 0 && (
                <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 14, color: "#8A8A8A", textAlign: "center", padding: "80px 0", textTransform: "uppercase", letterSpacing: "2px" }}>
                  Nothing here yet. Open the Editor to start writing.
                </div>
              )}
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} onClick={() => setActiveArticle(a)} />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Dark footer zone */}
      <div style={STYLES.darkZone}>
        <div style={STYLES.noiseOverlay} />
        <div style={STYLES.content}>
          <footer style={STYLES.footer}>
            <div style={STYLES.footerText}>
              Color&amp;Noise · Chicago<br />
              Sight, sound, scene
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
