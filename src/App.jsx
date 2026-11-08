import React, { useState, useEffect } from 'react';
import { 
  Play, BookOpen, MessageSquare, Compass, Shield, Sparkles, Send,
  HelpCircle, ChevronRight, CheckCircle, ExternalLink, RefreshCw, 
  Search, Lock, Heart, LogOut, Plus, Trash2, Key, KeyRound, AlertCircle, Eye, EyeOff
} from 'lucide-react';

const ASTRO_THEMES = {
  w1: { id: "w1", name: "Sage & Alabaster", bg: "#F5F2EB", card: "#FFFFFF", border: "#E4DEC9", primary: "#2D4030", hover: "#202E23", text: "#2C332D", subText: "#5D6B5E", accent: "#EAE3D2" },
  w2: { id: "w2", name: "Serene Lavender", bg: "#F4F3F7", card: "#FFFFFF", border: "#E2DFE9", primary: "#3E3B52", hover: "#2C2A3B", text: "#2D2A38", subText: "#656175", accent: "#E7E4EF" },
  w3: { id: "w3", name: "Warm Peach & Sand", bg: "#F7F3EE", card: "#FFFFFF", border: "#EADBCE", primary: "#4A3B32", hover: "#362A23", text: "#332A24", subText: "#73645A", accent: "#EFE5DC" },
  w4: { id: "w4", name: "Sky Breeze & Mist", bg: "#F1F5F7", card: "#FFFFFF", border: "#D8E2E6", primary: "#2C3E47", hover: "#1F2C33", text: "#223138", subText: "#576A73", accent: "#E0EAF0" }
};

const DJ_PHONE = "8918444186";

