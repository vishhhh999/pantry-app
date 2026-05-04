import { useState, useEffect, useRef } from "react";

// ── Category SVG Icons ──────────────────────────────────────────────
const CategoryIcons = {
  protein: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3c0 0 1 2 1 5s-2 4-2 7c0 2 1 4 4 4" />
      <path d="M10 3c0 0 1 2 1 5s-2 4-2 7c0 2 1 4 4 4" />
      <path d="M14 3c0 0 1 2 1 5s-2 4-2 7c0 2 1 4 4 4" />
    </svg>
  ),
  vegetable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a9 9 0 0 1 9 9c0 4-2.5 7-6 8.5" />
      <path d="M12 2a9 9 0 0 0-9 9c0 4 2.5 7 6 8.5" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  grain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="3" ry="6" />
      <path d="M12 6c-3-3-6-2-6 0s3 3 6 0" />
      <path d="M12 18c-3 3-6 2-6 0s3-3 6 0" />
      <path d="M12 6c3-3 6-2 6 0s-3 3-6 0" />
      <path d="M12 18c3 3 6 2 6 0s-3-3-6 0" />
    </svg>
  ),
  dairy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2h8l2 6H6L8 2z" />
      <rect x="5" y="8" width="14" height="13" rx="2" />
      <path d="M9 14c0-1.7 1.3-3 3-3s3 1.3 3 3" />
    </svg>
  ),
  spice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
  liquid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L6 12a6 6 0 1 0 12 0L12 2z" />
    </svg>
  ),
  fruit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7c0-3 3-5 3-5s-1 3 0 5" />
    </svg>
  ),
  fat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13" rx="7" ry="5" />
      <path d="M9 8c0-2 1.5-4 3-4s3 2 3 4" />
    </svg>
  ),
  condiment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="8" height="14" rx="2" />
      <path d="M10 6V4h4v2" />
      <line x1="10" y1="11" x2="14" y2="11" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  legume: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <ellipse cx="9" cy="14" rx="2.5" ry="3" />
      <ellipse cx="15" cy="14" rx="2.5" ry="3" />
      <path d="M4 12h16" />
    </svg>
  ),
  seafood: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
      <path d="M18 12l4-4v8l-4-4z" />
      <circle cx="9" cy="12" r="2" />
    </svg>
  ),
  egg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C8 3 5 7.5 5 12.5a7 7 0 0 0 14 0C19 7.5 16 3 12 3z" />
    </svg>
  ),
  noodle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8c2-2 4 2 6 0s4-2 6 0 2 2 2 2" />
      <path d="M4 12c2-2 4 2 6 0s4-2 6 0 2 2 2 2" />
      <path d="M4 16c2-2 4 2 6 0s4-2 6 0 2 2 2 2" />
    </svg>
  ),
  mushroom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8H4z" />
      <path d="M9 12v6a3 3 0 0 0 6 0v-6" />
    </svg>
  ),
  other: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

