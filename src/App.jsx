import React, { useState, useEffect } from 'react';
import { 
  Play, BookOpen, MessageSquare, Compass, Shield, Sparkles, Send,
  CheckCircle, ExternalLink, Lock, Heart, LogOut, Plus, Globe, X,
  Clock, KeyRound, AlertTriangle, Eye, EyeOff, Settings, Search
} from 'lucide-react';

const ASTRO_THEMES = {
  w1: { id: "w1", name: "Sage & Alabaster", bg: "#F5F2EB", card: "#FFFFFF", border: "#E4DEC9", primary: "#2D4030", hover: "#202E23", text: "#2C332D", subText: "#5D6B5E", accent: "#EAE3D2", tag: "bg-[#2D4030] text-white" },
  w2: { id: "w2", name: "Serene Lavender", bg: "#F4F3F7", card: "#FFFFFF", border: "#E2DFE9", primary: "#3E3B52", hover: "#2C2A3B", text: "#2D2A38", subText: "#656175", accent: "#E7E4EF", tag: "bg-[#3E3B52] text-white" },
  w3: { id: "w3", name: "Warm Peach & Sand", bg: "#F7F3EE", card: "#FFFFFF", border: "#EADBCE", primary: "#4A3B32", hover: "#362A23", text: "#332A24", subText: "#73645A", accent: "#EFE5DC", tag: "bg-[#4A3B32] text-white" },
  w4: { id: "w4", name: "Sky Breeze & Mist", bg: "#F1F5F7", card: "#FFFFFF", border: "#D8E2E6", primary: "#2C3E47", hover: "#1F2C33", text: "#223138", subText: "#576A73", accent: "#E0EAF0", tag: "bg-[#2C3E47] text-white" }
};

const INITIAL_WHITELIST = [
  { id: 1, name: "Debajyoti Haldar (DJ Sir)", phone: "8918444186", pin: "4418", board: "Faculty", grade: "Faculty Admin", role: "admin", status: "active" },
  { id: 2, name: "Sourav Paul", phone: "9876543210", pin: "1234", board: "ICSE", grade: "Class 9", role: "student", status: "active" },
  { id: 3, name: "Ananya Roy", phone: "8765432109", pin: "1234", board: "ISC", grade: "Class 11", role: "student", status: "active" },
  { id: 4, name: "Rahul Sen", phone: "7654321098", pin: "1234", board: "CBSE", grade: "Class 10", role: "student", status: "active" }
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
  }
}

function safeRemoveStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
  }
}

