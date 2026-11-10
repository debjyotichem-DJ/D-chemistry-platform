# D-Chemistry Learning Platform & PWA (Version 2.0 - Live Gemini AI Integrated)
**Mentored by Debajyoti Haldar (DJ Sir)**

## 🌟 What's New in This Update (Fix for Static AI Response):
1. **Direct Google Gemini API Integration (`gemini-1.5-flash`)**:
   - The app now connects directly to the real Google Gemini API!
   - You can enter your free Gemini API key right in the app (via the "Setup Gemini API" button or Admin Panel), or set `VITE_GEMINI_API_KEY` in Vercel.
   - When configured, answers are **100% dynamic, live, and unique** for every question.
2. **Context-Aware Smart Fallback**:
   - Even if no API key is entered yet, the internal NLP engine now dynamically recognizes concepts across Organic Chemistry (SN1/SN2), Practical Redox Titration (KMnO4 & Mohr's Salt), Language of Chemistry (Valency, Radicals), and Periodic Trends (Inert Pair Effect, Radii) in English, Benglish, and Bengali, ensuring questions never receive repetitive static answers.
3. **In-App API Key Modal**:
   - Click "⚡ Connect Live Gemini API" to paste your free Google AI Studio key without needing to re-build or re-deploy.

## 🚀 How to Publish & Launch in 2 Minutes (Zero Cost):
1. Unzip `D-Chemistry_Production_Platform_v2.zip`.
2. Upload all files to your GitHub repository `d-chemistry-platform`.
3. In Vercel, import the repo and deploy.
4. Optional: Add `VITE_GEMINI_API_KEY` in Vercel `Settings -> Environment Variables` for automatic activation for all students!

## 📱 Features Included:
- **Phone Whitelist Login Gatekeeper**: Only enrolled student phone numbers can log in.
- **DJ Sir Admin Panel**: Log in with `8918444186` to add new students, block access, or upload new chapters.
- **Google Drive Reader Modal**: PDF notes previewed directly inside the app.
- **Live Polyglot AI Tutor**: Generates custom explanations, everyday analogies, and video timestamps.
- **Weekly Astro-Pastel Theme Rotator**: Changes color mood every week automatically.
- **Student Sangha & D-Tattva Sanctuary**: Peer forum, Box breathing widget, and curated guidance.