// ── Ingredient → Category Mapping ───────────────────────────────────
const ingredientCategory = (name) => {
  const n = name.toLowerCase();
  if (/chicken|beef|lamb|pork|turkey|mutton|bacon|sausage|ham|mince|keema/.test(n)) return "protein";
  if (/fish|salmon|tuna|shrimp|prawn|crab|lobster|squid|anchovy/.test(n)) return "seafood";
  if (/egg/.test(n)) return "egg";
  if (/milk|cream|cheese|butter|yogurt|curd|paneer|ghee/.test(n)) return "dairy";
  if (/rice|flour|bread|wheat|oat|barley|rye|semolina|cornmeal|quinoa/.test(n)) return "grain";
  if (/pasta|noodle|spaghetti|macaroni|ramen|udon/.test(n)) return "noodle";
  if (/lentil|dal|chickpea|bean|pea|soy/.test(n)) return "legume";
  if (/mushroom/.test(n)) return "mushroom";
  if (/apple|banana|mango|lemon|lime|orange|berry|grape|pear|peach|tomato/.test(n)) return "fruit";
  if (/onion|garlic|ginger|carrot|spinach|cabbage|pepper|potato|broccoli|cauliflower|celery|zucchini|cucumber|eggplant|kale|lettuce|corn|pumpkin|yam|beet/.test(n)) return "vegetable";
  if (/oil|olive|coconut oil|vegetable oil|lard|shortening/.test(n)) return "fat";
  if (/salt|pepper|cumin|turmeric|chili|paprika|cinnamon|cardamom|clove|bay|oregano|thyme|basil|rosemary|coriander|mustard seed|fennel|star anise|nutmeg|saffron/.test(n)) return "spice";
  if (/water|stock|broth|wine|vinegar|juice|coconut milk|soy sauce|beer/.test(n)) return "liquid";
  if (/sauce|ketchup|mayo|mustard|hot sauce|sriracha|oyster sauce|fish sauce|worcestershire/.test(n)) return "condiment";
  if (/sugar|honey|syrup|jam|chocolate|vanilla/.test(n)) return "other";
  return "other";
};

// ── Suggested Staples ────────────────────────────────────────────────
const STAPLES = [
  "Salt", "Black Pepper", "Olive Oil", "Garlic", "Onion",
  "Butter", "Eggs", "Rice", "All-Purpose Flour", "Soy Sauce",
  "Cumin", "Turmeric", "Chili Powder", "Ginger", "Tomato",
  "Lemon", "Sugar", "Vegetable Oil", "Coriander", "Mustard",
];

const CUISINES = ["Any", "Indian", "Italian", "Chinese", "Mexican", "Thai", "Japanese", "Mediterranean", "American", "French"];
const COMPLEXITIES = ["Any", "Quick (< 30 min)", "Moderate (30–60 min)", "Elaborate (60+ min)"];