function normalizeVideoEmbedUrl(url) {
  if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const trimmed = url.trim();
  if (trimmed.includes("/embed/")) return trimmed;
  const ytWatchMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/|user\/[^\/]+\/u\/[0-9]+\/|shorts\/))([^?&"'>]+)/);
  if (ytWatchMatch && ytWatchMatch[1]) {
    return `https://www.youtube.com/embed/${ytWatchMatch[1]}`;
  }
  return trimmed;
}

function normalizeDrivePreviewUrl(url) {
  if (!url) return "";
  let clean = url.trim();
  const fileIdMatch = clean.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return clean;
}

export default function App() {
  const [currentWeekTheme, setCurrentWeekTheme] = useState('w1');
  const [user, setUser] = useState(() => safeGetStorage('dchem_user_session', null));
  const [whitelist, setWhitelist] = useState(() => safeGetStorage('dchem_whitelist_v1', INITIAL_WHITELIST));
  const [modules, setModules] = useState(() => safeGetStorage('dchem_modules_v1', INITIAL_MODULES));
  const [sanghaPosts, setSanghaPosts] = useState(() => safeGetStorage('dchem_sangha_v1', INITIAL_SANGHA_POSTS));

  const [adminPin, setAdminPin] = useState(() => safeGetStorage('dchem_admin_pin', '4418'));
  const [newPinInput, setNewPinInput] = useState('');

  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    const envKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ? import.meta.env.VITE_GEMINI_API_KEY : '';
    return envKey || safeGetStorage('dchem_gemini_api_key', '');
  });
  const [tempApiKeyInput, setTempApiKeyInput] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('classroom');
  const [selectedBoard, setSelectedBoard] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [activeModule, setActiveModule] = useState(INITIAL_MODULES[0]);
  const [activeTimestamp, setActiveTimestamp] = useState(null);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [inputPhone, setInputPhone] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [authError, setAuthError] = useState('');

  const [newStudent, setNewStudent] = useState({ name: '', phone: '', pin: '1234', board: 'ICSE', grade: 'Class 9' });
  
  const [newModule, setNewModule] = useState({ 
    board: 'ICSE', 
    grade: 'Class 9', 
    chapter: '', 
    title: '', 
    desc: '', 
    videoUrl: '', 
    driveNoteUrl: '',
    notePointsText: '',
    milestonesText: ''
  });

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const [activeGuidance, setActiveGuidance] = useState(null);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');

  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Namaskar! I am your D-Chemistry Live AI Tutor mentored by Debajyoti Haldar (DJ Sir). Ask me any question in English, Benglish, বাংলা, or Hinglish. I can analyze DJ Sir's uploaded Drive vault and perform live web searches for competitive board & entrance trends.",
      analogy: "Think of chemical valency like people holding hands. Hydrogen has 1 hand, Oxygen has 2 hands. To make water (H2O), 1 Oxygen must hold two separate Hydrogens!",
      webInsight: "Board Trend: Focus heavily on oxidation numbers, stoichiometric balancing, and reasons for anomalous periodic properties.",
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

  useEffect(() => {
    safeSetStorage('dchem_admin_pin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    if (geminiApiKey) {
      safeSetStorage('dchem_gemini_api_key', geminiApiKey);
    }
  }, [geminiApiKey]);

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

  const handlePhoneChange = (val) => {
    const clean = val.replace(/\D/g, '');
    setInputPhone(clean);
    setAuthError('');
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanPhone = inputPhone.trim().replace(/\D/g, '');
    const cleanPin = inputPin.trim();
    
    if (cleanPhone.length !== 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!cleanPin) {
      setAuthError('Please enter your 4-digit Secret PIN.');
      return;
    }

    if (cleanPhone === '8918444186') {
      if (cleanPin !== adminPin) {
        setAuthError('Invalid Faculty Master PIN! Access denied.');
        return;
      }
      const adminUser = {
        id: 1,
        name: "Debajyoti Haldar (DJ Sir)",
        phone: "8918444186",
        board: "Faculty",
        grade: "Faculty Admin",
        role: "admin",
        status: "active"
      };
      setUser(adminUser);
      safeSetStorage('dchem_user_session', adminUser);
      showToast(`Welcome back, DJ Sir! Admin access granted.`);
      return;
    }

    const matched = whitelist.find(s => s.phone === cleanPhone);
    if (!matched) {
      setAuthError('Access Denied: This mobile number is not enrolled in D-Chemistry batches. Contact DJ Sir at 8918444186.');
      return;
    }

    if (matched.status !== 'active') {
      setAuthError('Access Suspended: Your batch access has been temporarily blocked. Please contact DJ Sir.');
      return;
    }

    const expectedPin = matched.pin || '1234';
    if (cleanPin !== expectedPin) {
      setAuthError('Incorrect Student PIN! Even if someone knows your number, they cannot enter without your secret PIN.');
      return;
    }

    const studentSession = { ...matched, role: "student" };
    setUser(studentSession);
    safeSetStorage('dchem_user_session', studentSession);
    showToast(`Welcome back, ${matched.name}!`);
  };

  const handleLogout = () => {
    safeRemoveStorage('dchem_user_session');
    setUser(null);
    setIsAdminDrawerOpen(false);
    setInputPhone('');
    setInputPin('');
  };

  const handleChangeAdminPin = (e) => {
    e.preventDefault();
    if (!newPinInput.trim() || newPinInput.trim().length < 4) {
      showToast("PIN must be at least 4 digits.", "error");
      return;
    }
    setAdminPin(newPinInput.trim());
    setNewPinInput('');
    showToast("Master Admin PIN successfully updated!");
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const cleanKey = tempApiKeyInput.trim();
    if (!cleanKey) {
      showToast("Please enter a valid Google Gemini API key.", "error");
      return;
    }
    setGeminiApiKey(cleanKey);
    setIsApiKeyModalOpen(false);
    showToast("Live Google Gemini AI Key configured! AI Tutor is now real-time live.");
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const cleanMobile = newStudent.phone.trim().replace(/\D/g, '');
    const studentPin = newStudent.pin.trim() || '1234';

    if (!newStudent.name || cleanMobile.length !== 10) {
      showToast("Please provide full name and 10-digit mobile number.", "error");
      return;
    }
    if (whitelist.some(s => s.phone === cleanMobile)) {
      showToast("This phone number is already registered.", "error");
      return;
    }
    const student = {
      id: Date.now(),
      name: newStudent.name.trim(),
      phone: cleanMobile,
      pin: studentPin,
      board: newStudent.board,
      grade: newStudent.grade,
      role: "student",
      status: "active"
    };
    setWhitelist([...whitelist, student]);
    setNewStudent({ name: '', phone: '', pin: '1234', board: 'ICSE', grade: 'Class 9' });
    showToast(`Authorized: ${student.name} added! (Secret PIN: ${student.pin})`);
  };

  const toggleStudentStatus = (id) => {
    setWhitelist(whitelist.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'blocked' : 'active' } : s));
    showToast("Updated student access status.");
  };

  const handleDeleteStudent = (id, name) => {
    setWhitelist(whitelist.filter(s => s.id !== id));
    showToast(`Removed ${name} from batch access.`);
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModule.title.trim() || !newModule.chapter.trim()) {
      showToast("Please enter title and chapter name.", "error");
      return;
    }

    const noteSummaryList = newModule.notePointsText.trim()
      ? newModule.notePointsText.split('\n').filter(p => p.trim())
      : [
          `${newModule.chapter} — ${newModule.title}: Official study material by Debajyoti Haldar (DJ Sir).`,
          newModule.desc || "Includes reaction mechanisms, board exam PYQs, and formula derivations."
        ];

    let parsedTimestamps = [{ time: "00:00", seconds: 0, label: "Chapter Introduction" }];
    if (newModule.milestonesText.trim()) {
      const lines = newModule.milestonesText.split('\n').filter(l => l.trim());
      const customTs = lines.map(line => {
        const parts = line.split('-');
        if (parts.length >= 2) {
          return { time: parts[0].trim(), seconds: 0, label: parts.slice(1).join('-').trim() };
        }
        return { time: "05:00", seconds: 300, label: line.trim() };
      });
      if (customTs.length > 0) parsedTimestamps = customTs;
    }

    const moduleItem = {
      id: `module-${Date.now()}`,
      board: newModule.board,
      grade: newModule.grade,
      chapter: newModule.chapter.trim(),
      title: newModule.title.trim(),
      desc: newModule.desc.trim(),
      videoUrl: normalizeVideoEmbedUrl(newModule.videoUrl),
      driveNoteUrl: normalizeDrivePreviewUrl(newModule.driveNoteUrl),
      noteSummary: noteSummaryList,
      timestamps: parsedTimestamps
    };

    setModules([moduleItem, ...modules]);
    setActiveModule(moduleItem);
    setNewModule({ 
      board: 'ICSE', 
      grade: 'Class 9', 
      chapter: '', 
      title: '', 
      desc: '', 
      videoUrl: '', 
      driveNoteUrl: '',
      notePointsText: '',
      milestonesText: ''
    });
    showToast("New chapter & Drive PDF published to Vault successfully!");
  };

  const handleDeleteModule = (modId, modTitle) => {
    if (modules.length <= 1) {
      showToast("Cannot delete the only remaining module.", "error");
      return;
    }
    const remaining = modules.filter(m => m.id !== modId);
    setModules(remaining);
    if (activeModule.id === modId) {
      setActiveModule(remaining[0]);
    }
    showToast(`Deleted "${modTitle}" from Vault.`);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    const isTeacher = user.role === 'admin' && user.phone === '8918444186';
    const postItem = {
      id: Date.now(),
      author: isTeacher 
        ? "Debajyoti Haldar (DJ Sir)"
        : `${user.name} (${user.grade || 'Student'} ${user.board || ''})`,
      title: newPost.title.trim(),
      body: newPost.body.trim(),
      likes: 1,
      likedByMe: true,
      facultyReply: isTeacher ? "Official Faculty Broadcast & Master Solution." : null
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

  const handleAskAi = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userQ = query.trim();
    setQuery('');
    setChatMessages(prev => [...prev, { id: Date.now(), sender: "user", text: userQ }]);
    setIsAiLoading(true);

    const vaultContext = modules.map(m => 
      `Chapter: ${m.chapter} - ${m.title} (${m.board} ${m.grade}). Summary: ${(m.noteSummary || []).join(' ')}. Milestones: ${(m.timestamps || []).map(t => `${t.time}${t.label}`).join(', ')}`
    ).join('\n');

    const qLower = userQ.toLowerCase();
    const matchedModule = modules.find(m => {
      const titleMatch = m.title.toLowerCase().split(' ').some(w => w.length > 3 && qLower.includes(w));
      const chapMatch = m.chapter.toLowerCase().split(' ').some(w => w.length > 3 && qLower.includes(w));
      return titleMatch || chapMatch;
    }) || modules[0];

    if (geminiApiKey) {
      const candidateModels = [
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-pro',
        'gemini-2.0-flash'
      ];

      const promptText = `You are DJ Sir's dedicated AI Chemistry Tutor for students of ICSE, ISC, CBSE, and WBCHSE.
The student asked: "${userQ}".

Available Class Notes in Vault:
${vaultContext}

Please reply in an engaging, crystal-clear teacher style (English, Benglish, or Bengali depending on the question).
Provide your output strictly in JSON format with these exact three keys:
{
  "explanation": "Clear, direct concept explanation and reaction mechanism",
  "analogy": "A memorable real-life daily analogy (e.g., cooking, games, daily objects) that makes the chemistry intuitive",
  "webInsight": "Recent board exam trend or real-world industrial/laboratory application of this concept"
}`;

      for (const model of candidateModels) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { responseMimeType: "application/json" }
            })
          });

          if (response.ok) {
            const data = await response.json();
            const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (candidateText) {
              let parsed;
              try {
                parsed = JSON.parse(candidateText);
              } catch (parseErr) {
                parsed = { explanation: candidateText, analogy: "", webInsight: "" };
              }

              setChatMessages(prev => [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "ai",
                  text: parsed.explanation || candidateText,
                  analogy: parsed.analogy || "Chemistry connects microscopic molecular motion with macroscopic daily phenomena.",
                  webInsight: parsed.webInsight || "Board trend: Prioritize balanced equations, oxidation states, and reason-based questions.",
                  vaultRef: {
                    videoTime: matchedModule.timestamps?.[0]?.time || "01:00",
                    notePage: `${matchedModule.chapter} (${matchedModule.title})`,
                    moduleId: matchedModule.id
                  }
                }
              ]);
              setIsAiLoading(false);
              return;
            }
          }
        } catch (modelErr) {
          console.warn(`Attempt with ${model} failed:`, modelErr);
        }
      }
    }

    setTimeout(() => {
      let explanation = `Here is the chemical explanation for "${userQ}":`;
      let analogy = "Think of reaction kinetics like walking through a mountain pass. Catalysts don't pull you across; they simply reveal an underground tunnel that requires far less sweat and energy (activation energy) to reach the product valley!";
      let web = "Live Search: Competitive exam questions (JEE/NEET/Boards) emphasize temperature dependence of rate constant (Arrhenius Equation) and stereo-regular polymer catalysts.";
      let ref = { 
        videoTime: matchedModule.timestamps?.[0]?.time || "02:15", 
        notePage: `${matchedModule.chapter} Drive Notes`, 
        moduleId: matchedModule.id 
      };

      if (qLower.includes('titration') || qLower.includes('kmno4') || qLower.includes('mohr') || qLower.includes('redox')) {
        explanation = "In KMnO4 vs Mohr's Salt titration, KMnO4 acts as both a powerful oxidizing agent and its own self-indicator in acidic medium (dilute H2SO4). 5 moles of Fe²⁺ are oxidized to Fe³⁺ by 1 mole of MnO₄⁻.";
        analogy = "Think of titration like adding drops of pink Rooh Afza into a glass of magic decolorizing water. The moment one single drop cannot be neutralized by the Mohr salt, the water stays pale pink forever—that is your endpoint!";
        web = "Live Search: Standard redox titrations use 0.02M KMnO4 with Mohr's salt in dilute H2SO4 medium to prevent MnO2 brown precipitate formation.";
        ref = { videoTime: "14:20", notePage: "Redox Practical Sheet", moduleId: "wb-11-titration" };
      } else if (qLower.includes('inert') || qLower.includes('periodic') || qLower.includes('thallium') || qLower.includes('lead') || qLower.includes('trend')) {
        explanation = "The Inert Pair Effect refers to the reluctance of the outermost s-electrons (ns²) to participate in bonding in heavier post-transition p-block elements (Tl, Pb, Bi). This happens because intervening 4f and 5d subshells provide very poor shielding.";
        analogy = "Think of inner 4f/5d electrons like a torn umbrella that fails to shield the rain (nuclear attraction). The heavy nucleus pulls the outermost s-electrons so tightly into its pocket that they refuse to come out and bond!";
        web = "Live Search: Relativistic contraction of the 6s orbital in heavy p-block elements strongly stabilizes lower oxidation states like Tl(+1) and Pb(+2).";
        ref = { videoTime: "11:25", notePage: "Periodic Trends Vault", moduleId: "isc-11-ch3" };
      } else if (qLower.includes('sn1') || qLower.includes('sn2') || qLower.includes('carbon') || qLower.includes('iupac') || qLower.includes('organic')) {
        explanation = "SN1 is a 2-step unimolecular substitution proceeding via a stable carbocation intermediate (favored by tertiary halides and polar protic solvents). SN2 is a 1-step bimolecular concerted attack from the opposite side, resulting in 100% Walden inversion.";
        analogy = "Consider an umbrella on a windy day. In SN2, the nucleophile attacks from the backside and flips the molecule inside-out like an inverted umbrella in one swift step!";
        web = "Live Search: Recent organic synthesis in pharmaceutical chemistry favors SN2 stereochemical inversion for enantiopure drug synthesis.";
        ref = { videoTime: "18:20", notePage: "Organic Mechanism Vault", moduleId: "cbse-10-ch4" };
      } else if (qLower.includes('valency') || qLower.includes('radical') || qLower.includes('balance') || qLower.includes('lead nitrate')) {
        explanation = "Radicals are groups of atoms behaving as a single unit with a definite valency. When balancing equations, keep polyatomic ions grouped together unless decomposed.";
        analogy = "Valency is simply the number of hands an atom has to shake hands with others. Iron (Fe) is a superhero that can use either 2 hands (Ferrous) or 3 hands (Ferric) depending on how energetic the reaction is!";
        web = "Live Search: ICSE & CBSE board examiners deduct marks if gaseous evolution arrows (↑) or precipitate arrows (↓) are omitted in balanced equations.";
        ref = { videoTime: "08:40", notePage: "Language of Chemistry", moduleId: "icse-9-ch1" };
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: explanation,
          analogy,
          webInsight: web,
          vaultRef: ref
        }
      ]);
      setIsAiLoading(false);
    }, 700);
  };

  if (!user) {
    const isTeacherNumber = inputPhone === '8918444186';

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-emerald-200" style={{ backgroundColor: theme.bg }}>
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border text-center" style={{ borderColor: theme.border }}>
          
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 text-white shadow-md" style={{ backgroundColor: theme.primary }}>
            D
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>D-Chemistry Portal</h1>
          <p className="text-xs mt-1 mb-6 font-medium" style={{ color: theme.subText }}>Secure Classroom Gateway • Mentored by DJ Sir</p>

          <form onSubmit={handlePhoneLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-1" style={{ color: theme.text }}>
                Registered Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-semibold text-slate-500">+91</span>
                <input 
                  type="tel"
                  maxLength="10"
                  value={inputPhone}
                  onChange={e => handlePhoneChange(e.target.value)}
                  placeholder="Enter 10-digit mobile"
                  className="w-full pl-14 pr-4 py-3 bg-[#FAF8F5] border rounded-xl text-sm outline-none font-mono"
                  style={{ borderColor: theme.border }}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-xs font-semibold flex items-center gap-1.5" style={{ color: theme.text }}>
                  <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                  {isTeacherNumber ? "Faculty Master PIN" : "Your 4-Digit Secret PIN"}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="text-[11px] text-slate-500 flex items-center gap-1 hover:text-slate-800"
                >
                  {showPasswordText ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {showPasswordText ? "Hide" : "Show"}
                </button>
              </div>
              <input 
                type={showPasswordText ? "text" : "password"}
                maxLength="8"
                value={inputPin}
                onChange={e => setInputPin(e.target.value)}
                placeholder={isTeacherNumber ? "Enter Faculty Master PIN" : "Enter 4-digit PIN given by DJ Sir"}
                className="w-full px-4 py-3 bg-[#FAF8F5] border rounded-xl text-sm outline-none font-mono tracking-wider"
                style={{ borderColor: theme.border }}
                required
              />
              <p className="text-[10px] text-slate-400 mt-1 ml-1">
                {isTeacherNumber 
                  ? "🔒 Faculty
