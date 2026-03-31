import { useState, useEffect, useCallback } from "react";

const CATEGORIES = ["review", "news", "spotlight"];
const CATEGORY_LABELS = { review: "Reviews", news: "News", spotlight: "Spotlights" };
const CATEGORY_EMOJI = { review: "★", news: "⚡", spotlight: "◉" };

const SAMPLE_ARTICLES = [
  {
    id: "sample-1",
    title: "OSEES TURNED THE EMPTY BOTTLE INSIDE OUT",
    category: "review",
    author: "M. Kvlashvili",
    date: "2026-03-18",
    venue: "Empty Bottle",
    neighborhood: "Ukrainian Village",
    image: "",
    excerpt: "Thee Oh Sees — or whatever John Dwyer is calling them this week — brought a double-drummer assault that literally shook plaster off the ceiling. The pit opened up before the first chord even finished ringing.",
    body: "Thee Oh Sees — or whatever John Dwyer is calling them this week — brought a double-drummer assault that literally shook plaster off the ceiling. The pit opened up before the first chord even finished ringing.\n\nThe setlist leaned heavy on Protean Threat and Face Stabber material, which meant long, krautrock-influenced jams that turned the crowd into one heaving organism. Dwyer's guitar tone was absolutely disgusting in the best way — fuzzed out beyond recognition, feeding back into the monitors until the sound guy just gave up and let it ride.\n\nOpener Friko proved they belong on every bill in this city. Their angular post-punk has gotten tighter since the last time I caught them at Schubas, and the new material hints at something bigger coming.\n\nVerdict: If you missed this one, I genuinely feel sorry for you."
  },
  {
    id: "sample-2",
    title: "CHICAGO'S DIY PRINT SCENE IS HAVING A MOMENT",
    category: "news",
    author: "R. Santos",
    date: "2026-03-15",
    venue: "",
    neighborhood: "Pilsen",
    image: "",
    excerpt: "Between Sector 2337's latest residency program and the explosion of risograph zines coming out of Pilsen, Chicago's independent print community is thriving in ways that feel genuinely unprecedented.",
    body: "Between Sector 2337's latest residency program and the explosion of risograph zines coming out of Pilsen, Chicago's independent print community is thriving in ways that feel genuinely unprecedented.\n\nThe catalyst seems to be a combination of cheap rent (by coastal standards), a deep tradition of community organizing through print, and a new generation of artists who see physical media as radical in itself.\n\nSpaces like Spudnik Press, Hoofprint Workshop, and the newly opened Tinta Collective are running at full capacity. Wait lists for press time are months long. And the work being produced — from hand-bound artist books to large-format screen prints — is finding audiences both locally and internationally.\n\nThis isn't a trend. It's an ecosystem."
  },
  {
    id: "sample-3",
    title: "VENUE SPOTLIGHT: THE HIDEOUT",
    category: "spotlight",
    author: "M. Kvlashvili",
    date: "2026-03-10",
    venue: "The Hideout",
    neighborhood: "Bucktown",
    image: "",
    excerpt: "Tucked behind an industrial stretch off Wabansia, The Hideout has been Chicago's best-kept open secret for three decades. We talked to the people who keep it alive.",
    body: "Tucked behind an industrial stretch off Wabansia, The Hideout has been Chicago's best-kept open secret for three decades. We talked to the people who keep it alive.\n\nThe Hideout doesn't try to be cool. It just is. The wood-paneled walls are covered in decades of stickers and handbills. The sound system is modest but perfectly tuned to the room. The booking philosophy is simple: if it's interesting, it belongs here.\n\nFrom alt-country to experimental noise, from literary readings to burlesque, The Hideout programs like no other venue in the city. On any given week you might see a touring indie band, a local hip-hop showcase, and a comedy night all sharing the same tiny stage.\n\nCo-owner Tim Tuten puts it simply: 'We book what we'd want to see. That's it. That's the whole philosophy.'\n\nIn a city where beloved venues close every year, The Hideout endures. Long may it run."
  },
  {
    id: "sample-4",
    title: "NONAME'S SURPRISE SET AT RADIUS WAS A MASTERCLASS",
    category: "review",
    author: "D. Washington",
    date: "2026-03-08",
    venue: "Radius Chicago",
    neighborhood: "Pilsen",
    excerpt: "Nobody knew she was coming. That's what made it perfect. Noname walked out to a crowd that had gathered for an entirely different artist and proceeded to deliver forty minutes of the sharpest lyricism Chicago has heard all year.",
    body: "Nobody knew she was coming. That's what made it perfect. Noname walked out to a crowd that had gathered for an entirely different artist and proceeded to deliver forty minutes of the sharpest lyricism Chicago has heard all year.\n\nThe set drew heavily from Sundial and Room 25, weaving between introspective poetry and biting social commentary without ever losing the groove. Her band was locked in — the jazz-inflected arrangements gave every track room to breathe and mutate.\n\nThe crowd went from confused to captivated to completely losing it over the course of those forty minutes. By the end, phones were down. People were just present.\n\nThat's the Noname effect. She makes you pay attention."
  }
];