export default function DChemistryApp() {
  const [currentWeekTheme, setCurrentWeekTheme] = useState('w1');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dchem_user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [masterPin, setMasterPin] = useState(() => {
    return localStorage.getItem('dchem_master_pin') || '4418';
  });

  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    let envKey = '';
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
        envKey = import.meta.env.VITE_GEMINI_API_KEY;
      }
    } catch (e) {
      envKey = '';
    }
    return localStorage.getItem('dchem_gemini_api_key') || envKey || '';
  });

  const [whitelist, setWhitelist] = useState(() => {
    const saved = localStorage.getItem('dchem_whitelist_real_v1');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: "Debajyoti Haldar (DJ Sir)", phone: DJ_PHONE, pin: "4418", board: "Faculty", grade: "Faculty Admin", role: "admin", status: "active" }
    ];
  });

  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('dchem_modules_real_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [forumPosts, setForumPosts] = useState(() => {
    const saved = localStorage.getItem('dchem_forum_posts_real_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('classroom');
  const [selectedBoard, setSelectedBoard] = useState('ALL');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [activeModule, setActiveModule] = useState(null);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  // Login Form States
  const [inputPhone, setInputPhone] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Admin New Student Form
  const [newStudent, setNewStudent] = useState({ name: '', phone: '', pin: '', board: 'ICSE', grade: 'Class 9' });

  // Admin New Module Form
  const [newModule, setNewModule] = useState({ 
    board: 'ICSE', 
    grade: 'Class 9', 
    chapter: '', 
    title: '', 
    desc: '', 
    videoUrl: '', 
    driveNoteUrl: '',
    milestonesText: ''
  });

  // Admin Settings
  const [newPinInput, setNewPinInput] = useState('');
  const [geminiKeyInput, setGeminiKeyInput] = useState('');

  // AI Tutor State
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Namaskar! I am your D-Chemistry AI Tutor. Ask me any question in English, Benglish, বাংলা, or Hinglish. I explain mechanisms using real-life daily analogies, live chemistry insights, and DJ Sir\'s exact class notes.",
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Student Sangha Forum Input
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isPostingQuestion, setIsPostingQuestion] = useState(false);
  const [replyTextMap, setReplyTextMap] = useState({});

  const theme = ASTRO_THEMES[currentWeekTheme] || ASTRO_THEMES.w1;

  useEffect(() => {
    localStorage.setItem('dchem_whitelist_real_v1', JSON.stringify(whitelist));
  }, [whitelist]);

  useEffect(() => {
    localStorage.setItem('dchem_modules_real_v1', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('dchem_forum_posts_real_v1', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    if (!activeModule && modules.length > 0) {
      setActiveModule(modules[0]);
    }
  }, [modules, activeModule]);

  // Format Drive & YouTube URLs safely
  const formatDriveUrl = (url) => {
    if (!url) return '';
    if (url.includes('/preview')) return url;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  const formatVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanPhone = inputPhone.trim().replace(/\D/g, '');
    const cleanPin = inputPin.trim();

    if (cleanPhone.length !== 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!cleanPin) {
      setAuthError('Please enter your 4-digit PIN.');
      return;
    }

    if (cleanPhone === DJ_PHONE) {
      if (cleanPin === masterPin) {
        const facultyUser = {
          name: "Debajyoti Haldar (DJ Sir)",
          phone: DJ_PHONE,
          role: "admin",
          grade: "Faculty Admin",
          board: "Faculty",
          status: "active"
        };
        setUser(facultyUser);
        localStorage.setItem('dchem_user_session', JSON.stringify(facultyUser));
        return;
      } else {
        setAuthError('Incorrect Faculty Master PIN. Access Denied.');
        return;
      }
    }

    const matched = whitelist.find(s => s.phone === cleanPhone);
    if (!matched) {
      setAuthError('Access Denied: This number is not registered in D-Chemistry batches. Contact DJ Sir at 8918444186.');
      return;
    }
    if (matched.status === 'blocked') {
      setAuthError('Access Suspended: Batch enrollment paused. Please contact DJ Sir.');
      return;
    }
    if (matched.pin && matched.pin !== cleanPin) {
      setAuthError('Incorrect Student PIN. Please check the PIN provided by DJ Sir.');
      return;
    }

    setUser(matched);
    localStorage.setItem('dchem_user_session', JSON.stringify(matched));
  };

  const handleLogout = () => {
    localStorage.removeItem('dchem_user_session');
    setUser(null);
  };

  // Add Authorized Student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const cleanPhone = newStudent.phone.trim().replace(/\D/g, '');
    const cleanPin = newStudent.pin.trim() || Math.floor(1000 + Math.random() * 9000).toString();

    if (!newStudent.name.trim() || cleanPhone.length !== 10) {
      alert("Please provide student's full name and a valid 10-digit phone number.");
      return;
    }

    if (whitelist.some(s => s.phone === cleanPhone)) {
      alert("This mobile number is already registered!");
      return;
    }

    const studentObj = {
      id: Date.now(),
      name: newStudent.name.trim(),
      phone: cleanPhone,
      pin: cleanPin,
      board: newStudent.board,
      grade: newStudent.grade,
      role: "student",
      status: "active",
      enrolledAt: new Date().toLocaleDateString('en-GB')
    };

    setWhitelist([studentObj, ...whitelist]);
    setNewStudent({ name: '', phone: '', pin: '', board: 'ICSE', grade: 'Class 9' });
    alert(`Success: ${studentObj.name} authorized! Registered PIN is: ${studentObj.pin}`);
  };

  const toggleStudentStatus = (id) => {
    setWhitelist(whitelist.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'blocked' : 'active' } : s));
  };

  const removeStudent = (id) => {
    if (window.confirm("Remove this student permanently from D-Chemistry roster?")) {
      setWhitelist(whitelist.filter(s => s.id !== id));
    }
  };

  // Add Chapter Module
  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModule.title || !newModule.chapter) {
      alert("Please enter chapter name and topic title.");
      return;
    }

    const parsedTimestamps = [];
    if (newModule.milestonesText.trim()) {
      newModule.milestonesText.split('\n').forEach(line => {
        const parts = line.split('-');
        if (parts.length >= 2) {
          parsedTimestamps.push({ time: parts[0].trim(), label: parts.slice(1).join('-').trim() });
        }
      });
    }

    const moduleItem = {
      id: `module-${Date.now()}`,
      board: newModule.board,
      grade: newModule.grade,
      chapter: newModule.chapter.trim(),
      title: newModule.title.trim(),
      desc: newModule.desc.trim(),
      videoUrl: formatVideoUrl(newModule.videoUrl.trim()),
      driveNoteUrl: formatDriveUrl(newModule.driveNoteUrl.trim()),
      timestamps: parsedTimestamps.length > 0 ? parsedTimestamps : [{ time: "00:00", label: "Lecture Introduction" }],
      createdAt: new Date().toLocaleDateString('en-GB')
    };

    setModules([moduleItem, ...modules]);
    if (!activeModule) setActiveModule(moduleItem);

    setNewModule({ 
      board: 'ICSE', 
      grade: 'Class 9', 
      chapter: '', 
      title: '', 
      desc: '', 
      videoUrl: '', 
      driveNoteUrl: '',
      milestonesText: ''
    });
    alert("New module published to Vault successfully!");
  };

  const removeModule = (id) => {
    if (window.confirm("Are you sure you want to remove this chapter from the vault?")) {
      const remaining = modules.filter(m => m.id !== id);
      setModules(remaining);
      if (activeModule?.id === id) {
        setActiveModule(remaining[0] || null);
      }
    }
  };

  // Change Faculty Master PIN
  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      alert("PIN must be at least 4 digits.");
      return;
    }
    setMasterPin(newPinInput);
    localStorage.setItem('dchem_master_pin', newPinInput);
    setNewPinInput('');
    alert("Faculty Master PIN updated successfully!");
  };

  // Save Gemini Key
  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    if (!geminiKeyInput.trim()) return;
    setGeminiApiKey(geminiKeyInput.trim());
    localStorage.setItem('dchem_gemini_api_key', geminiKeyInput.trim());
    setGeminiKeyInput('');
    alert("Live Gemini API Key saved!");
  };

  // AI Tutor Ask
  const handleAskAi = async (e) => {
    e.preventDefault();
    if (!query.trim() || isAiLoading) return;

    const userQ = query.trim();
    setQuery('');
    setChatMessages(prev => [...prev, { id: Date.now(), sender: "user", text: userQ }]);
    setIsAiLoading(true);

    try {
      if (geminiApiKey) {
        const prompt = `You are DJ Sir's D-Chemistry AI Tutor. The student asks: "${userQ}".
        Please answer clearly and concisely in the student's language (English, Benglish, or Bengali) with:
        1. Direct Chemistry Explanation & Reaction Mechanism.
        2. Daily Real-life Analogy (e.g. kitchen, sports, daily life).
        3. Board/Competitive exam tip or key formula to remember.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (reply) {
          setChatMessages(prev => [...prev, {
            id: Date.now() + 1,
            sender: "ai",
            text: reply,
            isLiveGemini: true
          }]);
          setIsAiLoading(false);
          return;
        }
      }

      // Offline / Fallback chemistry logic
      setTimeout(() => {
        let text = `Explanation for "${userQ}": In chemistry, equilibrium and reaction kinetics govern how molecules interact. Break down the reactants into their oxidation states and balance mass and charge first.`;
        let analogy = "Think of dynamic equilibrium like walking up a downward escalator at the exact same speed—you appear still, but both forward and backward actions are happening constantly!";
        
        if (userQ.toLowerCase().includes('titration') || userQ.toLowerCase().includes('kmno4')) {
          text = "Redox Titration involves transfer of electrons. In KMnO4 titration against Mohr's Salt, MnO4- acts as a self-indicator, changing from deep purple to colorless until endpoint gives permanent pale pink.";
          analogy = "Like adding squash concentrate to water: as long as water can absorb it, color disappears; once saturated, one extra drop colors the entire glass permanently.";
        } else if (userQ.toLowerCase().includes('sn1') || userQ.toLowerCase().includes('sn2')) {
          text = "SN1 occurs in 2 steps via a planar carbocation intermediate (racemization). SN2 occurs in a single concerted step via backside attack (Walden inversion).";
          analogy = "SN2 is like an umbrella flipping inside-out on a stormy day in one sudden gust of wind!";
        }

        setChatMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: "ai",
          text,
          analogy
        }]);
        setIsAiLoading(false);
      }, 700);

    } catch (err) {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "ai",
        text: `Here is the explanation for "${userQ}": Balance atoms and valence electrons systematically. Ensure you check periodic trends and radical valencies. (Note: Add Gemini Key in Admin panel for live web-connected answers).`
      }]);
      setIsAiLoading(false);
    }
  };

  // Add Forum Question
  const handlePostForumQuestion = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postBody.trim()) return;

    const newPost = {
      id: Date.now(),
      author: `${user.name} (${user.grade})`,
      title: postTitle.trim(),
      body: postBody.trim(),
      likes: 1,
      createdAt: "Just now",
      replies: []
    };

    setForumPosts([newPost, ...forumPosts]);
    setPostTitle('');
    setPostBody('');
    setIsPostingQuestion(false);
  };

  // Add Reply to Forum Question
  const handleAddReply = (postId) => {
    const replyText = replyTextMap[postId];
    if (!replyText || !replyText.trim()) return;

    setForumPosts(forumPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...(p.replies || []),
            {
              author: user.phone === DJ_PHONE ? "Debajyoti Haldar (DJ Sir) [Faculty]" : `${user.name} (${user.grade})`,
              text: replyText.trim(),
              isFaculty: user.phone === DJ_PHONE
            }
          ]
        };
      }
      return p;
    }));

    setReplyTextMap({ ...replyTextMap, [postId]: '' });
  };

  // Filter modules
  const filteredModules = modules.filter(m => {
    const matchBoard = selectedBoard === 'ALL' || m.board === selectedBoard;
    const matchGrade = selectedGrade === 'ALL' || m.grade === selectedGrade;
    return matchBoard && matchGrade;
  });

  // Render Login Gatekeeper if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-emerald-200" style={{ backgroundColor: theme.bg }}>
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border text-center" style={{ borderColor: theme.border }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 text-white shadow-md" style={{ backgroundColor: theme.primary }}>
            D
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.text }}>D-Chemistry Portal</h1>
          <p className="text-xs mt-1 mb-6 font-medium" style={{ color: theme.subText }}>Mentored by Debajyoti Haldar (DJ Sir)</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
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
                  onChange={e => setInputPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-14 pr-4 py-3 bg-[#FAF8F5] border rounded-xl text-sm outline-none font-mono focus:ring-2 focus:ring-emerald-700/20"
                  style={{ borderColor: theme.border }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-1" style={{ color: theme.text }}>
                {inputPhone === DJ_PHONE ? "Faculty Master PIN" : "4-Digit Secret PIN"}
              </label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input 
                  type={showPin ? "text" : "password"}
                  maxLength="8"
                  value={inputPin}
                  onChange={e => setInputPin(e.target.value)}
                  placeholder={inputPhone === DJ_PHONE ? "Enter Faculty Master PIN" : "Enter your 4-digit PIN"}
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border rounded-xl text-sm outline-none font-mono focus:ring-2 focus:ring-emerald-700/20"
                  style={{ borderColor: theme.border }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
              style={{ backgroundColor: theme.primary }}
            >
              Verify & Enter Classroom →
            </button>
          </form>

          <div className="mt-8 p-3.5 bg-amber-50/90 rounded-2xl border border-amber-200/80 text-left text-[11px] text-amber-900 leading-relaxed flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Strictly Private Batch Platform.</strong> Entry is restricted to students registered under DJ Sir with an authorized PIN. For admission or PIN assistance, contact <strong>8918444186</strong>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-emerald-200 flex flex-col" style={{ backgroundColor: theme.bg, color: theme.text }}>
      
      {/* Top Session Bar */}
      <div className="text-white text-xs px-4 py-2 flex justify-between items-center shadow-inner" style={{ backgroundColor: theme.primary }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Active Session: <strong>{user.name}</strong> ({user.grade || 'Faculty'})</span>
        </div>
        <div className="flex items-center gap-4">
          {user.phone === DJ_PHONE && (
            <button 
              onClick={() => setIsAdminDrawerOpen(!isAdminDrawerOpen)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1 rounded-lg text-[11px] shadow transition-all flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              {isAdminDrawerOpen ? 'Close Faculty Admin' : '⚡ DJ Sir Faculty Admin'}
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-1 text-slate-200 hover:text-white underline">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Admin Panel Drawer */}
      {isAdminDrawerOpen && user.phone === DJ_PHONE && (
        <div className="bg-slate-900 text-slate-100 p-6 border-b-4 border-emerald-500 shadow-2xl">
          <div className="max-w-7xl mx-auto space-y-6">
            
            <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> DJ Sir Faculty Control Center
                </h2>
                <p className="text-xs text-slate-400">Authorize enrolled student phone numbers, issue secret PINs, and upload Drive lecture vaults.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Change PIN Box */}
                <form onSubmit={handleSavePin} className="flex items-center gap-1.5 bg-slate-800 px-2 py-1.5 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-300">Master PIN:</span>
                  <input 
                    type="password"
                    maxLength="8"
                    placeholder="New PIN"
                    value={newPinInput}
                    onChange={e => setNewPinInput(e.target.value)}
                    className="w-20 bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-600 outline-none font-mono"
                  />
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded">Save</button>
                </form>

                {/* Connect Live Gemini Key */}
                <form onSubmit={handleSaveGeminiKey} className="flex items-center gap-1.5 bg-slate-800 px-2 py-1.5 rounded-xl border border-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <input 
                    type="password"
                    placeholder="Gemini API Key"
                    value={geminiKeyInput}
                    onChange={e => setGeminiKeyInput(e.target.value)}
                    className="w-28 bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-600 outline-none font-mono"
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                    {geminiApiKey ? 'Updated' : 'Connect'}
                  </button>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Whitelist Roster & PIN Manager */}
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" /> Student Whitelist Roster ({whitelist.filter(s => s.role === 'student').length})
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-mono">PIN-Gated</span>
                </div>

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
                  <div className="grid grid-cols-3 gap-2">
                    <select 
                      value={newStudent.board}
                      onChange={e => setNewStudent({...newStudent, board: e.target.value})}
                      className="bg-slate-700 text-white text-xs px-2 py-2 rounded-lg"
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
                      className="bg-slate-700 text-white text-xs px-2 py-2 rounded-lg"
                    >
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                    <input 
                      type="text"
                      maxLength="6"
                      placeholder="PIN (e.g. 1234)"
                      value={newStudent.pin}
                      onChange={e => setNewStudent({...newStudent, pin: e.target.value})}
                      className="bg-slate-700 text-white text-xs px-2 py-2 rounded-lg outline-none font-mono"
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-lg shadow transition-all">
                    + Authorize Student Number & PIN
                  </button>
                </form>

                {/* Whitelist Display */}
                <div className="mt-4 max-h-56 overflow-y-auto space-y-2 pr-1">
                  {whitelist.filter(s => s.role === 'student').length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-xl">
                      No students authorized yet. Add your enrolled batch students above.
                    </div>
                  ) : (
                    whitelist.filter(s => s.role === 'student').map(st => (
                      <div key={st.id} className="flex justify-between items-center bg-slate-900/90 px-3 py-2 rounded-xl text-xs border border-slate-800">
                        <div>
                          <span className="font-semibold text-white">{st.name}</span>
                          <span className="text-slate-400 ml-2 font-mono text-[11px]">{st.phone}</span>
                          <span className="ml-2 text-[10px] bg-amber-950 text-amber-300 font-mono px-1.5 py-0.5 rounded border border-amber-800">
                            PIN: {st.pin}
                          </span>
                          <span className="ml-1.5 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">{st.board} {st.grade}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => toggleStudentStatus(st.id)}
                            className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-all ${st.status === 'active' ? 'bg-rose-950 text-rose-300 hover:bg-rose-900' : 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900'}`}
                          >
                            {st.status === 'active' ? 'Block' : 'Unblock'}
                          </button>
                          <button 
                            onClick={() => removeStudent(st.id)}
                            className="text-slate-400 hover:text-rose-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Upload Chapter Module */}
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" /> Upload New Drive Module
                </h3>
                <form onSubmit={handleAddModule} className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    <select 
                      value={newModule.board}
                      onChange={e => setNewModule({...newModule, board: e.target.value})}
                      className="bg-slate-700 text-white px-2 py-2 rounded-lg"
                    >
                      <option>ICSE</option>
                      <option>ISC</option>
                      <option>CBSE</option>
                      <option>WBCHSE</option>
                    </select>
                    <select 
                      value={newModule.grade}
                      onChange={e => setNewModule({...newModule, grade: e.target.value})}
                      className="bg-slate-700 text-white px-2 py-2 rounded-lg"
                    >
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                    <input 
                      type="text"
                      placeholder="Chapter (e.g. Ch 1)"
                      value={newModule.chapter}
                      onChange={e => setNewModule({...newModule, chapter: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                      required
                    />
                  </div>

                  <input 
                    type="text"
                    placeholder="Topic Title (e.g. Periodic Table & Chemical Bonding)"
                    value={newModule.title}
                    onChange={e => setNewModule({...newModule, title: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                    required
                  />

                  <input 
                    type="text"
                    placeholder="Short Description / Key Concepts"
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
                      placeholder="YouTube Video URL"
                      value={newModule.videoUrl}
                      onChange={e => setNewModule({...newModule, videoUrl: e.target.value})}
                      className="bg-slate-700 text-white px-3 py-2 rounded-lg outline-none"
                    />
                  </div>

                  <textarea 
                    rows="2"
                    placeholder="Key Milestones (One per line: 02:15 - Periodic Trends)"
                    value={newModule.milestonesText}
                    onChange={e => setNewModule({...newModule, milestonesText: e.target.value})}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg outline-none text-xs"
                  />

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg shadow transition-all">
                    + Publish Module to Vault
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Header */}
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

        {/* Astro Theme Selector */}
        <div className="flex items-center gap-2 bg-slate-100/90 p-1 rounded-xl text-xs">
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

      {/* Nav Tabs */}
      <div className="border-b px-6 py-2 bg-white/50 flex gap-2 overflow-x-auto" style={{ borderColor: theme.border }}>
        {[
          { id: 'classroom', label: 'Classroom & Drive Vault', icon: BookOpen },
          { id: 'aitutor', label: 'DJ Sir AI Tutor', icon: Sparkles },
          { id: 'sangha', label: 'Student Sangha (Q&A)', icon: MessageSquare },
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 flex-1 w-full">
        
        {/* TAB 1: CLASSROOM & DRIVE VAULT */}
        {activeTab === 'classroom' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
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

            {modules.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-dashed text-slate-500 space-y-3" style={{ borderColor: theme.border }}>
                <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
                <h3 className="text-base font-bold text-slate-700">Curriculum Vault is Ready</h3>
                <p className="text-xs max-w-md mx-auto text-slate-500">
                  {user.phone === DJ_PHONE 
                    ? "Click on '⚡ DJ Sir Faculty Admin' at the top to upload your first YouTube video lecture and Google Drive PDF notes." 
                    : "No lecture modules uploaded yet for your batch. DJ Sir will upload notes and videos shortly."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Video & Current Module Detail */}
                <div className="lg:col-span-2 space-y-4">
                  {activeModule ? (
                    <>
                      <div className="bg-black rounded-3xl overflow-hidden aspect-video relative shadow-xl border border-slate-800">
                        {activeModule.videoUrl ? (
                          <iframe 
                            src={activeModule.videoUrl} 
                            title={activeModule.title}
                            className="w-full h-full border-0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                            <Play className="w-10 h-10 mb-2 opacity-50" />
                            <span>No video URL attached for this chapter</span>
                          </div>
                        )}
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
                          
                          {activeModule.driveNoteUrl && (
                            <button 
                              onClick={() => setIsDriveModalOpen(true)}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow transition-all hover:opacity-90"
                              style={{ backgroundColor: theme.primary }}
                            >
                              <BookOpen className="w-3.5 h-3.5" /> Read Drive PDF Note
                            </button>
                          )}
                        </div>

                        {/* Interactive Milestones */}
                        {activeModule.timestamps && activeModule.timestamps.length > 0 && (
                          <div className="pt-3 border-t border-slate-100">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Lecture Milestones:</h3>
                            <div className="flex flex-wrap gap-2">
                              {activeModule.timestamps.map((ts, idx) => (
                                <div 
                                  key={idx}
                                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium flex items-center gap-1.5"
                                >
                                  <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                                  <span className="font-bold text-emerald-700 font-mono">{ts.time}</span>
                                  <span>{ts.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {user.phone === DJ_PHONE && (
                          <div className="pt-2 flex justify-end">
                            <button 
                              onClick={() => removeModule(activeModule.id)}
                              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove Module
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-3xl border">
                      Select a module from the list on the right to start learning.
                    </div>
                  )}
                </div>

                {/* Module List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-700 px-1">Curriculum Modules ({filteredModules.length})</h3>
                  <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                    {filteredModules.map(mod => {
                      const isSelected = activeModule?.id === mod.id;
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
            )}
          </div>
        )}

        {/* TAB 2: AI TUTOR */}
        {activeTab === 'aitutor' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white rounded-3xl p-6 border shadow-sm space-y-4" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: theme.text }}>DJ Sir Polyglot AI Tutor</h2>
                  <p className="text-xs text-slate-500">Ask in English, Benglish, বাংলা, or Hinglish — real-life analogies & reaction breakdown.</p>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl p-4 rounded-3xl text-xs space-y-3 ${msg.sender === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-slate-50 border rounded-tl-none'}`} style={{ borderColor: theme.border }}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      
                      {msg.analogy && (
                        <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200/80 text-amber-950 space-y-1">
                          <span className="font-bold flex items-center gap-1.5 text-amber-800">
                            💡 Real-Life Daily Analogy:
                          </span>
                          <p className="leading-relaxed">{msg.analogy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-500 animate-pulse">
                    DJ Sir AI is analyzing chemical principles and formulating response...
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleAskAi} className="flex gap-2 pt-2 border-t">
                <input 
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ask a question (e.g. SN1 vs SN2 mechanism or Redox Titration)..."
                  className="flex-1 px-4 py-3 bg-[#FAF8F5] border rounded-2xl text-xs outline-none"
                  style={{ borderColor: theme.border }}
                />
                <button 
                  type="submit"
                  disabled={isAiLoading}
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
                  <h2 className="text-lg font-bold" style={{ color: theme.text }}>Student Sangha (Doubt Forum)</h2>
                  <p className="text-xs text-slate-500">Ask questions, share conceptual difficulties, and get faculty-verified answers.</p>
                </div>
                <button 
                  onClick={() => setIsPostingQuestion(!isPostingQuestion)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow hover:bg-slate-800 transition-all"
                >
                  {isPostingQuestion ? 'Cancel' : '+ Ask Doubt'}
                </button>
              </div>

              {/* Ask Doubt Modal/Form */}
              {isPostingQuestion && (
                <form onSubmit={handlePostForumQuestion} className="p-4 rounded-2xl bg-slate-50 border space-y-3 text-xs" style={{ borderColor: theme.border }}>
                  <input 
                    type="text"
                    placeholder="Topic or Doubt Title (e.g. Valency of Copper & Iron)"
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border rounded-xl outline-none"
                    required
                  />
                  <textarea 
                    rows="3"
                    placeholder="Describe your exact doubt or question..."
                    value={postBody}
                    onChange={e => setPostBody(e.target.value)}
                    className="w-full px-3 py-2 bg-white border rounded-xl outline-none"
                    required
                  />
                  <button type="submit" className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl shadow">
                    Publish Doubt to Sangha
                  </button>
                </form>
              )}

              {/* Forum Thread List */}
              <div className="space-y-4">
                {forumPosts.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-2xl">
                    No doubts posted yet. Students can ask doubts here for peer and faculty replies.
                  </div>
                ) : (
                  forumPosts.map(post => (
                    <div key={post.id} className="p-4 rounded-2xl bg-slate-50 border space-y-3 text-xs" style={{ borderColor: theme.border }}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">{post.author}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{post.createdAt}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{post.body}</p>

                      {/* Existing Replies */}
                      {post.replies && post.replies.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-200">
                          {post.replies.map((rep, idx) => (
                            <div key={idx} className={`p-2.5 rounded-xl text-xs ${rep.isFaculty ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium' : 'bg-white border text-slate-800'}`}>
                              <span className="font-bold block text-[10px] mb-0.5" style={{ color: rep.isFaculty ? '#065F46' : '#475569' }}>
                                {rep.author}:
                              </span>
                              {rep.text}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Box */}
                      <div className="flex gap-2 pt-1">
                        <input 
                          type="text"
                          placeholder="Write a reply or answer..."
                          value={replyTextMap[post.id] || ''}
                          onChange={e => setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })}
                          className="flex-1 px-3 py-1.5 bg-white border rounded-xl text-xs outline-none"
                        />
                        <button 
                          onClick={() => handleAddReply(post.id)}
                          className="px-3 py-1.5 bg-slate-800 text-white font-bold rounded-xl text-xs"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: D-TATTVA */}
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
                  Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, pause for 4 seconds before study sessions.
                </p>
              </div>

              {/* Guidance Resources */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Curated Guidance & Focus Vault:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { title: "Swami Vivekananda: Concentration & Character", desc: "Developing unshakeable mind focus and integrity in student life." },
                    { title: "Richard Feynman: The Art of Deep Understanding", desc: "Scientific curiosity without blind memorization." },
                    { title: "Neuroscience of Memory Retention", desc: "Spaced repetition and sleep protocols for long-term retention." },
                    { title: "Stoic Resilience in Examinations", desc: "Overcoming fear of examination marks and maintaining consistency." }
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
      {isDriveModalOpen && activeModule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl border" style={{ borderColor: theme.border }}>
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{activeModule.title} — Google Drive Notes</h3>
                <p className="text-[11px] text-slate-500">{activeModule.board} {activeModule.grade} • Official D-Chemistry Study Material</p>
              </div>
              <button 
                onClick={() => setIsDriveModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 bg-slate-100 relative">
              <iframe 
                src={activeModule.driveNoteUrl} 
                title="Google Drive PDF Reader"
                className="w-full h-full border-0"
              />
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
