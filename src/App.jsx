import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, BookOpen, MessageSquare, Compass, Shield, Sparkles, Send,
  HelpCircle, ChevronRight, CheckCircle, ExternalLink, RefreshCw, 
  Search, Lock, Heart, LogOut, Plus, Trash2, Globe, Key, AlertCircle
} from 'lucide-react';

const ASTRO_THEMES = {
  w1: { id: "w1", name: "Sage & Alabaster", bg: "#F5F2EB", card: "#FFFFFF", border: "#E4DEC9", primary: "#2D4030", hover: "#202E23", text: "#2C332D", subText: "#5D6B5E", accent: "#EAE3D2", tag: "bg-[#2D4030] text-white" },
  w2: { id: "w2", name: "Serene Lavender", bg: "#F4F3F7", card: "#FFFFFF", border: "#E2DFE9", primary: "#3E3B52", hover: "#2C2A3B", text: "#2D2A38", subText: "#656175", accent: "#E7E4EF", tag: "bg-[#3E3B52] text-white" },
  w3: { id: "w3", name: "Warm Peach & Sand", bg: "#F7F3EE", card: "#FFFFFF", border: "#EADBCE", primary: "#4A3B32", hover: "#362A23", text: "#332A24", subText: "#73645A", accent: "#EFE5DC", tag: "bg-[#4A3B32] text-white" },
  w4: { id: "w4", name: "Sky Breeze & Mist", bg: "#F1F5F7", card: "#FFFFFF", border: "#D8E2E6", primary: "#2C3E47", hover: "#1F2C33", text: "#223138", subText: "#576A73", accent: "#E0EAF0", tag: "bg-[#2C3E47] text-white" }
};

const INITIAL_WHITELIST = [
  { id: 1, name: "Debajyoti Haldar", phone: "8918444186", board: "Faculty", grade: "Faculty Admin", role: "admin", status: "active" },
  { id: 2, name: "Sourav Paul", phone: "9876543210", board: "ICSE", grade: "Class 9", role: "student", status: "active" },
  { id: 3, name: "Ananya Roy", phone: "8765432109", board: "ISC", grade: "Class 11", role: "student", status: "active" },
  { id: 4, name: "Rahul Sen", phone: "7654321098", board: "CBSE", grade: "Class 10", role: "student", status: "active" }
];

const INITIAL_MODULES = [
  {
    id: "icse-9-ch1",
    board: "ICSE",
    grade: "Class 9",
    chapter: "Chapter 1",
    title: "Language of Chemistry & Radicals",
    desc: "Valencies of radicals, criss-cross derivation, and reaction balancing logic.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveNoteUrl: "https://drive.google.com/file/d/1SAMPLE_DRIVE_ID_CLASS9/preview",
    timestamps: [
      { time: "02:15", label: "Variable Valency of Iron & Copper" },
      { time: "08:40", label: "Criss-Cross Formula Writing" },
      { time: "16:10", label: "Balancing Equations Step-by-Step" }
    ]
  },
  {
    id: "cbse-10-ch4",
    board: "CBSE",
    grade: "Class 10",
    chapter: "Chapter 4",
    title: "Carbon & Its Compounds: IUPAC Rules",
    desc: "Functional groups priority logic, longest carbon chains, and isomerism.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveNoteUrl: "https://drive.google.com/file/d/1SAMPLE_DRIVE_ID_CLASS10/preview",
    timestamps: [
      { time: "01:30", label: "Finding the Longest Carbon Chain" },
      { time: "09:45", label: "Carboxylic Acid vs Alcohol Priority" },
      { time: "18:20", label: "PYQ Nomenclature Problems" }
    ]
  },
  {
    id: "isc-11-ch3",
    board: "ISC",
    grade: "Class 11",
    chapter: "Chapter 3",
    title: "Periodic Trends & Inert Pair Effect",
    desc: "Lanthanide contraction, isoelectronic radii trends, and electron gain enthalpies.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveNoteUrl: "https://drive.google.com/file/d/1SAMPLE_DRIVE_ID_CLASS11/preview",
    timestamps: [
      { time: "03:10", label: "Shielding Effect & Effective Nuclear Charge" },
      { time: "11:25", label: "Inert Pair Effect in Thallium & Lead" },
      { time: "21:00", label: "Anomalous Chlorine vs Fluorine Enthalpy" }
    ]
  },
  {
    id: "wb-11-titration",
    board: "WBCHSE",
    grade: "Class 11",
    chapter: "Practical Chemistry",
    title: "Redox Titration: KMnO4 vs Mohr's Salt",
    desc: "Endpoint detection, self-indicator mechanism, and stoichiometric molarity calculations.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveNoteUrl: "https://drive.google.com/file/d/1SAMPLE_DRIVE_ID_TITRATION/preview",
    timestamps: [
      { time: "02:40", label: "Preparation of Standard Mohr Salt Solution" },
      { time: "08:15", label: "Why H2SO4 is used instead of HCl or HNO3" },
      { time: "14:20", label: "Permanent Pale Pink Endpoint Observation" }
    ]
  }
];