// ── Noise texture as inline SVG data URI ──
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const STYLES = {
  // ── Base ──
  app: {
    fontFamily: "'Courier New', 'Courier', monospace",
    background: "#0a0a0a",
    color: "#e8e4dc",
    minHeight: "100vh",
    position: "relative",
  },
  noiseOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: NOISE_SVG,
    backgroundRepeat: "repeat",
    backgroundSize: "256px 256px",
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.5,
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 20px",
  },

  // ── Header ──
  header: {
    borderBottom: "4px solid #e8e4dc",
    padding: "30px 0 20px",
    marginBottom: 0,
  },
  masthead: {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: "clamp(48px, 10vw, 84px)",
    fontWeight: 900,
    letterSpacing: "-3px",
    lineHeight: 0.85,
    textTransform: "uppercase",
    color: "#e8e4dc",
    margin: 0,
    cursor: "pointer",
  },
  mastheadAccent: {
    color: "#ff3b3b",
    fontStyle: "italic",
  },
  tagline: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 4,
    color: "#888",
    marginTop: 8,
  },

  // ── Nav ──
  nav: {
    display: "flex",
    gap: 0,
    borderBottom: "2px solid #333",
    marginBottom: 30,
  },
  navItem: (active) => ({
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 3,
    padding: "12px 18px",
    cursor: "pointer",
    background: active ? "#e8e4dc" : "transparent",
    color: active ? "#0a0a0a" : "#888",
    border: "none",
    borderRight: "1px solid #333",
    fontWeight: active ? 900 : 400,
    transition: "all 0.15s",
  }),

  // ── Article Card ──
  card: {
    borderBottom: "1px solid #333",
    padding: "28px 0",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  cardCategory: (cat) => ({
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 4,
    color: cat === "review" ? "#ff3b3b" : cat === "news" ? "#00ff88" : "#ffcc00",
    marginBottom: 8,
    fontWeight: 700,
  }),
  cardTitle: {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: "clamp(22px, 4vw, 32px)",
    fontWeight: 900,
    lineHeight: 1.05,
    textTransform: "uppercase",
    letterSpacing: "-0.5px",
    color: "#e8e4dc",
    marginBottom: 10,
  },
  cardMeta: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  cardExcerpt: {
    fontFamily: "'Georgia', serif",
    fontSize: 15,
    lineHeight: 1.65,
    color: "#aaa",
    maxWidth: 640,
  },

  // ── Article Full ──
  articleBack: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#ff3b3b",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    padding: "20px 0",
    fontWeight: 700,
  },
  articleTitle: {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: "clamp(32px, 6vw, 56px)",
    fontWeight: 900,
    lineHeight: 1.0,
    textTransform: "uppercase",
    letterSpacing: "-1px",
    color: "#e8e4dc",
    marginBottom: 16,
  },
  articleMeta: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 2,
    paddingBottom: 24,
    borderBottom: "2px solid #ff3b3b",
    marginBottom: 32,
  },
  articleBody: {
    fontFamily: "'Georgia', serif",
    fontSize: 17,
    lineHeight: 1.8,
    color: "#ccc",
    maxWidth: 640,
    whiteSpace: "pre-wrap",
  },

  // ── CMS ──
  cmsBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 3,
    padding: "10px 20px",
    cursor: "pointer",
    background: "#ff3b3b",
    color: "#0a0a0a",
    border: "none",
    fontWeight: 900,
  },
  cmsForm: {
    background: "#111",
    border: "2px solid #333",
    padding: 28,
    marginBottom: 30,
  },
  cmsLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#888",
    display: "block",
    marginBottom: 6,
    marginTop: 18,
  },
  cmsInput: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    background: "#0a0a0a",
    border: "1px solid #444",
    color: "#e8e4dc",
    padding: "10px 12px",
    width: "100%",
    boxSizing: "border-box",
  },
  cmsTextarea: {
    fontFamily: "'Georgia', serif",
    fontSize: 15,
    background: "#0a0a0a",
    border: "1px solid #444",
    color: "#e8e4dc",
    padding: "10px 12px",
    width: "100%",
    minHeight: 200,
    boxSizing: "border-box",
    lineHeight: 1.7,
    resize: "vertical",
  },
  cmsSelect: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    background: "#0a0a0a",
    border: "1px solid #444",
    color: "#e8e4dc",
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
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 3,
    padding: "12px 28px",
    cursor: "pointer",
    background: "#ff3b3b",
    color: "#0a0a0a",
    border: "none",
    fontWeight: 900,
  },
  cmsCancelBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 3,
    padding: "12px 28px",
    cursor: "pointer",
    background: "transparent",
    color: "#888",
    border: "1px solid #444",
    fontWeight: 400,
  },
  cmsDeleteBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
    padding: "6px 14px",
    cursor: "pointer",
    background: "transparent",
    color: "#ff3b3b",
    border: "1px solid #ff3b3b",
    fontWeight: 400,
    marginLeft: "auto",
  },

  // ── Footer ──
  footer: {
    borderTop: "2px solid #333",
    padding: "30px 0",
    marginTop: 60,
    textAlign: "center",
  },
  footerText: {
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 4,
    color: "#444",
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
      <h1 style={STYLES.masthead} onClick={onHome}>
        CONCRETE<br />
        <span style={STYLES.mastheadAccent}>FREQUENCY</span>
      </h1>
      <div style={STYLES.tagline}>Chicago sound · art · print — est. 2026</div>
    </header>
  );
}

