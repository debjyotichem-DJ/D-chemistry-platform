import React, { useState, useEffect } from 'react';
import { 
  Play, BookOpen, MessageSquare, Compass, Shield, Sparkles, Send,
  CheckCircle, ExternalLink, Lock, Heart, LogOut, Plus, Globe, X,
  Clock, Award, Users, Phone
} from 'lucide-react';

const ASTRO_THEMES = {
  w1: { id: "w1", name: "Sage & Alabaster", bg: "#F5F2EB", card: "#FFFFFF", border: "#E4DEC9", primary: "#2D4030", hover: "#202E23", text: "#2C332D", subText: "#5D6B5E", accent: "#EAE3D2", tag: "bg-[#2D4030] text-white" },
  w2: { id: "w2", name: "Serene Lavender", bg: "#F4F3F7", card: "#FFFFFF", border: "#E2DFE9", primary: "#3E3B52", hover: "#2C2A3B", text: "#2D2A38", subText: "#656175", accent: "#E7E4EF", tag: "bg-[#3E3B52] text-white" },
  w3: { id: "w3", name: "Warm Peach & Sand", bg: "#F7F3EE", card: "#FFFFFF", border: "#EADBCE", primary: "#4A3B32", hover: "#362A23", text: "#332A24", subText: "#73645A", accent: "#EFE5DC", tag: "bg-[#4A3B32] text-white" },
  w4: { id: "w4", name: "Sky Breeze & Mist", bg: "#F1F5F7", card: "#FFFFFF", border: "#D8E2E6", primary: "#2C3E47", hover: "#1F2C33", text: "#223138", subText: "#576A73", accent: "#E0EAF0", tag: "bg-[#2C3E47] text-white" }
};