// ── Main App ─────────────────────────────────────────────────────────
export default function RecipeApp() {
  const [screen, setScreen] = useState("home"); // home | result | saved
  const [ingredients, setIngredients] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [cuisine, setCuisine] = useState("Any");
  const [complexity, setComplexity] = useState("Any");
  const [portions, setPortions] = useState(2);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [savedMsg, setSavedMsg] = useState(false);
  const [activeTab, setActiveTab] = useState("add"); // add | staples
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("savedRecipes");
      if (s) setSavedRecipes(JSON.parse(s));
    } catch {}
  }, []);

  const saveToStorage = (list) => {
    try { localStorage.setItem("savedRecipes", JSON.stringify(list)); } catch {}
  };

  const addIngredient = (name) => {
    const trimmed = name.trim();
    if (!trimmed || ingredients.find(i => i.toLowerCase() === trimmed.toLowerCase())) return;
    setIngredients(prev => [...prev, trimmed]);
    setInputVal("");
  };

  const removeIngredient = (name) => {
    setIngredients(prev => prev.filter(i => i !== name));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setScreen("result");
    setRecipe(null);

    const prompt = `You are a world-class chef and recipe developer. 
    
The user has these ingredients: ${ingredients.join(", ")}.
Cuisine preference: ${cuisine === "Any" ? "no preference, use best judgment" : cuisine}.
Complexity: ${complexity === "Any" ? "any complexity" : complexity}.
Portions: ${portions} servings.

Create ONE complete recipe. Prioritize well-known dishes first. If no classic recipe fits well, invent a new creative one.

Respond ONLY with a valid JSON object (no markdown, no backticks), exactly this structure:
{
  "name": "Recipe Name",
  "tagline": "one short evocative line",
  "isOriginal": false,
  "prepTime": "15 min",
  "cookTime": "30 min",
  "difficulty": "Easy",
  "cuisine": "Italian",
  "ingredients": [
    { "item": "chicken breast", "amount": "400g" }
  ],
  "steps": [
    "Step description here."
  ],
  "tips": "One useful chef tip."
}`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setRecipe(parsed);
    } catch (err) {
  console.error("API error:", err);
  setRecipe({ error: true });
}
    setLoading(false);
  };

  const saveRecipe = () => {
    if (!recipe || recipe.error) return;
    const entry = { ...recipe, savedAt: Date.now(), ingredients: [...ingredients], portions };
    const updated = [entry, ...savedRecipes];
    setSavedRecipes(updated);
    saveToStorage(updated);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const deleteSaved = (idx) => {
    const updated = savedRecipes.filter((_, i) => i !== idx);
    setSavedRecipes(updated);
    saveToStorage(updated);
  };

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#f0ede8",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .slide-up { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .pop { animation: pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes pop { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }

        .btn {
          cursor: pointer; border: none; outline: none;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .btn:active { transform: scale(0.94); }

        .ingredient-chip {
          display: flex; align-items: center; gap: 8px;
          background: #161616; border: 1px solid #222;
          border-radius: 100px; padding: 6px 14px 6px 10px;
          font-size: 13px; font-weight: 400; color: #d4cfc9;
          animation: pop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards;
          transition: border-color 0.2s;
        }
        .ingredient-chip:hover { border-color: #444; }

        .icon-wrap {
          width: 22px; height: 22px; color: #888;
          flex-shrink: 0;
        }

        .input-field {
          background: #111; border: 1px solid #222; border-radius: 12px;
          color: #f0ede8; font-family: inherit; font-size: 14px;
          padding: 12px 16px; width: 100%; outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #c8b99a; }
        .input-field::placeholder { color: #444; }

        .staple-btn {
          background: #111; border: 1px solid #1e1e1e;
          border-radius: 8px; padding: 8px 12px;
          font-size: 12px; color: #888; cursor: pointer;
          transition: all 0.15s; font-family: inherit;
          white-space: nowrap;
        }
        .staple-btn:hover { background: #1a1a1a; border-color: #333; color: #ccc; }
        .staple-btn.added { border-color: #c8b99a44; color: #c8b99a; background: #1a1710; }

        .generate-btn {
          width: 100%; padding: 16px; border-radius: 14px;
          background: #f0ede8; color: #0a0a0a;
          font-family: inherit; font-size: 15px; font-weight: 600;
          cursor: pointer; border: none; outline: none;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          letter-spacing: -0.01em;
        }
        .generate-btn:hover { transform: translateY(-2px); background: #fff; box-shadow: 0 8px 30px rgba(200,185,154,0.15); }
        .generate-btn:active { transform: scale(0.97); }
        .generate-btn:disabled { background: #222; color: #444; transform: none; box-shadow: none; cursor: not-allowed; }

        .tab-btn {
          flex: 1; padding: 8px; border-radius: 8px; border: none;
          font-family: inherit; font-size: 13px; cursor: pointer;
          transition: all 0.2s; font-weight: 500;
        }
        .tab-btn.active { background: #1e1e1e; color: #f0ede8; }
        .tab-btn.inactive { background: transparent; color: #555; }

        .filter-chip {
          padding: 7px 14px; border-radius: 100px; border: 1px solid #222;
          font-size: 12px; cursor: pointer; font-family: inherit;
          transition: all 0.2s; white-space: nowrap; font-weight: 400;
        }
        .filter-chip.active { background: #c8b99a; color: #0a0a0a; border-color: #c8b99a; font-weight: 500; }
        .filter-chip.inactive { background: transparent; color: #666; }
        .filter-chip.inactive:hover { border-color: #444; color: #aaa; }

        .nav-btn {
          padding: 8px 16px; border-radius: 100px; border: none;
          font-family: inherit; font-size: 13px; cursor: pointer;
          font-weight: 500; transition: all 0.2s;
        }
        .nav-btn.active { background: #1e1e1e; color: #f0ede8; }
        .nav-btn.inactive { background: transparent; color: #555; }

        .save-btn {
          padding: 10px 20px; border-radius: 10px; border: 1px solid #c8b99a44;
          background: #1a1710; color: #c8b99a; font-family: inherit;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all 0.2s;
        }
        .save-btn:hover { background: #221f14; border-color: #c8b99a88; }

        .shimmer {
          background: linear-gradient(90deg, #161616 25%, #1e1e1e 50%, #161616 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        .step-num {
          width: 26px; height: 26px; border-radius: 50%;
          background: #1a1a1a; border: 1px solid #2a2a2a;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: #c8b99a; flex-shrink: 0; font-weight: 600;
        }

        .back-btn {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; color: #555; font-family: inherit;
          font-size: 13px; cursor: pointer; padding: 0;
          transition: color 0.2s;
        }
        .back-btn:hover { color: #aaa; }

        .saved-card {
          background: #111; border: 1px solid #1e1e1e; border-radius: 14px;
          padding: 16px; cursor: pointer; transition: all 0.2s;
          animation: fadeIn 0.3s ease forwards;
        }
        .saved-card:hover { border-color: #2e2e2e; background: #141414; }

        .delete-btn {
          width: 28px; height: 28px; border-radius: 50%; border: 1px solid #2a2a2a;
          background: #161616; color: #555; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .delete-btn:hover { border-color: #c0392b44; color: #c0392b; background: #1a1111; }

        .toast {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: #c8b99a; color: #0a0a0a; padding: 10px 20px;
          border-radius: 100px; font-size: 13px; font-weight: 600;
          animation: toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
          z-index: 100; white-space: nowrap;
        }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

        .modal-overlay {
          position: fixed; inset: 0; background: #0a0a0acc;
          backdrop-filter: blur(8px); z-index: 50;
          display: flex; align-items: flex-end; justify-content: center;
          animation: fadeIn 0.2s ease forwards;
        }
        .modal-sheet {
          background: #111; border: 1px solid #1e1e1e;
          border-radius: 20px 20px 0 0; width: 100%; max-width: 640px;
          max-height: 85vh; overflow-y: auto; padding: 24px;
          animation: slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .portions-btn {
          width: 32px; height: 32px; border-radius: 50%; border: 1px solid #2a2a2a;
          background: #161616; color: #aaa; font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .portions-btn:hover { border-color: #444; color: #f0ede8; }

        .badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 500;
        }
        .badge-original { background: #1a1710; border: 1px solid #c8b99a33; color: #c8b99a; }
        .badge-classic { background: #101a10; border: 1px solid #4a9a4a33; color: #6aaa6a; }
      `}</style>

      {/* ── Header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "#0a0a0acc", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #161616",
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8b99a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 500, letterSpacing: "-0.01em" }}>
            pantry
          </span>
        </div>
        <div style={{ display: "flex", gap: "4px", background: "#111", padding: "4px", borderRadius: "100px", border: "1px solid #1e1e1e" }}>
          <button className={`nav-btn ${screen === "home" || screen === "result" ? "active" : "inactive"}`} onClick={() => setScreen("home")}>Cook</button>
          <button className={`nav-btn ${screen === "saved" ? "active" : "inactive"}`} onClick={() => setScreen("saved")}>
            Saved {savedRecipes.length > 0 && <span style={{ color: "#c8b99a", marginLeft: "2px" }}>{savedRecipes.length}</span>}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "0 16px 100px" }}>

        {/* ═══ HOME SCREEN ═══ */}
        {screen === "home" && (
          <div className="fade-in">
            <div style={{ padding: "32px 0 20px" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                What's in your<br /><span style={{ fontStyle: "italic", color: "#c8b99a" }}>kitchen?</span>
              </p>
              <p style={{ fontSize: "13px", color: "#555", marginTop: "8px" }}>Add ingredients, get a recipe built for you.</p>
            </div>

            {/* ── Ingredient Input ── */}
            <div style={{ background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "16px", marginBottom: "16px" }}>
              {/* Tabs */}
              <div style={{ display: "flex", gap: "4px", background: "#0a0a0a", padding: "4px", borderRadius: "10px", marginBottom: "14px" }}>
                <button className={`tab-btn ${activeTab === "add" ? "active" : "inactive"}`} onClick={() => setActiveTab("add")}>Add Ingredient</button>
                <button className={`tab-btn ${activeTab === "staples" ? "active" : "inactive"}`} onClick={() => setActiveTab("staples")}>Staples</button>
              </div>

              {activeTab === "add" ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    ref={inputRef}
                    className="input-field"
                    placeholder="e.g. chicken breast, ginger..."
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addIngredient(inputVal)}
                  />
                  <button
                    className="btn"
                    onClick={() => addIngredient(inputVal)}
                    style={{
                      background: "#c8b99a", color: "#0a0a0a", border: "none",
                      width: "44px", height: "44px", borderRadius: "10px",
                      fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >+</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {STAPLES.map(s => {
                    const added = ingredients.find(i => i.toLowerCase() === s.toLowerCase());
                    return (
                      <button
                        key={s}
                        className={`staple-btn ${added ? "added" : ""}`}
                        onClick={() => added ? removeIngredient(s) : addIngredient(s)}
                      >
                        {added ? "✓ " : ""}{s}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Chips */}
              {ingredients.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #1a1a1a" }}>
                  {ingredients.map(ing => (
                    <div key={ing} className="ingredient-chip">
                      <span className="icon-wrap">{CategoryIcons[ingredientCategory(ing)]}</span>
                      {ing}
                      <button
                        className="btn"
                        onClick={() => removeIngredient(ing)}
                        style={{ background: "none", border: "none", color: "#444", fontSize: "14px", padding: "0", cursor: "pointer", lineHeight: 1 }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Filters ── */}
            <div style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Cuisine</p>
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {CUISINES.map(c => (
                  <button key={c} className={`filter-chip ${cuisine === c ? "active" : "inactive"}`} onClick={() => setCuisine(c)}>{c}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Complexity</p>
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {COMPLEXITIES.map(c => (
                  <button key={c} className={`filter-chip ${complexity === c ? "active" : "inactive"}`} onClick={() => setComplexity(c)}>{c}</button>
                ))}
              </div>
            </div>

            {/* ── Portions ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0e0e0e", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "14px 16px", marginBottom: "20px" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>Portions</p>
                <p style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>Quantities scale automatically</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <button className="portions-btn" onClick={() => setPortions(p => Math.max(1, p - 1))}>−</button>
                <span style={{ fontSize: "20px", fontWeight: 500, minWidth: "24px", textAlign: "center", fontFamily: "'Playfair Display', serif" }}>{portions}</span>
                <button className="portions-btn" onClick={() => setPortions(p => Math.min(20, p + 1))}>+</button>
              </div>
            </div>

            <button
              className="generate-btn"
              disabled={ingredients.length === 0}
              onClick={generateRecipe}
            >
              {ingredients.length === 0 ? "Add ingredients to begin" : `Generate Recipe →`}
            </button>
          </div>
        )}

        {/* ═══ RESULT SCREEN ═══ */}
        {screen === "result" && (
          <div className="fade-in">
            <div style={{ paddingTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="back-btn" onClick={() => setScreen("home")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
              {recipe && !recipe.error && (
                <button className="save-btn" onClick={saveRecipe}>
                  {savedMsg ? "Saved ✓" : "Save Recipe"}
                </button>
              )}
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="shimmer" style={{ height: "32px", width: "60%" }} />
                <div className="shimmer" style={{ height: "16px", width: "40%" }} />
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  {[80, 100, 70].map((w, i) => <div key={i} className="shimmer" style={{ height: "28px", width: `${w}px`, borderRadius: "100px" }} />)}
                </div>
                <div className="shimmer" style={{ height: "1px", marginTop: "8px" }} />
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div className="shimmer" style={{ width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0 }} />
                    <div className="shimmer" style={{ height: "16px", flex: 1 }} />
                  </div>
                ))}
              </div>
            ) : recipe?.error ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ color: "#555", fontSize: "14px" }}>Something went wrong. Please try again.</p>
                <button className="generate-btn" style={{ marginTop: "20px", maxWidth: "200px" }} onClick={generateRecipe}>Retry</button>
              </div>
            ) : recipe ? (
              <div className="slide-up">
                {/* Recipe Header */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
                    <span className={`badge ${recipe.isOriginal ? "badge-original" : "badge-classic"}`}>
                      {recipe.isOriginal ? "✦ Original" : "✓ Classic"}
                    </span>
                    <span className="badge" style={{ background: "#161616", border: "1px solid #2a2a2a", color: "#666" }}>{recipe.cuisine}</span>
                    <span className="badge" style={{ background: "#161616", border: "1px solid #2a2a2a", color: "#666" }}>{recipe.difficulty}</span>
                  </div>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                    {recipe.name}
                  </h1>
                  <p style={{ fontSize: "14px", color: "#666", marginTop: "6px", fontStyle: "italic" }}>{recipe.tagline}</p>
                  <div style={{ display: "flex", gap: "20px", marginTop: "14px" }}>
                    {[["Prep", recipe.prepTime], ["Cook", recipe.cookTime], ["Serves", portions]].map(([label, val]) => (
                      <div key={label}>
                        <p style={{ fontSize: "10px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</p>
                        <p style={{ fontSize: "15px", fontWeight: 500, marginTop: "2px" }}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: "1px", background: "#1a1a1a", marginBottom: "24px" }} />

                {/* Ingredients */}
                <div style={{ marginBottom: "28px" }}>
                  <p style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>Ingredients</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {recipe.ingredients?.map((ing, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span className="icon-wrap" style={{ color: "#555" }}>{CategoryIcons[ingredientCategory(ing.item)]}</span>
                          <span style={{ fontSize: "14px", color: "#ccc" }}>{ing.item}</span>
                        </div>
                        <span style={{ fontSize: "13px", color: "#666", fontWeight: 500 }}>{ing.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: "1px", background: "#1a1a1a", marginBottom: "24px" }} />

                {/* Steps */}
                <div style={{ marginBottom: "28px" }}>
                  <p style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>Method</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {recipe.steps?.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div className="step-num">{i + 1}</div>
                        <p style={{ fontSize: "14px", color: "#aaa", lineHeight: 1.65, paddingTop: "3px" }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                {recipe.tips && (
                  <div style={{ background: "#1a1710", border: "1px solid #c8b99a22", borderRadius: "12px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "11px", color: "#c8b99a", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Chef's Tip</p>
                    <p style={{ fontSize: "13px", color: "#a89878", lineHeight: 1.6 }}>{recipe.tips}</p>
                  </div>
                )}

                <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
                  <button className="save-btn" style={{ flex: 1, textAlign: "center" }} onClick={saveRecipe}>
                    {savedMsg ? "Saved ✓" : "Save Recipe"}
                  </button>
                  <button
                    className="btn"
                    onClick={generateRecipe}
                    style={{
                      flex: 1, padding: "10px 20px", borderRadius: "10px",
                      border: "1px solid #2a2a2a", background: "#141414",
                      color: "#888", fontFamily: "inherit", fontSize: "13px",
                      fontWeight: 500, cursor: "pointer",
                    }}
                  >Try Another →</button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ═══ SAVED SCREEN ═══ */}
        {screen === "saved" && (
          <div className="fade-in">
            <div style={{ padding: "32px 0 20px" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 500, letterSpacing: "-0.02em" }}>
                Saved <span style={{ fontStyle: "italic", color: "#c8b99a" }}>Recipes</span>
              </p>
            </div>

            {savedRecipes.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ color: "#333", fontSize: "14px" }}>No saved recipes yet.</p>
                <p style={{ color: "#2a2a2a", fontSize: "13px", marginTop: "6px" }}>Generate a recipe and save it here.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {savedRecipes.map((r, i) => (
                  <div key={i} className="saved-card" onClick={() => setViewingRecipe(r)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1, marginRight: "12px" }}>
                        <div style={{ display: "flex", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span className={`badge ${r.isOriginal ? "badge-original" : "badge-classic"}`} style={{ fontSize: "10px" }}>
                            {r.isOriginal ? "✦ Original" : "✓ Classic"}
                          </span>
                          <span className="badge" style={{ background: "#161616", border: "1px solid #2a2a2a", color: "#555", fontSize: "10px" }}>{r.cuisine}</span>
                        </div>
                        <p style={{ fontSize: "16px", fontFamily: "'Playfair Display', serif", fontWeight: 500, lineHeight: 1.3 }}>{r.name}</p>
                        <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>{r.prepTime} prep · {r.cookTime} cook · {r.portions} servings</p>
                      </div>
                      <button className="delete-btn" onClick={e => { e.stopPropagation(); deleteSaved(i); }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Saved Recipe Modal ── */}
      {viewingRecipe && (
        <div className="modal-overlay" onClick={() => setViewingRecipe(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span className={`badge ${viewingRecipe.isOriginal ? "badge-original" : "badge-classic"}`}>
                  {viewingRecipe.isOriginal ? "✦ Original" : "✓ Classic"}
                </span>
                <span className="badge" style={{ background: "#161616", border: "1px solid #2a2a2a", color: "#666" }}>{viewingRecipe.cuisine}</span>
              </div>
              <button className="btn" onClick={() => setViewingRecipe(null)} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#666", width: "32px", height: "32px", borderRadius: "50%", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "6px" }}>{viewingRecipe.name}</h2>
            <p style={{ fontSize: "13px", color: "#666", fontStyle: "italic", marginBottom: "16px" }}>{viewingRecipe.tagline}</p>

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              {[["Prep", viewingRecipe.prepTime], ["Cook", viewingRecipe.cookTime], ["Serves", viewingRecipe.portions]].map(([label, val]) => (
                <div key={label}>
                  <p style={{ fontSize: "10px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</p>
                  <p style={{ fontSize: "15px", fontWeight: 500, marginTop: "2px" }}>{val}</p>
                </div>
              ))}
            </div>

            <div style={{ height: "1px", background: "#1e1e1e", marginBottom: "20px" }} />

            <p style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Ingredients</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {viewingRecipe.ingredients?.map((ing, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", color: "#bbb" }}>{ing.item}</span>
                  <span style={{ fontSize: "12px", color: "#666" }}>{ing.amount}</span>
                </div>
              ))}
            </div>

            <div style={{ height: "1px", background: "#1e1e1e", marginBottom: "20px" }} />

            <p style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Method</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {viewingRecipe.steps?.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div className="step-num">{i + 1}</div>
                  <p style={{ fontSize: "13px", color: "#999", lineHeight: 1.6, paddingTop: "3px" }}>{step}</p>
                </div>
              ))}
            </div>

            {viewingRecipe.tips && (
              <div style={{ background: "#1a1710", border: "1px solid #c8b99a22", borderRadius: "12px", padding: "12px 14px", marginTop: "20px" }}>
                <p style={{ fontSize: "10px", color: "#c8b99a", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>Chef's Tip</p>
                <p style={{ fontSize: "12px", color: "#a89878", lineHeight: 1.6 }}>{viewingRecipe.tips}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {savedMsg && <div className="toast">Recipe saved ✓</div>}
    </div>
  );
}