function Nav({ view, setView, setActiveArticle, cmsMode, setCmsMode }) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "review", label: `${CATEGORY_EMOJI.review} Reviews` },
    { key: "news", label: `${CATEGORY_EMOJI.news} News` },
    { key: "spotlight", label: `${CATEGORY_EMOJI.spotlight} Spotlights` },
    { key: "cms", label: "✎ CMS" },
  ];
  return (
    <nav style={STYLES.nav}>
      {tabs.map((t) => (
        <button
          key={t.key}
          style={STYLES.navItem(view === t.key || (t.key === "cms" && cmsMode))}
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
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}

function ArticleCard({ article, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...STYLES.card,
        paddingLeft: hovered ? 16 : 0,
        borderLeft: hovered ? "4px solid #ff3b3b" : "4px solid transparent",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={STYLES.cardCategory(article.category)}>
        {CATEGORY_EMOJI[article.category]} {CATEGORY_LABELS[article.category]}
        {article.neighborhood ? ` — ${article.neighborhood}` : ""}
      </div>
      <div style={STYLES.cardTitle}>{article.title}</div>
      <div style={STYLES.cardMeta}>
        {article.author} · {article.date}
        {article.venue ? ` · ${article.venue}` : ""}
      </div>
      <div style={STYLES.cardExcerpt}>{article.excerpt}</div>
    </div>
  );
}

function ArticleFull({ article, onBack }) {
  return (
    <div>
      <button style={STYLES.articleBack} onClick={onBack}>
        ← Back
      </button>
      <div style={STYLES.cardCategory(article.category)}>
        {CATEGORY_EMOJI[article.category]} {CATEGORY_LABELS[article.category]}
        {article.neighborhood ? ` — ${article.neighborhood}` : ""}
      </div>
      <h1 style={STYLES.articleTitle}>{article.title}</h1>
      <div style={STYLES.articleMeta}>
        {article.author} · {article.date}
        {article.venue ? ` · ${article.venue}` : ""}
      </div>
      <div style={STYLES.articleBody}>{article.body || article.excerpt}</div>
    </div>
  );
}

function CmsPanel({ articles, setArticles, setActiveArticle, setCmsMode }) {
  const [editing, setEditing] = useState(null); // null = list, "new" or article id
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
    });
    setEditing("new");
  };

  const startEdit = (a) => {
    setForm({ ...a });
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
      <div style={STYLES.cmsForm}>
        <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 22, textTransform: "uppercase", color: "#ff3b3b", marginBottom: 8 }}>
          {editing === "new" ? "New Article" : "Edit Article"}
        </div>

        <label style={STYLES.cmsLabel}>Title</label>
        <input style={STYLES.cmsInput} value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ALL CAPS ENCOURAGED" />

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
        <textarea style={{ ...STYLES.cmsTextarea, minHeight: 80 }} value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />

        <label style={STYLES.cmsLabel}>Full Body</label>
        <textarea style={STYLES.cmsTextarea} value={form.body || ""} onChange={(e) => setForm({ ...form, body: e.target.value })} />

        <div style={STYLES.cmsActions}>
          <button style={STYLES.cmsSaveBtn} onClick={handleSave}>Publish</button>
          <button style={STYLES.cmsCancelBtn} onClick={() => setEditing(null)}>Cancel</button>
          {editing !== "new" && (
            <button style={STYLES.cmsDeleteBtn} onClick={() => handleDelete(editing)}>Delete</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 28, textTransform: "uppercase", color: "#ff3b3b" }}>
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
            borderBottom: "1px solid #222",
          }}
        >
          <div style={{ flex: 1 }}>
            <span style={{ ...STYLES.cardCategory(a.category), marginBottom: 0, display: "inline", marginRight: 12, fontSize: 9 }}>
              {CATEGORY_LABELS[a.category]}
            </span>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: "#ccc" }}>
              {a.title}
            </span>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#555", marginLeft: 12 }}>
              {a.date}
            </span>
          </div>
          <button
            style={{ ...STYLES.cmsCancelBtn, padding: "4px 14px", fontSize: 10, letterSpacing: 2 }}
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
        <div style={{ fontFamily: "'Impact', sans-serif", fontSize: 32, color: "#ff3b3b", textTransform: "uppercase", animation: "pulse 1.5s infinite" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={STYLES.app}>
      <div style={STYLES.noiseOverlay} />
      <div style={STYLES.content}>
        <Header onHome={handleHome} />
        <Nav view={view} setView={setView} setActiveArticle={setActiveArticle} cmsMode={cmsMode} setCmsMode={setCmsMode} />

        {cmsMode ? (
          <CmsPanel articles={articles} setArticles={setArticles} setActiveArticle={setActiveArticle} setCmsMode={setCmsMode} />
        ) : activeArticle ? (
          <ArticleFull article={activeArticle} onBack={() => setActiveArticle(null)} />
        ) : (
          <>
            {filtered.length === 0 && (
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14, color: "#555", textAlign: "center", padding: 60 }}>
                Nothing here yet. Hit the CMS to start writing.
              </div>
            )}
            {filtered.map((a) => (
              <ArticleCard key={a.id} article={a} onClick={() => setActiveArticle(a)} />
            ))}
          </>
        )}

        <footer style={STYLES.footer}>
          <div style={STYLES.footerText}>
            Concrete Frequency · Chicago IL · No algorithms, no feeds, just noise.
          </div>
        </footer>
      </div>
    </div>
  );
}