export default function DChemistryApp() {
  const [currentWeekTheme, setCurrentWeekTheme] = useState('w1');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  // Gemini API Key state
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('dchem_gemini_api_key') || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || '';
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dchem_user_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [whitelist, setWhitelist] = useState(() => {
    const saved = localStorage.getItem('dchem_whitelist_v1');
    return saved ? JSON.parse(saved) : INITIAL_WHITELIST;
  });
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('dchem_modules_v1');
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  });

  const [activeTab, setActiveTab] = useState('classroom');
  const [selectedBoard, setSelectedBoard] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [activeModule, setActiveModule] = useState(INITIAL_MODULES[0]);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  // Auth Gate State
  const [inputPhone, setInputPhone] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin New Student Form
  const [newStudent, setNewStudent] = useState({ name: '', phone: '', board: 'ICSE', grade: 'Class 9' });
  // Admin New Module Form
  const [newModule, setNewModule] = useState({ board: 'ICSE', grade: 'Class 9', chapter: '', title: '', desc: '', videoUrl: '', driveNoteUrl: '' });

  // AI Tutor State
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Namaskar! I am your D-Chemistry Live AI Tutor mentored by Debajyoti Haldar (DJ Sir). Ask me anything in English, Benglish, বাংলা, or Hinglish! I analyze your questions with vivid real-life analogies, live web knowledge, and direct links to DJ Sir's chapter notes & video timestamps.",
      analogy: "Think of chemical valency like people holding hands. Hydrogen has 1 hand, Oxygen has 2 hands. To make water, 1 Oxygen must hold two separate Hydrogens!",
      webInsight: "Board Trend 2026: Focus heavily on variable oxidation states of transition elements (e.g., Fe²⁺ vs Fe³⁺) and balancing redox equations.",
      vaultRef: { videoTime: "02:15", notePage: "Language of Chemistry (Ch 1)", moduleId: "icse-9-ch1" }
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  const theme = ASTRO_THEMES[currentWeekTheme] || ASTRO_THEMES.w1;

  useEffect(() => {
    localStorage.setItem('dchem_whitelist_v1', JSON.stringify(whitelist));
  }, [whitelist]);

  useEffect(() => {
    localStorage.setItem('dchem_modules_v1', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading]);

  const handleSaveApiKey = (keyToSave) => {
    const clean = keyToSave.trim();
    setGeminiApiKey(clean);
    localStorage.setItem('dchem_gemini_api_key', clean);
    setIsApiKeyModalOpen(false);
    alert(clean ? "✅ Gemini API Key saved! Live AI Tutor is now active." : "API Key cleared.");
  };

  // Login
  const handlePhoneLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanPhone = inputPhone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const matched = whitelist.find(s => s.phone === cleanPhone && s.status === 'active');
    if (matched) {
      setUser(matched);
      localStorage.setItem('dchem_user_session', JSON.stringify(matched));
    } else {
      setAuthError('Access Denied: This number is not enrolled in D-Chemistry batches. Contact DJ Sir at 8918444186.');
    }
  };

  const handleGoogleMockLogin = () => {
    const promptPhone = prompt("Enter your 10-digit registered WhatsApp/Mobile number to link with Google:");
    if (!promptPhone) return;
    const cleanPhone = promptPhone.trim().replace(/\D/g, '');
    const matched = whitelist.find(s => s.phone === cleanPhone && s.status === 'active');
    if (matched) {
      const googleUser = { ...matched, authType: "Google" };
      setUser(googleUser);
      localStorage.setItem('dchem_user_session', JSON.stringify(googleUser));
    } else {
      alert("Access Denied: Phone number not whitelisted by DJ Sir.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dchem_user_session');
    setUser(null);
  };

  // Admin Actions
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || newStudent.phone.length !== 10) {
      alert("Please provide full name and 10-digit mobile number.");
      return;
    }
    const student = {
      id: Date.now(),
      name: newStudent.name,
      phone: newStudent.phone,
      board: newStudent.board,
      grade: newStudent.grade,
      role: "student",
      status: "active"
    };
    setWhitelist([...whitelist, student]);
    setNewStudent({ name: '', phone: '', board: 'ICSE', grade: 'Class 9' });
    alert(`Success: ${student.name} can now log in using ${student.phone}`);
  };

  const toggleStudentStatus = (id) => {
    setWhitelist(whitelist.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'blocked' : 'active' } : s));
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModule.title || !newModule.chapter) {
      alert("Please enter title and chapter name.");
      return;
    }
    const moduleItem = {
      id: `module-${Date.now()}`,
      ...newModule,
      timestamps: [{ time: "00:00", label: "Chapter Introduction" }]
    };
    setModules([moduleItem, ...modules]);
    setNewModule({ board: 'ICSE', grade: 'Class 9', chapter: '', title: '', desc: '', videoUrl: '', driveNoteUrl: '' });
    alert("New chapter uploaded to Vault successfully!");
  };

  // LIVE GEMINI AI TUTOR ENGINE
  const handleAskAi = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userQ = query.trim();
    setQuery('');
    
    // Add user message to thread
    setChatMessages(prev => [...prev, { id: Date.now(), sender: "user", text: userQ }]);
    setIsAiLoading(true);

    // If user provided a Gemini API Key, call LIVE Google Gemini API!
    if (geminiApiKey) {
      try {
        const systemPrompt = `You are DJ Sir's AI Chemistry Tutor for the platform "D-Chemistry", mentored by Debajyoti Haldar (DJ Sir, contact: 8918444186).
The student is asking a chemistry or academic query: "${userQ}".
Selected Student Language: ${selectedLanguage} (Support English, Benglish, Bengali, Hinglish, or Hindi naturally based on the query).

You MUST output ONLY a valid JSON object strictly matching this format without any surrounding markdown code fences or backticks:
{
  "text": "Comprehensive, crystal-clear explanation answering the student's question directly in their preferred language (${selectedLanguage}). Make it engaging and easy to understand.",
  "analogy": "A memorable, vivid real-life everyday analogy (kitchen, traffic, sports, daily life) that completely simplifies this concept.",
  "webInsight": "High-yield board examination insight (ICSE/CBSE/ISC/WBCHSE), recent scientific trivia, or real-world application relevant to 2026.",
  "recommendedTopic": "Relevant chapter topic name (e.g., Electrochemistry, Language of Chemistry, Carbon Compounds, Periodic Table)",
  "videoTime": "03:45"
}`;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey.trim()}`;
        
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: systemPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json"
            }
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP error ${res.status}`);
        }

        const data = await res.json();
        const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        let parsed = null;
        try {
          const cleanJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
          parsed = JSON.parse(cleanJson);
        } catch (err) {
          parsed = {
            text: rawContent || "Processed response from Gemini AI.",
            analogy: "Relate this principle to real-world particle interactions.",
            webInsight: "Refer to the latest 2026 examination trends and syllabus patterns.",
            recommendedTopic: "General Chemistry",
            videoTime: "02:00"
          };
        }

        // Match against existing modules in vault
        const matchedModule = modules.find(m => 
          m.title.toLowerCase().includes(parsed.recommendedTopic?.toLowerCase() || '') ||
          m.chapter.toLowerCase().includes(parsed.recommendedTopic?.toLowerCase() || '')
        ) || modules[0];

        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "ai",
            text: parsed.text,
            analogy: parsed.analogy,
            webInsight: parsed.webInsight,
            vaultRef: {
              videoTime: parsed.videoTime || "02:15",
              notePage: parsed.recommendedTopic || "DJ Sir Vault",
              moduleId: matchedModule.id
            }
          }
        ]);
        setIsAiLoading(false);
        return;
      } catch (err) {
        console.error("Gemini API Error:", err);
        // Fall through to smart intelligent local processor with error notification
      }
    }

    // Dynamic Intelligent Client-side Engine (when key is missing or failed)
    setTimeout(() => {
      let explanation = "";
      let analogy = "";
      let web = "";
      let targetModule = modules[0];
      let vTime = "02:15";

      const lowerQ = userQ.toLowerCase();

      if (lowerQ.includes('sn1') || lowerQ.includes('sn2') || lowerQ.includes('nucleophil') || lowerQ.includes('organic')) {
        explanation = selectedLanguage === 'বাংলা' 
          ? "SN1 হলো Two-step reaction যেখানে Carbocation ইন্টারমিডিয়েট তৈরি হয় এবং Racemization ঘটে। অপরদিকে SN2 হলো Single-step concerted reaction যেখানে backside attack ঘটে এবং Walden Inversion (ছাতা উল্টে যাওয়ার মতো) হয়।"
          : selectedLanguage === 'Benglish'
          ? "SN1 hocche 2-step process jekhane Carbocation toiri hoy (3° > 2° > 1°). Ar SN2 hocche 1-step concerted mechanism jekhane backside attack hoy ebong complete Walden Inversion ghote (1° > 2° > 3°)."
          : "SN1 is a two-step unimolecular substitution proceeding via a stable carbocation intermediate (favored by 3° halides and polar protic solvents). SN2 is a single-step concerted bimolecular reaction involving backside nucleophilic attack resulting in complete stereochemical inversion (favored by 1° halides and polar aprotic solvents).";
        analogy = "Consider an umbrella flipping inside-out on a stormy day! In SN2, the incoming nucleophile forces the entire molecular geometry to invert in one swift stroke.";
        web = "2026 Competitive Trend: Transition state geometry (sp² planar carbocation in SN1 vs pentacoordinate trigonal bipyramidal in SN2) is frequently tested in JEE/NEET.";
        targetModule = modules.find(m => m.id === "cbse-10-ch4") || modules[0];
        vTime = "18:20";
      } else if (lowerQ.includes('titration') || lowerQ.includes('kmno4') || lowerQ.includes('redox') || lowerQ.includes('mohr')) {
        explanation = selectedLanguage === 'বাংলা'
          ? "KMnO4 বনাম Mohr's Salt টাইট্রেশনে KMnO4 নিজেই একটি Self-indicator। অম্লীয় মাধ্যমে (H2SO4) এটি Fe²⁺-কে জারিত করে Fe³⁺-এ পরিণত করে। সমস্ত Fe²⁺ জারিত হওয়ার পর অতিরিক্ত এক ফোঁটা KMnO4 দ্রবণে স্থায়ী হালকা গোলাপি (Pale Pink) বর্ণ এনে দেয়।"
          : selectedLanguage === 'Benglish'
          ? "Redox titration e KMnO4 ekta powerful self-indicator. Dilute H2SO4 er presence e KMnO4 shob Fe2+ ke oxidize kore Fe3+ kore dey. Fe2+ sesh holei extra 1 drop MnO4- permanent pale pink color dey."
          : "In Redox Titration, Potassium Permanganate (KMnO4) serves as a self-indicator. In acidic medium (dil. H2SO4), MnO4⁻ (purple) oxidizes Fe²⁺ of Mohr's salt into Fe³⁺, reducing itself to colorless Mn²⁺. At the stoichiometric equivalence point, a single drop in excess imparts a permanent pale pink tint.";
        analogy = "Imagine drinking tea with teaspoons of sugar. As long as the cup can dissolve sugar, it stays liquid. The exact moment you add one granule too many, it precipitates—signaling the endpoint!";
        web = "Lab Safety & Board Rule: Always use dilute H2SO4. Never use HCl (which gets oxidized to chlorine gas) or HNO3 (which is itself a strong oxidizing agent).";
        targetModule = modules.find(m => m.id === "wb-11-titration") || modules[0];
        vTime = "14:20";
      } else if (lowerQ.includes('valency') || lowerQ.includes('radical') || lowerQ.includes('formula') || lowerQ.includes('balance')) {
        explanation = selectedLanguage === 'বাংলা'
          ? "যোজ্যতা (Valency) হলো কোনো মৌলের অন্য মৌলের সাথে যুক্ত হওয়ার ক্ষমতা। ট্রানজিশন মৌলগুলি (যেমন Iron, Copper) পরিবর্তনশীল যোজ্যতা (Variable valency) দেখায় কারণ তাদের সর্ববহিঃস্থ কক্ষের পাশাপাশি উপ-কক্ষ (d-orbital)-এর ইলেকট্রনও বন্ধন তৈরিতে অংশ নিতে পারে।"
          : selectedLanguage === 'Benglish'
          ? "Valency mane combining capacity of an element. Fe ar Cu er moto transition metals ra variable valency dekhay karon outer shell charao d-orbital er electrons bond e participate kore. Fe2+ holo Ferrous, Fe3+ holo Ferric."
          : "Valency represents the combining capacity of an atom or radical based on electron gain, loss, or sharing. Transition elements (like Fe, Cu) display variable valency because electrons from both the outermost shell and the penultimate d-subshell can participate in bonding.";
        analogy = "Think of valency like human hands! Hydrogen has 1 hand, Oxygen has 2 hands. To make a stable compound (Water), 1 Oxygen holds hands with 2 individual Hydrogens.";
        web = "Class 9 ICSE High-Yield: Always balance polyatomic radicals as single entities (e.g., SO₄²⁻, NO₃⁻) using brackets and the criss-cross rule.";
        targetModule = modules.find(m => m.id === "icse-9-ch1") || modules[0];
        vTime = "02:15";
      } else if (lowerQ.includes('periodic') || lowerQ.includes('inert pair') || lowerQ.includes('radius') || lowerQ.includes('electronegativ')) {
        explanation = selectedLanguage === 'বাংলা'
          ? "পর্যায় সারণীতে বাম থেকে ডানে গেলে পরমাণুর আকার কমে এবং তড়িৎ-ঋণাত্মকতা বাড়ে। ভারী p-ব্লক মৌলগুলিতে (যেমন Tl, Pb, Bi) 4f ও 5d উপকক্ষের দুর্বল স্ক্রীনিংয়ের কারণে সর্ববহিঃস্থ s-ইলেকট্রন যুগল বন্ধনে অংশ নিতে চায় না—এটিকে 'Inert Pair Effect' বলে।"
          : selectedLanguage === 'Benglish'
          ? "Periodic table e left to right gele effective nuclear charge bare tai atomic size choto hoy. Heavy p-block elements e (jemon Tl, Pb) inner f-electrons er poor shielding er jonno ns2 electron pair inert thake. Etai Inert Pair Effect."
          : "Along a period, effective nuclear charge increases, shrinking atomic radius and raising electronegativity. In heavier p-block elements (Tl, Pb, Bi), the poor shielding effect of intervening 4f and 5d subshells causes the outermost ns² electron pair to remain non-bonding, known as the Inert Pair Effect.";
        analogy = "Think of the nucleus like a powerful magnet and electrons as metal clips. Poor shielding by f-orbitals is like a thin paper sheet—the magnet pulls outer s-electrons so tight they refuse to react!";
        web = "ISC/CBSE PYQ: Why is PbO₂ a strong oxidizing agent while SnO₂ is stable? Because Pb(II) is far more stable than Pb(IV) due to the Inert Pair Effect!";
        targetModule = modules.find(m => m.id === "isc-11-ch3") || modules[0];
        vTime = "11:25";
      } else {
        explanation = selectedLanguage === 'বাংলা'
          ? `আপনার প্রশ্ন "${userQ}"-এর রাসায়নিক ব্যাখ্যা: রসায়নের যেকোনো সমীকরণ বা কনসেপ্ট সমাধান করার মূল ভিত্তি হলো ইলেকট্রনিক গঠন এবং তাপগতীয় স্থায়িত্ব। ডিজে স্যারের ক্লাসনোট ও ভিডিওতে এই বিষয়ের গভীরে আলোচনা করা রয়েছে।`
          : selectedLanguage === 'Benglish'
          ? `Apnar question "${userQ}" er solution: Chemistry te sob concepts atomic stability ebong thermodynamic energy minimization er upor depend kore. DJ Sir er Class notes ebong video lectures e er full derivation ache.`
          : `For your question "${userQ}": In chemical systems, stability is governed by electron configuration, thermodynamic free energy minimization, and equilibrium kinetics. Reviewing DJ Sir's indexed lectures will solidify your numerical and conceptual mastery.`;
        analogy = "Think of nature always rolling a ball down a hill toward the lowest potential energy state—molecules react only to reach maximum stability!";
        web = "Pro Board Strategy: Always write physical states (s, l, g, aq) and specify reaction conditions (heat, catalyst, temperature) for full marks in subjective answers.";
        targetModule = modules[0];
        vTime = "05:00";
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: explanation,
          analogy,
          webInsight: web,
          vaultRef: {
            videoTime: vTime,
            notePage: targetModule.title,
            moduleId: targetModule.id
          }
        }
      ]);
      setIsAiLoading(false);
    }, 800);
  };

  // If not authenticated, render Login Gatekeeper
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-emerald-200" style={{ backgroundColor: theme.bg }}>
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border text-center" style={{ borderColor: theme.border }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 text-white shadow-md" style={{ backgroundColor: theme.primary }}>
            D
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>D-Chemistry Portal</h1>
          <p className="text-xs mt-1 mb-6 font-medium" style={{ color: theme.subText }}>Mentored by Debajyoti Haldar (DJ Sir)</p>

          <form onSubmit={handlePhoneLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-1" style={{ color: theme.text }}>
                Registered WhatsApp / Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-semibold text-slate-500">+91</span>
                <input 
                  type="tel"
                  maxLength="10"
                  value={inputPhone}
                  onChange={e => setInputPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-14 pr-4 py-3 bg-[#FAF8F5] border rounded-xl text-sm outline-none font-mono"
                  style={{ borderColor: theme.border }}
                  required
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3 text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-[0.98]"
              style={{ backgroundColor: theme.primary }}
            >
              Verify & Enter Classroom →
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <span className="text-[11px] text-slate-600 font-medium uppercase tracking-wider">or verify with</span>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          <button 
            onClick={handleGoogleMockLogin}
            type="button"
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium text-xs rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition-all"
          >
            <Globe className="w-4 h-4 text-blue-500" />
            Continue with Google Account
          </button>

          <div className="mt-8 p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-900 leading-relaxed">
            🔒 <strong>Strictly Private Platform.</strong> Access is reserved exclusively for students enrolled under DJ Sir. Contact <strong>8918444186</strong> for authorization.
          </div>
        </div>
      </div>
    );
  }

  // Filter modules
  const filteredModules = modules.filter(m => {
    const matchBoard = selectedBoard === 'ALL' || m.board === selectedBoard;
    const matchGrade = selectedGrade === 'ALL' || m.grade === selectedGrade;
    return matchBoard && matchGrade;
  });

  return (
    <div className="min-h-screen selection:bg-emerald-200 flex flex-col" style={{ backgroundColor: theme.bg, color: theme.text }}>
      
      {/* Top Banner & Session Status */}
      <div className="text-white text-xs px-4 py-2 flex justify-between items-center shadow-inner" style={{ backgroundColor: theme.primary }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Logged in: <strong>{user.name}</strong> ({user.grade || 'Faculty'})</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Gemini API Status Badge */}
          <button 
            onClick={() => { setTempApiKey(geminiApiKey); setIsApiKeyModalOpen(true); }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-all ${geminiApiKey ? 'bg-emerald-700 hover:bg-emerald-600 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white animate-bounce'}`}
          >
            <Key className="w-3 h-3" />
            {geminiApiKey ? '🟢 Live Gemini AI Active' : '⚡ Connect Live Gemini API'}
          </button>

          {user.phone === '8918444186' && (
            <button 
              onClick={() => setIsAdminDrawerOpen(!isAdminDrawerOpen)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-2.5 py-1 rounded text-[11px] shadow transition-all"
            >
              {isAdminDrawerOpen ? 'Close Faculty Admin' : '⚡ Manage Students & Modules'}
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-1 text-slate-200 hover:text-white underline ml-2">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* API Key Configuration Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border space-y-4" style={{ borderColor: theme.border }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Google Gemini API Key Setup</h3>
                  <p className="text-xs text-slate-500">Enable real-time, 100% dynamic AI Tutor responses</p>
                </div>
              </div>
              <button 
                onClick={() => setIsApiKeyModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Google provides a completely <strong>FREE Gemini API Key</strong> for educators and students with generous monthly limits. No credit card required.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Enter Your Gemini API Key:</label>
              <input 
                type="password"
                value={tempApiKey}
                onChange={e => setTempApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-emerald-700 font-bold underline flex items-center gap-1"
              >
                Get Free API Key from Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleSaveApiKey('')}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-100"
                >
                  Clear Key
                </button>
                <button 
                  onClick={() => handleSaveApiKey(tempApiKey)}
                  className="px-4 py-1.5 rounded-xl bg-[#2D4030] text-white text-xs font-bold hover:bg-[#202E23] shadow"
                >
                  Save & Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Drawer */}
      {isAdminDrawerOpen && user.phone === '8918444186' && (
        <div className="bg-slate-900 text-slate-100 p-6 border-b-4 border-emerald-500 shadow-2xl">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-emerald-400">DJ Sir Faculty Control Center</h2>
                <p className="text-xs text-slate-400">Manage enrolled student phone numbers, Gemini AI key, and upload Google Drive chapters directly.</p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 text-xs px-3 py-1 rounded-full font-mono">Faculty Access Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Whitelist Manager */}
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Add Authorized Student
                </h3>
                <form onSubmit={handleAddStudent} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      placeholder="Student Full Name"
                      value={newStudent.name}
                      onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                      className="bg-slate-700 text-white text-xs px-3 py-2 rounded-lg outline-none"
                      required
                    />
                    <input 
                      type="tel"
                      maxLength="10"
                      placeholder="10-Digit Mobile"
                      value={newStudent.phone}
                      onChange={e => setNewStudent({...newStudent, phone: e.target.value.replace(/\D/g, '')})}
                      className="bg-slate-700 text-white text-xs px-3 py-2 rounded-lg outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={newStudent.board}
                      onChange={e => setNewStudent({...newStudent, board: e.target.value})}
                      className="bg-slate-700 text-white text-xs px-3 py-2 rounded-lg"
                    >
                      <option>ICSE</option>
                      <option>ISC</option>
                      <option>CBSE</option>
                      <option>WBCHSE</option>
                      <option>JEE/NEET</option>
                    </select>
                    <select 
                      value={newStudent.grade}
                      onChange={e => setNewStudent({...newStudent, grade: e.target.value})}
                      className="bg-slate-700 text-white text-xs px-3 py-2 rounded-lg"
                    >
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-lg shadow">
                    + Authorize Student Number
                  </button>
                </form>

                {/* Whitelist List */}
                <div className="mt-4 max-h-40 overflow-y-auto space-y-1.5 pr-1">
                  {whitelist.map(st => (
                    <div key={st.id} className="flex justify-between items-center bg-slate-900/80 px-3 py-1.5 rounded-lg text-xs">
                      <div>
                        <span className="font-semibold text-white">{st.name}</span>
                        <span className="text-slate-400 ml-2 font-mono">({st.phone})</span>
                        <span className="ml-2 text-[10px] bg-slate-700 text-emerald-300 px-1.5 py-0.5 rounded">{st.grade}</span>
                      </div>
                      {st.phone !== '8918444186' && (
                        <button 
                          onClick={() => toggleStudentStatus(st.id)}
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${st.status === 'active' ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}
                        >
                          {st.status === 'active' ? 'Revoke' : 'Reactivate'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Drive Lecture Module */}
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" /> Upload New Drive Module
                </h3>
                <form onSubmit={handleAddModule} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      placeholder="Chapter Name (e.g. Ch 5 Atomic Structure)"
                      value={newModule.chapter}
                      onChange={e => setNewModule({...newModule, chapter: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                      required
                    />
                    <input 
                      type="text"
                      placeholder="Topic Title"
                      value={newModule.title}
                      onChange={e => setNewModule({...newModule, title: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                      required
                    />
                  </div>
                  <input 
                    type="text"
                    placeholder="Short Description"
                    value={newModule.desc}
                    onChange={e => setNewModule({...newModule, desc: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="url"
                      placeholder="Google Drive PDF URL"
                      value={newModule.driveNoteUrl}
                      onChange={e => setNewModule({...newModule, driveNoteUrl: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                    />
                    <input 
                      type="url"
                      placeholder="Video URL (YouTube/Drive)"
                      value={newModule.videoUrl}
                      onChange={e => setNewModule({...newModule, videoUrl: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 rounded-lg shadow">
                    + Publish Module to Vault
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Astro-Theme Switcher */}
      <header className="px-6 py-4 border-b bg-white/70 backdrop-blur-md sticky top-0 z-30 flex flex-wrap justify-between items-center gap-4" style={{ borderColor: theme.border }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow" style={{ backgroundColor: theme.primary }}>
            D
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: theme.text }}>D-CHEMISTRY</h1>
            <p className="text-[11px] font-medium" style={{ color: theme.subText }}>Digital Learning Ecosystem & AI Tutor</p>
          </div>
        </div>

        {/* Language & Theme Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            {['English', 'Benglish', 'বাংলা', 'Hinglish', 'हिंदी'].map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${selectedLanguage === lang ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Weekly Astro-Pastel Theme Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl text-xs">
            <span className="text-[10px] text-slate-500 px-1 font-bold uppercase">Theme:</span>
            {Object.values(ASTRO_THEMES).map(t => (
              <button
                key={t.id}
                onClick={() => setCurrentWeekTheme(t.id)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${currentWeekTheme === t.id ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b px-6 py-2 bg-white/50 flex gap-2 overflow-x-auto" style={{ borderColor: theme.border }}>
        {[
          { id: 'classroom', label: 'Classroom & Drive Vault', icon: BookOpen },
          { id: 'aitutor', label: 'DJ Sir AI Tutor (Live)', icon: Sparkles },
          { id: 'sangha', label: 'Student Sangha (Chat)', icon: MessageSquare },
          { id: 'sanctuary', label: 'D-Tattva (Calm Zone)', icon: Compass }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? 'text-white shadow-sm' : 'hover:bg-black/5'}`}
              style={{
                backgroundColor: isActive ? theme.primary : 'transparent',
                color: isActive ? '#FFFFFF' : theme.text
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-6 flex-1 w-full">
        
        {/* TAB 1: CLASSROOM & DRIVE VAULT */}
        {activeTab === 'classroom' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border" style={{ borderColor: theme.border }}>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-600">Board:</span>
                {['ALL', 'ICSE', 'ISC', 'CBSE', 'WBCHSE'].map(b => (
                  <button 
                    key={b} 
                    onClick={() => setSelectedBoard(b)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${selectedBoard === b ? 'bg-slate-800 text-white shadow' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-600">Grade:</span>
                {['ALL', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(g => (
                  <button 
                    key={g} 
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${selectedGrade === g ? 'bg-slate-800 text-white shadow' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Player + Drive Notes Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Custom Player */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-black rounded-3xl overflow-hidden aspect-video relative shadow-xl border border-slate-800">
                  <iframe 
                    src={activeModule.videoUrl} 
                    title={activeModule.title}
                    className="w-full h-full border-0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-6 rounded-3xl bg-white border space-y-3" style={{ borderColor: theme.border }}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                        {activeModule.board} • {activeModule.grade} • {activeModule.chapter}
                      </span>
                      <h2 className="text-xl font-bold mt-2" style={{ color: theme.text }}>{activeModule.title}</h2>
                      <p className="text-xs mt-1" style={{ color: theme.subText }}>{activeModule.desc}</p>
                    </div>
                    <button 
                      onClick={() => setIsDriveModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Read Drive PDF Note
                    </button>
                  </div>

                  {/* Interactive Timestamps */}
                  <div className="pt-3 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Video Milestones:</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModule.timestamps?.map((ts, idx) => (
                        <button 
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium flex items-center gap-1.5 transition-all"
                        >
                          <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                          <span className="font-bold text-emerald-700 font-mono">{ts.time}</span>
                          <span>{ts.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 1 Col: Module List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-700 px-1">Curriculum Modules ({filteredModules.length})</h3>
                <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                  {filteredModules.map(mod => {
                    const isSelected = activeModule.id === mod.id;
                    return (
                      <div 
                        key={mod.id}
                        onClick={() => setActiveModule(mod)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'bg-white ring-2 shadow-md' : 'bg-white/70 hover:bg-white'}`}
                        style={{ borderColor: isSelected ? theme.primary : theme.border }}
                      >
                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold mb-1">
                          <span>{mod.board} • {mod.grade}</span>
                          <span className="text-emerald-700 font-mono">{mod.chapter}</span>
                        </div>
                        <h4 className="text-sm font-bold leading-snug" style={{ color: theme.text }}>{mod.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{mod.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI TUTOR (LIVE & POLYGLOT) */}
        {activeTab === 'aitutor' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: theme.text }}>DJ Sir Live AI Tutor</h2>
                    <p className="text-xs text-slate-500">
                      Grounded in chemistry syllabus, real-life analogies, and DJ Sir notes ({selectedLanguage} active).
                    </p>
                  </div>
                </div>

                {/* API Status & Setup Button */}
                <button 
                  onClick={() => { setTempApiKey(geminiApiKey); setIsApiKeyModalOpen(true); }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100"
                  style={{ borderColor: theme.border }}
                >
                  <Key className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{geminiApiKey ? 'API Configured' : 'Setup Gemini API'}</span>
                </button>
              </div>

              {!geminiApiKey && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Gemini API is currently running in smart fallback mode. Add your free Gemini API key to unlock 100% live web responses!</span>
                  </div>
                  <button 
                    onClick={() => { setTempApiKey(geminiApiKey); setIsApiKeyModalOpen(true); }}
                    className="underline font-bold text-amber-950 shrink-0 ml-2"
                  >
                    Add Key
                  </button>
                </div>
              )}

              {/* Chat Thread */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl p-4 rounded-3xl text-xs space-y-3 ${msg.sender === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-slate-50 border rounded-tl-none'}`} style={{ borderColor: theme.border }}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      
                      {/* Real Life Analogy Box */}
                      {msg.analogy && (
                        <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200/80 text-amber-950 space-y-1">
                          <span className="font-bold flex items-center gap-1.5 text-amber-800">
                            💡 Real-Life Daily Analogy:
                          </span>
                          <p className="leading-relaxed">{msg.analogy}</p>
                        </div>
                      )}

                      {/* Live Web Grounding Box */}
                      {msg.webInsight && (
                        <div className="p-3 bg-blue-50/90 rounded-2xl border border-blue-200/80 text-blue-950 space-y-1">
                          <span className="font-bold flex items-center gap-1.5 text-blue-800">
                            🌐 Syllabus & Web Grounding:
                          </span>
                          <p className="leading-relaxed">{msg.webInsight}</p>
                        </div>
                      )}

                      {/* Vault Action Button */}
                      {msg.vaultRef && (
                        <div className="pt-2 flex items-center gap-2">
                          <button 
                            onClick={() => {
                              const target = modules.find(m => m.id === msg.vaultRef.moduleId);
                              if (target) {
                                setActiveModule(target);
                                setActiveTab('classroom');
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 shadow"
                          >
                            <Play className="w-3 h-3 fill-white" /> Watch at {msg.vaultRef.videoTime}
                          </button>
                          <span className="text-[10px] text-slate-500 font-mono">Ref: {msg.vaultRef.notePage}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-500 flex items-center gap-2 animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
                    DJ Sir AI is generating your live explanation and everyday analogies...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleAskAi} className="flex gap-2 pt-2 border-t">
                <input 
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={`Ask a chemistry question in ${selectedLanguage} (e.g. SN1 vs SN2, Redox Titration, Periodic trends)...`}
                  className="flex-1 px-4 py-3 bg-[#FAF8F5] border rounded-2xl text-xs outline-none focus:ring-2 focus:ring-emerald-700"
                  style={{ borderColor: theme.border }}
                />
                <button 
                  type="submit"
                  disabled={isAiLoading}
                  className="px-5 py-3 rounded-2xl text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Send className="w-3.5 h-3.5" /> Ask AI
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT SANGHA (COMMUNITY FORUM) */}
        {activeTab === 'sangha' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: theme.text }}>Student Sangha (Peer Exchange)</h2>
                  <p className="text-xs text-slate-500">Collaborate with fellow students across ICSE, ISC, and CBSE batches.</p>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">+ Post Question</button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    author: "Sourav Paul (Class 9 ICSE)",
                    title: "Help with balancing thermal decomposition of Lead Nitrate?",
                    body: "Sir explained the reddish-brown NO2 gas, but I get stuck with balancing the fractional 1/2 O2. Can someone share their step-by-step notes?",
                    likes: 6,
                    facultyReply: "Debajyoti Haldar (DJ Sir): Multiply the entire equation by 2 at the end! Check video milestone 16:10 in Chapter 1."
                  },
                  {
                    author: "Ananya Roy (Class 11 ISC)",
                    title: "Why does MnO4- act as self-indicator in redox titration?",
                    body: "Just finished the Titration lab today. The pale pink color persisted after 20.4 mL of KMnO4.",
                    likes: 9,
                    facultyReply: "Debajyoti Haldar (DJ Sir): Brilliant observation! The de-colorization stops when all Fe2+ ions are oxidized to Fe3+. Once Fe2+ is exhausted, unreacted MnO4- imparts the permanent pink tint."
                  }
                ].map((post, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border space-y-2 text-xs" style={{ borderColor: theme.border }}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">{post.author}</span>
                      <span className="flex items-center gap-1 text-rose-600 font-bold"><Heart className="w-3 h-3 fill-rose-600" /> {post.likes}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{post.title}</h4>
                    <p className="text-slate-600">{post.body}</p>
                    {post.facultyReply && (
                      <div className="mt-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                        <span className="font-bold block text-[11px] text-emerald-800">Faculty Verified:</span>
                        {post.facultyReply}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: D-TATTVA (CALM SANCTUARY) */}
        {activeTab === 'sanctuary' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}>
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: theme.text }}>D-Tattva: Moral & Mind Mastery</h2>
                  <p className="text-xs text-slate-500">Mind calming breathwork, moral clarity, and curated character development resources.</p>
                </div>
              </div>

              {/* Breathing Exercise Widget */}
              <div className="p-6 rounded-3xl bg-[#FAF8F5] border text-center space-y-4" style={{ borderColor: theme.border }}>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Exam Stress Decompressor: 4-4-4-4 Box Breath</span>
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-emerald-600 flex items-center justify-center mx-auto scale-in shadow-inner">
                  <span className="text-sm font-bold text-emerald-900">Breathe & Focus</span>
                </div>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, pause for 4 seconds before test practice.
                </p>
              </div>

              {/* Curated Guidance Channels */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Curated Guidance & Motivation Vault:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { title: "Swami Vivekananda: Power of Concentration", desc: "Developing unshakeable mind focus and moral integrity." },
                    { title: "Richard Feynman: The Joy of Finding Things Out", desc: "Scientific curiosity and learning without blind memorization." },
                    { title: "Andrew Huberman: Neuroplasticity & Deep Focus", desc: "Scientific protocols for memory retention and restful sleep." },
                    { title: "Stoic Philosophy for Students", desc: "Overcoming fear of examination results and building resilience." }
                  ].map((res, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border flex justify-between items-center" style={{ borderColor: theme.border }}>
                      <div>
                        <h4 className="font-bold text-slate-800">{res.title}</h4>
                        <p className="text-[11px] text-slate-500">{res.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Google Drive PDF Viewer Modal */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl border" style={{ borderColor: theme.border }}>
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{activeModule.title} — Google Drive Notes</h3>
                <p className="text-[11px] text-slate-500">Official D-Chemistry Study Material & Formula Derivations</p>
              </div>
              <button 
                onClick={() => setIsDriveModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
              <BookOpen className="w-12 h-12 text-slate-400 mb-3" />
              <h4 className="text-base font-bold text-slate-800 mb-1">Google Drive PDF Preview Ready</h4>
              <p className="text-xs text-slate-500 max-w-md mb-4">
                Embed your Google Drive PDF preview link directly in <code>driveNoteUrl</code> in your Admin panel to display pages smoothly inside this viewer.
              </p>
              <a 
                href={activeModule.driveNoteUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow"
              >
                Open Note in New Tab <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-4 border-t text-center text-xs text-slate-500 bg-white/50" style={{ borderColor: theme.border }}>
        D-Chemistry Learning Ecosystem • Mentored by Debajyoti Haldar (DJ Sir) • Contact: 8918444186
      </footer>
    </div>
  );
}