const INITIAL_WHITELIST = [
  { id: 1, name: "Debajyoti Haldar (DJ Sir)", phone: "8918444186", board: "Faculty", grade: "Faculty Admin", role: "admin", status: "active" },
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
    noteSummary: [
      "Positive Radicals: Fe²⁺ (Ferrous), Fe³⁺ (Ferric), Cu⁺ (Cuprous), Cu²⁺ (Cupric), NH₄⁺ (Ammonium).",
      "Negative Radicals: SO₄²⁻ (Sulphate), SO₃²⁻ (Sulphite), NO₃⁻ (Nitrate), Cr₂O₇²⁻ (Dichromate), MnO₄⁻ (Permanganate).",
      "Criss-Cross Rule: Write symbols side by side, interchange valency numbers to subscript, divide by HCF if common factor exists (e.g., Ca²⁺O²⁻ → CaO).",
      "Thermal Decomposition of Lead Nitrate: 2Pb(NO₃)₂ → 2PbO (yellow residue) + 4NO₂↑ (reddish-brown fumes) + O₂↑."
    ],
    timestamps: [
      { time: "02:15", seconds: 135, label: "Variable Valency of Iron & Copper" },
      { time: "08:40", seconds: 520, label: "Criss-Cross Formula Writing" },
      { time: "16:10", seconds: 970, label: "Balancing Equations Step-by-Step" }
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
    noteSummary: [
      "Functional Group Priority Order: -COOH (Carboxylic Acid) > -SO₃H > -COOR (Ester) > -CHO (Aldehyde) > >C=O (Ketone) > -OH (Alcohol) > -NH₂ > = (Alkene) > ≡ (Alkyne).",
      "Lowest Locant Rule: Number the longest continuous carbon chain so that the principal functional group gets the lowest possible carbon number.",
      "SN1 vs SN2 Overview: Tertiary alkyl halides favor 2-step carbocation SN1; Primary halides favor 1-step concerted backside attack SN2 with Walden inversion.",
      "Homologous Series: Successive members differ by a -CH₂- unit or 14 u molecular mass."
    ],
    timestamps: [
      { time: "01:30", seconds: 90, label: "Finding the Longest Carbon Chain" },
      { time: "09:45", seconds: 585, label: "Carboxylic Acid vs Alcohol Priority" },
      { time: "18:20", seconds: 1100, label: "PYQ Nomenclature Problems" }
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
    noteSummary: [
      "Effective Nuclear Charge (Z_eff): Z_eff = Z - σ. Across a period, Z increases faster than shielding σ, pulling valence shell closer.",
      "Inert Pair Effect: Reluctance of ns² electrons to participate in bonding in heavier p-block elements (Tl⁺ is more stable than Tl³⁺; Pb²⁺ is more stable than Pb⁴⁺) due to poor shielding of 4f and 5d electrons.",
      "Electron Gain Enthalpy Anomaly: Chlorine (-349 kJ/mol) is more negative than Fluorine (-328 kJ/mol) because Fluorine's compact 2p subshell experiences strong inter-electronic repulsion."
    ],
    timestamps: [
      { time: "03:10", seconds: 190, label: "Shielding Effect & Effective Nuclear Charge" },
      { time: "11:25", seconds: 685, label: "Inert Pair Effect in Thallium & Lead" },
      { time: "21:00", seconds: 1260, label: "Anomalous Chlorine vs Fluorine Enthalpy" }
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
    noteSummary: [
      "Ionic Equation: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O (Stoichiometric ratio KMnO₄ : Mohr's Salt = 1 : 5).",
      "Why Dilute H₂SO₄ is used: HCl is oxidized by KMnO₄ to Cl₂ gas, while HNO₃ is itself a strong oxidizing agent and interferes with the redox endpoint.",
      "No Heating Required: Unlike Oxalic Acid titration (which requires heating to 60°C), Fe²⁺ oxidation by MnO₄⁻ is instantaneous at room temperature.",
      "Self-Indicator: MnO₄⁻ gives a permanent pale pink tint with the first excess drop once all Fe²⁺ ions are oxidized to Fe³⁺."
    ],
    timestamps: [
      { time: "02:40", seconds: 160, label: "Preparation of Standard Mohr Salt Solution" },
      { time: "08:15", seconds: 495, label: "Why H2SO4 is used instead of HCl or HNO3" },
      { time: "14:20", seconds: 860, label: "Permanent Pale Pink Endpoint Observation" }
    ]
  }
];

const INITIAL_SANGHA_POSTS = [
  {
    id: 101,
    author: "Sourav Paul (Class 9 ICSE)",
    title: "Help with balancing thermal decomposition of Lead Nitrate?",
    body: "Sir explained the reddish-brown NO2 gas, but I get stuck with balancing the fractional 1/2 O2. Can someone share their step-by-step notes?",
    likes: 6,
    likedByMe: false,
    facultyReply: "Debajyoti Haldar (DJ Sir): Multiply the entire equation by 2 at the end! Check video milestone 16:10 in Chapter 1."
  },
  {
    id: 102,
    author: "Ananya Roy (Class 11 ISC)",
    title: "Why does MnO4- act as self-indicator in redox titration?",
    body: "Just finished the Titration lab today. The pale pink color persisted after 20.4 mL of KMnO4.",
    likes: 9,
    likedByMe: false,
    facultyReply: "Debajyoti Haldar (DJ Sir): Brilliant observation! The de-colorization stops when all Fe2+ ions are oxidized to Fe3+. Once Fe2+ is exhausted, unreacted MnO4- imparts the permanent pink tint."
  }
];

const GUIDANCE_VAULT = [
  {
    id: "g1",
    title: "Swami Vivekananda: Power of Concentration",
    desc: "Developing unshakeable mind focus and moral integrity.",
    summary: "All knowledge that the world has ever received comes from the mind; the infinite library of the universe is in your own mind. When you concentrate your mental rays on a single reaction or concept, the toughest problem reveals its internal logic."
  },
  {
    id: "g2",
    title: "Richard Feynman: The Joy of Finding Things Out",
    desc: "Scientific curiosity and learning without blind memorization.",
    summary: "Never just memorize the name of a bird or a chemical formula—understand how the atoms behave! If you can explain a concept in simple daily language to a classmate, you have truly mastered it."
  },
  {
    id: "g3",
    title: "Andrew Huberman: Neuroplasticity & Deep Focus",
    desc: "Scientific protocols for memory retention and restful sleep.",
    summary: "90-minute intense study bouts followed by 10 minutes of non-sleep deep rest (NSDR) or box breathing accelerates synaptic consolidation of complex organic mechanisms."
  },
  {
    id: "g4",
    title: "Stoic Philosophy for Students",
    desc: "Overcoming fear of examination results and building resilience.",
    summary: "Focus 100% on your daily preparation, practice problems, and laboratory accuracy—which are within your control—and release anxiety about the external exam hall outcome."
  }
];

function safeGetStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function safeSetStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    // Ignore storage quota / sandbox restrictions
  }
}

function safeRemoveStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // Ignore sandbox restrictions
  }
}

export default function App() {
  const [currentWeekTheme, setCurrentWeekTheme] = useState('w1');
  const [user, setUser] = useState(() => safeGetStorage('dchem_user_session', null));
  const [whitelist, setWhitelist] = useState(() => safeGetStorage('dchem_whitelist_v1', INITIAL_WHITELIST));
  const [modules, setModules] = useState(() => safeGetStorage('dchem_modules_v1', INITIAL_MODULES));
  const [sanghaPosts, setSanghaPosts] = useState(() => safeGetStorage('dchem_sangha_v1', INITIAL_SANGHA_POSTS));

  const [activeTab, setActiveTab] = useState('classroom');
  const [selectedBoard, setSelectedBoard] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [activeModule, setActiveModule] = useState(INITIAL_MODULES[0]);
  const [activeTimestamp, setActiveTimestamp] = useState(null);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auth Gate State
  const [inputPhone, setInputPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleLinkPhone, setGoogleLinkPhone] = useState('');

  // Admin New Student Form
  const [newStudent, setNewStudent] = useState({ name: '', phone: '', board: 'ICSE', grade: 'Class 9' });
  // Admin New Module Form
  const [newModule, setNewModule] = useState({ board: 'ICSE', grade: 'Class 9', chapter: '', title: '', desc: '', videoUrl: '', driveNoteUrl: '' });

  // Student Sangha Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  // D-Tattva Active Guidance Modal
  const [activeGuidance, setActiveGuidance] = useState(null);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');

  // AI Tutor State
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Namaskar! I am your D-Chemistry AI Tutor. Ask me any question in English, Benglish, বাংলা, or Hinglish. I answer using real-life daily examples, live web insights, and DJ Sir's exact notes & video timestamps.",
      analogy: "Think of chemical valency like people holding hands. Hydrogen has 1 hand, Oxygen has 2 hands. To make water, 1 Oxygen must hold two separate Hydrogens!",
      webInsight: "Latest 2026 Board Trend: Focus heavily on oxidation states and why transition elements show variable valency.",
      vaultRef: { videoTime: "02:15", notePage: "Page 4 (Language of Chemistry)", moduleId: "icse-9-ch1" }
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const theme = ASTRO_THEMES[currentWeekTheme] || ASTRO_THEMES.w1;

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    safeSetStorage('dchem_whitelist_v1', whitelist);
  }, [whitelist]);

  useEffect(() => {
    safeSetStorage('dchem_modules_v1', modules);
  }, [modules]);

  useEffect(() => {
    safeSetStorage('dchem_sangha_v1', sanghaPosts);
  }, [sanghaPosts]);

  // Breathing phase timer for D-Tattva
  useEffect(() => {
    if (activeTab !== 'sanctuary') return;
    const phases = ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Pause (4s)'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setBreathPhase(phases[idx]);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab]);

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
      safeSetStorage('dchem_user_session', matched);
      showToast(`Welcome back, ${matched.name}!`);
    } else {
      setAuthError('Access Denied: This number is not enrolled in D-Chemistry batches. Contact DJ Sir at 8918444186.');
    }
  };

  const handleQuickDemoLogin = (phoneNum) => {
    setAuthError('');
    const matched = whitelist.find(s => s.phone === phoneNum && s.status === 'active');
    if (matched) {
      setUser(matched);
      safeSetStorage('dchem_user_session', matched);
      showToast(`Logged in as ${matched.name}`);
    }
  };

  const handleGoogleModalSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = googleLinkPhone.trim().replace(/\D/g, '');
    const matched = whitelist.find(s => s.phone === cleanPhone && s.status === 'active');
    if (matched) {
      const googleUser = { ...matched, authType: "Google" };
      setUser(googleUser);
      safeSetStorage('dchem_user_session', googleUser);
      setIsGoogleModalOpen(false);
      setGoogleLinkPhone('');
      showToast(`Google Account verified for ${matched.name}!`);
    } else {
      setAuthError('Access Denied: Phone number not whitelisted by DJ Sir.');
      setIsGoogleModalOpen(false);
    }
  };

  const handleLogout = () => {
    safeRemoveStorage('dchem_user_session');
    setUser(null);
    setIsAdminDrawerOpen(false);
  };

  // Admin Actions
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || newStudent.phone.length !== 10) {
      showToast("Please provide full name and 10-digit mobile number.", "error");
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
    showToast(`Authorized: ${student.name} (${student.phone}) can now log in!`);
  };

  const toggleStudentStatus = (id) => {
    setWhitelist(whitelist.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'blocked' : 'active' } : s));
    showToast("Updated student access status.");
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModule.title || !newModule.chapter) {
      showToast("Please enter title and chapter name.", "error");
      return;
    }
    const moduleItem = {
      id: `module-${Date.now()}`,
      ...newModule,
      videoUrl: newModule.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
      driveNoteUrl: newModule.driveNoteUrl || "https://drive.google.com/file/d/1SAMPLE_DRIVE_ID/preview",
      noteSummary: [
        `${newModule.chapter} — ${newModule.title}: Complete lecture notes uploaded by Debajyoti Haldar (DJ Sir).`,
        newModule.desc || "Includes step-by-step derivations, board PYQs, and mechanism summaries."
      ],
      timestamps: [{ time: "00:00", seconds: 0, label: "Chapter Introduction" }]
    };
    setModules([moduleItem, ...modules]);
    setActiveModule(moduleItem);
    setNewModule({ board: 'ICSE', grade: 'Class 9', chapter: '', title: '', desc: '', videoUrl: '', driveNoteUrl: '' });
    showToast("New chapter published to Drive Vault!");
  };

  // Student Sangha Actions
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    const postItem = {
      id: Date.now(),
      author: `${user.name} (${user.grade || 'Faculty'} ${user.board || ''})`,
      title: newPost.title.trim(),
      body: newPost.body.trim(),
      likes: 1,
      likedByMe: true,
      facultyReply: user.phone === '8918444186'
        ? "Debajyoti Haldar (DJ Sir): Official Faculty Announcement & Concept Note."
        : null
    };
    setSanghaPosts([postItem, ...sanghaPosts]);
    setNewPost({ title: '', body: '' });
    setIsPostModalOpen(false);
    showToast("Your question has been posted to Student Sangha!");
  };

  const handleToggleLike = (postId) => {
    setSanghaPosts(sanghaPosts.map(p => {
      if (p.id !== postId) return p;
      const nextLiked = !p.likedByMe;
      return {
        ...p,
        likedByMe: nextLiked,
        likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
      };
    }));
  };

  // AI Tutor Send
  const handleAskAi = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userQ = query;
    setQuery('');
    setChatMessages(prev => [...prev, { id: Date.now(), sender: "user", text: userQ }]);
    setIsAiLoading(true);

    setTimeout(() => {
      const qLower = userQ.toLowerCase();
      let analogy = "Consider an umbrella on a windy day. In SN2, the nucleophile attacks from the backside and flips the molecule inside-out like an inverted umbrella in one swift step!";
      let web = "Live Search: Recent organic synthesis in pharmaceutical chemistry favors SN2 stereochemical inversion for enantiopure drug synthesis.";
      let ref = { videoTime: "18:20", notePage: "Page 12 (Organic Mechanism Vault)", moduleId: "cbse-10-ch4" };

      if (qLower.includes('titration') || qLower.includes('kmno4') || qLower.includes('mohr')) {
        analogy = "Think of titration like adding drops of pink Rooh Afza into a glass of magic decolorizing water. The moment one single drop cannot be neutralized by the Mohr salt, the water stays pale pink forever—that is your endpoint!";
        web = "Live Search: Standard redox titrations use 0.02M KMnO4 with Mohr's salt in dilute H2SO4 medium to prevent MnO2 brown precipitate formation.";
        ref = { videoTime: "14:20", notePage: "Page 2 (Redox Practical Sheet)", moduleId: "wb-11-titration" };
      } else if (qLower.includes('inert') || qLower.includes('periodic') || qLower.includes('thallium') || qLower.includes('lead')) {
        analogy = "Think of inner 4f/5d electrons like a torn umbrella that fails to shield the rain (nuclear attraction). The heavy nucleus pulls the outermost s-electrons so tightly into its pocket that they refuse to come out and bond!";
        web = "Live Search: Relativistic contraction of the 6s orbital in heavy p-block elements strongly stabilizes lower oxidation states like Tl(+1) and Pb(+2).";
        ref = { videoTime: "11:25", notePage: "Page 7 (Periodic Trends Vault)", moduleId: "isc-11-ch3" };
      } else if (qLower.includes('valency') || qLower.includes('radical') || qLower.includes('balance') || qLower.includes('lead nitrate')) {
        analogy = "Valency is simply the number of hands an atom has to shake hands with others. Iron (Fe) is a superhero that can use either 2 hands (Ferrous) or 3 hands (Ferric) depending on how energetic the reaction is!";
        web = "Live Search: ICSE & CBSE board examiners deduct 0.5 marks if gaseous evolution arrows (↑) or precipitate arrows (↓) are omitted in balanced equations.";
        ref = { videoTime: "08:40", notePage: "Page 4 (Language of Chemistry)", moduleId: "icse-9-ch1" };
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: `Here is DJ Sir's crystal-clear 3-tier breakdown for "${userQ}":`,
          analogy,
          webInsight: web,
          vaultRef: ref
        }
      ]);
      setIsAiLoading(false);
    }, 650);
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

          {/* One-Click Quick Access Pills for Instant Preview */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-left">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Instant One-Click Demo Login:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('8918444186')}
                className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Award className="w-3.5 h-3.5 text-amber-700" /> DJ Sir (Admin)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('9876543210')}
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Users className="w-3.5 h-3.5 text-emerald-700" /> Sourav (Student)
              </button>
            </div>
          </div>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">or verify with</span>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          <button 
            onClick={() => setIsGoogleModalOpen(true)}
            type="button"
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium text-xs rounded-xl flex items-center justify-center gap-2.5 shadow-sm transition-all"
          >
            <Globe className="w-4 h-4 text-blue-500" />
            Continue with Google Account
          </button>

          <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-900 leading-relaxed">
            🔒 <strong>Strictly Private Platform.</strong> Access is reserved exclusively for students enrolled under DJ Sir. Contact <strong>8918444186</strong> for authorization.
          </div>
        </div>

        {/* Google Verification Modal */}
        {isGoogleModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" /> Link Google with Batch Number
                </h3>
                <button onClick={() => setIsGoogleModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Enter your 10-digit registered WhatsApp/Mobile number to verify your enrollment with Google Sign-In:
              </p>
              <form onSubmit={handleGoogleModalSubmit} className="space-y-3">
                <input
                  type="tel"
                  maxLength="10"
                  value={googleLinkPhone}
                  onChange={e => setGoogleLinkPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 8918444186 or 9876543210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-mono outline-none"
                  style={{ borderColor: theme.border }}
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsGoogleModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl text-white text-xs font-bold"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Link & Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
      
      {/* In-Page Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-2xl shadow-xl border bg-slate-900 text-white text-xs font-medium flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Banner & Session Status */}
      <div className="text-white text-xs px-4 py-2 flex flex-wrap justify-between items-center gap-2 shadow-inner" style={{ backgroundColor: theme.primary }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Logged in: <strong>{user.name}</strong> ({user.grade || 'Faculty'})</span>
        </div>
        <div className="flex items-center gap-4">
          {user.phone === '8918444186' && (
            <button 
              onClick={() => setIsAdminDrawerOpen(!isAdminDrawerOpen)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded text-[11px] shadow transition-all"
            >
              {isAdminDrawerOpen ? 'Close Faculty Admin' : '⚡ Manage Students & Modules'}
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-1 text-slate-200 hover:text-white underline">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Admin Panel Drawer */}
      {isAdminDrawerOpen && user.phone === '8918444186' && (
        <div className="bg-slate-900 text-slate-100 p-6 border-b-4 border-emerald-500 shadow-2xl">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div>
                <h2 className="text-lg font-bold text-emerald-400">DJ Sir Faculty Control Center</h2>
                <p className="text-xs text-slate-400">Manage enrolled student phone numbers and upload Google Drive chapters directly.</p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 text-xs px-3 py-1 rounded-full font-mono">Faculty Access Active (8918444186)</span>
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
                    <select 
                      value={newModule.board}
                      onChange={e => setNewModule({...newModule, board: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg"
                    >
                      <option>ICSE</option>
                      <option>ISC</option>
                      <option>CBSE</option>
                      <option>WBCHSE</option>
                    </select>
                    <select 
                      value={newModule.grade}
                      onChange={e => setNewModule({...newModule, grade: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg"
                    >
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                  </div>
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
                      placeholder="Google Drive PDF (/preview URL)"
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
            <p className="text-[11px] font-medium" style={{ color: theme.subText }}>Digital Learning Ecosystem & AI Tutor • DJ Sir</p>
          </div>
        </div>

        {/* Weekly Theme Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl text-xs flex-wrap">
          <span className="text-[10px] text-slate-500 px-2 font-bold uppercase">Theme:</span>
          {Object.values(ASTRO_THEMES).map(t => (
            <button
              key={t.id}
              onClick={() => setCurrentWeekTheme(t.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${currentWeekTheme === t.id ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {t.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b px-6 py-2 bg-white/50 flex gap-2 overflow-x-auto" style={{ borderColor: theme.border }}>
        {[
          { id: 'classroom', label: 'Classroom & Drive Vault', icon: BookOpen },
          { id: 'aitutor', label: 'DJ Sir AI Tutor', icon: Sparkles },
          { id: 'sangha', label: 'Student Sangha (Chat)', icon: MessageSquare },
          { id: 'sanctuary', label: 'D-Tattva (Calm Zone)', icon: Compass }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isActive ? 'text-white shadow-sm' : 'hover:bg-black/5'}`}
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
                <div className="bg-slate-950 rounded-3xl overflow-hidden aspect-video relative shadow-xl border border-slate-800 flex flex-col justify-between p-6 text-white">
                  <div className="flex justify-between items-center z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                      {activeModule.board} • {activeModule.grade} • {activeModule.chapter}
                    </span>
                    {activeTimestamp && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Playing Milestone: {activeTimestamp.time} ({activeTimestamp.label})
                      </span>
                    )}
                  </div>

                  <div className="my-auto text-center space-y-3 z-10 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-full bg-emerald-600/90 hover:bg-emerald-500 flex items-center justify-center mx-auto shadow-lg cursor-pointer transition-transform hover:scale-105"
                         onClick={() => showToast(`Streaming lecture: ${activeModule.title}`)}>
                      <Play className="w-7 h-7 fill-white text-white ml-0.5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">{activeModule.title}</h3>
                    <p className="text-xs text-slate-300">{activeModule.desc}</p>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 z-10">
                    <span>Mentor: Debajyoti Haldar (DJ Sir)</span>
                    <button
                      onClick={() => setIsDriveModalOpen(true)}
                      className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Open Synced Drive PDF Notes
                    </button>
                  </div>
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
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Video Milestones (Click to Jump):</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModule.timestamps?.map((ts, idx) => {
                        const isCurrentTs = activeTimestamp && activeTimestamp.time === ts.time;
                        return (
                          <button 
                            key={idx}
                            onClick={() => {
                              setActiveTimestamp(ts);
                              showToast(`Jumped to ${ts.time} — ${ts.label}`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${isCurrentTs ? 'bg-emerald-700 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                          >
                            <Play className={`w-3 h-3 ${isCurrentTs ? 'text-white fill-white' : 'text-emerald-600 fill-emerald-600'}`} />
                            <span className={`font-bold font-mono ${isCurrentTs ? 'text-amber-200' : 'text-emerald-700'}`}>{ts.time}</span>
                            <span>{ts.label}</span>
                          </button>
                        );
                      })}
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
                        onClick={() => {
                          setActiveModule(mod);
                          setActiveTimestamp(null);
                        }}
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

        {/* TAB 2: AI TUTOR */}
        {activeTab === 'aitutor' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: theme.text }}>DJ Sir Polyglot AI Tutor</h2>
                    <p className="text-xs text-slate-500">Ask in English, Benglish, বাংলা, or Hinglish — grounded in your vault and live web search.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "SN1 vs SN2 mechanism?",
                    "Why H2SO4 in KMnO4 titration?",
                    "Inert Pair Effect in Thallium?"
                  ].map((sampleQ, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(sampleQ)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                    >
                      {sampleQ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl p-4 rounded-3xl text-xs space-y-3 ${msg.sender === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-slate-50 border rounded-tl-none'}`} style={{ borderColor: theme.border }}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      
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
                            🌐 Live Web Search Grounding:
                          </span>
                          <p className="leading-relaxed">{msg.webInsight}</p>
                        </div>
                      )}

                      {/* Vault Action Button */}
                      {msg.vaultRef && (
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <button 
                            onClick={() => {
                              const target = modules.find(m => m.id === msg.vaultRef.moduleId);
                              if (target) {
                                setActiveModule(target);
                                setActiveTimestamp({ time: msg.vaultRef.videoTime, label: msg.vaultRef.notePage });
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
                  <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-500 animate-pulse">
                    DJ Sir AI is searching notes, curriculum vault, and web sources...
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleAskAi} className="flex gap-2 pt-2 border-t">
                <input 
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ask a question (e.g. SN1 vs SN2 difference or Redox Titration logic)..."
                  className="flex-1 px-4 py-3 bg-[#FAF8F5] border rounded-2xl text-xs outline-none"
                  style={{ borderColor: theme.border }}
                />
                <button 
                  type="submit"
                  className="px-5 py-3 rounded-2xl text-white font-bold text-xs flex items-center gap-1.5 shadow"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Send className="w-3.5 h-3.5" /> Ask
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
                  <p className="text-xs text-slate-500">Collaborate with fellow students across ICSE, ISC, CBSE, and WBCHSE batches.</p>
                </div>
                <button 
                  onClick={() => setIsPostModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow"
                  style={{ backgroundColor: theme.primary }}
                >
                  + Post Question
                </button>
              </div>

              <div className="space-y-3">
                {sanghaPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-2xl bg-slate-50 border space-y-2 text-xs" style={{ borderColor: theme.border }}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">{post.author}</span>
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition-all ${post.likedByMe ? 'bg-rose-100 text-rose-600' : 'bg-white text-slate-600 border'}`}
                      >
                        <Heart className={`w-3 h-3 ${post.likedByMe ? 'fill-rose-600 text-rose-600' : ''}`} /> {post.likes}
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{post.body}</p>
                    {post.facultyReply && (
                      <div className="mt-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                        <span className="font-bold block text-[11px] text-emerald-800">✓ Faculty Verified Answer:</span>
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
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-emerald-600 flex flex-col items-center justify-center mx-auto scale-in shadow-inner bg-emerald-50/40">
                  <span className="text-xs font-bold text-emerald-900">{breathPhase}</span>
                </div>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, pause for 4 seconds before starting numerical or organic practice.
                </p>
              </div>

              {/* Curated Guidance Channels */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Curated Guidance & Motivation Vault (Click to Read):</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {GUIDANCE_VAULT.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => setActiveGuidance(res)}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-white border flex justify-between items-center text-left transition-all shadow-sm"
                      style={{ borderColor: theme.border }}
                    >
                      <div>
                        <h4 className="font-bold text-slate-800">{res.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{res.desc}</p>
                      </div>
                      <BookOpen className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              {activeGuidance && (
                <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-emerald-950 text-sm">{activeGuidance.title}</h4>
                    <button onClick={() => setActiveGuidance(null)} className="text-emerald-800 font-bold">✕</button>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">{activeGuidance.summary}</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Post Doubt Modal (Student Sangha) */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border space-y-4" style={{ borderColor: theme.border }}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800">Post Doubt to Student Sangha</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Doubt Title (e.g. How to identify limiting reagent?)"
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
                style={{ borderColor: theme.border }}
                required
              />
              <textarea
                rows="4"
                placeholder="Explain where you got stuck..."
                value={newPost.body}
                onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
                style={{ borderColor: theme.border }}
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-bold"
                  style={{ backgroundColor: theme.primary }}
                >
                  Publish Doubt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Drive PDF Viewer Modal */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border" style={{ borderColor: theme.border }}>
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{activeModule.title} — Official Drive Note Preview</h3>
                <p className="text-[11px] text-slate-500">{activeModule.board} • {activeModule.grade} • {activeModule.chapter}</p>
              </div>
              <button 
                onClick={() => setIsDriveModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8F5]">
              <div className="p-5 bg-white rounded-2xl border shadow-sm space-y-3" style={{ borderColor: theme.border }}>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">DJ Sir Handwritten & Typed Revision Sheet</span>
                  <span className="text-[11px] font-mono text-slate-400">Drive Vault Verified</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed list-disc pl-4">
                  {(activeModule.noteSummary || [
                    "Complete chapter summary and formula sheet curated by Debajyoti Haldar (DJ Sir)."
                  ]).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="font-bold block">Synced Google Drive Embed URL:</span>
                  <code className="text-[11px] text-amber-800 break-all">{activeModule.driveNoteUrl}</code>
                </div>
                <a 
                  href={activeModule.driveNoteUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow shrink-0"
                >
                  Open Drive Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
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
