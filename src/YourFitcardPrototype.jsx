
import { useMemo, useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";


// Google Identity Services loader скрыт (функция отключена)

// ---------------- Icons (inline SVG) ----------------
const Icon = {
  Speed: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="10" fill="#e0e7ef" />
      <path d="M12 6v6l4 2" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M12 12l-3 3" stroke="#C026D3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="12" r="2.5" fill="#fff" stroke="#3B82F6" strokeWidth="1.5" />
    </svg>
  ),
  Muscle: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <rect x="2" y="10" width="20" height="6" rx="3" fill="#C026D3" />
      <rect x="6" y="7" width="12" height="10" rx="5" fill="#3B82F6" />
      <rect x="9" y="4" width="6" height="16" rx="3" fill="#fff" />
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" fill="url(#grad)" />
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Medal: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <circle cx="12" cy="8" r="6" fill="url(#grad)" />
      <rect x="9" y="14" width="6" height="7" rx="2" fill="#fff" />
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Person: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <rect x="3" y="4" width="18" height="17" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 2v4M16 2v4M3 9h18" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="12" width="4" height="4" rx="1" />
      <rect x="14" y="12" width="4" height="4" rx="1" />
    </svg>
  ),
  Trophy: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <rect x="5" y="4" width="14" height="8" rx="4" fill="url(#grad)" />
      <rect x="9" y="12" width="6" height="6" rx="2" fill="#fff" />
      <rect x="7" y="18" width="10" height="2" rx="1" fill="url(#grad)" />
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 11h3v2H1v-2zm10-9h2v3h-2V2zm8.83 1.05l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM17.24 4.84l1.8-1.79 1.79 1.79-1.79 1.79-1.8-1.79zM20 11h3v2h-3v-2zM11 19h2v3h-2v-3zM3.17 18.16l1.79-1.79-1.79-1.79L1.38 16.37l1.79 1.79zM17.24 19.16l1.8 1.79 1.79-1.79-1.79-1.79-1.8 1.79zM12 6a6 6 0 106 6 6 6 0 00-6-6z" />
    </svg>
  ),
  Moon: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M21.64,13a9,9,0,1,1-10.11-10A7,7,0,1,0,21.64,13Z" />
    </svg>
  ),
  Left: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  ),
  Right: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
    </svg>
  ),
  Pencil: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  ),
  Gear: (p) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13c.04-.33.06-.66.06-1s-.02-.67-.06-1l1.45-1.13a.5.5 0 0 0 .12-.64l-1.38-2.4a.5.5 0 0 0-.6-.23l-1.7.68a7.03 7.03 0 0 0-1.7-.99l-.26-1.81A.5.5 0 0 0 14 3h-2.7a.5.5 0 0 0-.5.42l-.26 1.81c-.6.23-1.17.55-1.7.99l-1.7-.68a.5.5 0 0 0-.6.23l-1.38 2.4a.5.5 0 0 0 .12.64L4.6 11c-.04.33-.06.66-.06 1s.02.67.06 1l-1.45 1.13a.5.5 0 0 0-.12.64l1.38 2.4a.5.5 0 0 0 .6.23l1.7-.68c.53.44 1.1.76 1.7.99l.26 1.81a.5.5 0 0 0 .5.42H14a.5.5 0 0 0 .5-.42l.26-1.81c.6-.23 1.17-.55 1.7-.99l1.7.68a.5.5 0 0 0 .6-.23l1.38-2.4a.5.5 0 0 0-.12-.64L19.4 13z" />
    </svg>
  ),
};

// ---------------- Helpers ----------------
const statList = ["Arm", "FrB", "BaB", "Leg", "Sta", "Fle", "Spe"];
const statMeta = {
  Arm: { name: "Arms", type: "Anaerobic", subs: ["Biceps", "Triceps", "Forearm", "Shoulders"] },
  FrB: { name: "Front Body", type: "Anaerobic", subs: ["Chest", "Abdominal Muscles", "Oblique Muscles"] },
  BaB: { name: "Back Body", type: "Anaerobic", subs: ["Neck", "Upper Muscles", "Lower Muscles"] },
  Leg: { name: "Legs", type: "Anaerobic", subs: ["Buttocks", "Quadriceps", "Back of thigh", "Calves"] },
  Sta: { name: "Stamina", type: "Aerobic", subs: ["Running", "Cycling", "Rowing", "Swimming"] },
  Fle: { name: "Flexibility", type: "Aerobic", subs: ["Yoga", "Stretching", "Pilates"] },
  Spe: { name: "Speed", type: "Aerobic", subs: ["Sprints", "Intervals", "Track"] },
};

const xpToNext = (r) => 50 + (r - 50) * 10;
const applyXp = ({ currentRating, currentXp, earned }) => {
  let rating = currentRating;
  let xp = currentXp + earned;
  let increased = 0;
  while (xp >= xpToNext(rating)) {
    xp -= xpToNext(rating);
    rating += 1;
    increased += 1;
  }
  return { rating, xp, increased };
};
const computeOvr = (ratings) => {
  const vals = Object.values(ratings);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
};

// Original achievements (kept for tests)
const achievementDefs = [
  { id: "first_session", label: "First Session", test: (_r, w) => w.length > 0 },
  // OVR достижения (60, 70, 80, 90, 100, 110)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `ovr_${60 + i * 10}`,
    label: `Overall ${60 + i * 10}+`,
    test: (r) => computeOvr(r) >= 60 + i * 10
  })),
  // Достижения по каждой характеристике (60, 70, 80, 90, 100, 110)
  ...statList.flatMap((stat) => Array.from({ length: 6 }, (_, i) => ({
    id: `${stat.toLowerCase()}_${60 + i * 10}`,
    label: `${statMeta[stat].name} ${60 + i * 10}+`,
    test: (r) => r[stat] >= 60 + i * 10
  }))),
];
const computeAchievements = (ratings, workouts) => achievementDefs.filter((a) => a.test(ratings, workouts)).map((a) => a.id);

// ---------------- UI Subcomponents ----------------
const Header = () => (
  <header className="sticky top-0 z-20 bg-white/65 dark:bg-neutral-900/55 backdrop-blur-xl border-b border-black/5 dark:border-white/10">
    <div className="mx-auto max-w-md px-5 py-4 flex items-center gap-3">
      <Logo className="w-8 h-8" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-fuchsia-600">Fitcard</h1>
      </div>
    </div>
  </header>
);

const Logo = (p) => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...p}>
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="1" y2="0">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#C026D3" />
      </linearGradient>
    </defs>
    <g fill="url(#g)">
      <path d="M60 6 L108 42 L90 108 L30 108 L12 42 Z" />
      <path d="M60 35 a3 3 0 0 1 3 3v15h15a3 3 0 0 1 0 6H63v15a3 3 0 0 1-6 0V59H42a3 3 0 0 1 0-6h15V38a3 3 0 0 1 3-3z" fill="#fff" />
    </g>
  </svg>
);

const TabBar = ({ tab, setTab }) => {
  const items = [
    { key: "stats", label: "Stats", Icon: Icon.Person },
    { key: "season", label: "Season", Icon: Icon.Calendar },
    { key: "settings", label: "Settings", Icon: Icon.Gear },
  ];
  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl">
      <div className="mx-auto max-w-md grid grid-cols-3">
        {items.map(({ key, label, Icon: I }) => {
          const active = tab === key;
          return (
            <motion.button
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              key={key}
              onClick={() => setTab(key)}
              className="py-3 flex flex-col items-center gap-1"
            >
              <I className={`w-6 h-6 ${active ? "" : "fill-black/70 dark:fill-white/80"}`} {...(active ? { style: { fill: "url(#grad)" } } : {})} />
              <span className={`text-[11px] ${active ? "text-black dark:text-white font-semibold" : "text-black/70 dark:text-white/70"}`}>{label}</span>
            </motion.button>
          );
        })}
      </div>
      <svg width="0" height="0">
        <linearGradient id="grad" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </svg>
    </nav>
  );
};

const EditableName = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  useEffect(() => setVal(value), [value]);
  return editing ? (
    <div className="flex items-center gap-2 w-full max-w-[180px]">
      <input
        className="px-2.5 py-1.5 rounded-xl bg-white/20 dark:bg-white/10 outline-none flex-1 min-w-0"
        value={val}
        onChange={e => setVal(e.target.value.slice(0, 16))}
        maxLength={16}
        autoFocus
        inputMode="text"
        onFocus={e => e.target.select()}
      />
      <motion.button whileTap={{ scale: 0.96 }} onClick={() => { onSave(val.trim() || "You"); setEditing(false); }} className="px-2.5 py-1.5 bg-white/10 rounded-xl">Save</motion.button>
    </div>
  ) : (
    <div className="flex items-center gap-1">
      <button onClick={() => setEditing(true)} className="text-[16px] font-semibold tracking-tight">{val || "You"}</button>
      <button aria-label="Edit name" onClick={() => setEditing(true)} className="p-1 rounded hover:bg-white/10">
        <Icon.Pencil className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const Avatar = ({ name, url, onClick }) => {
  const letter = (name || "Y")[0]?.toUpperCase();
  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onClick} className="relative w-16 h-16 rounded-full ring-2 ring-white/60 overflow-hidden shrink-0">
      {url ? (
        <img src={url} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full grid place-items-center bg-black/20 text-white text-xl font-semibold">{letter}</div>
      )}
    </motion.button>
  );
};

const SmallStat = ({ label, value, onClick }) => (
  <div className="text-center px-2 select-none cursor-pointer" onClick={onClick}>
    <div className="text-[12px] tracking-wide opacity-80">{label}</div>
    <div className="font-extrabold text-[22px] leading-tight">{value}</div>
  </div>
);

const PlayerCard = ({ name, setName, avatarUrl, setAvatarUrl, ratings, onLongShare, onStatClick }) => {
  const ovr = useMemo(() => computeOvr(ratings), [ratings]);

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [tmpUrl, setTmpUrl] = useState(avatarUrl);
  useEffect(() => setTmpUrl(avatarUrl), [avatarUrl]);

  // Long-press timer (share card)
  const timerRef = useRef(null);
  const startShareTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onLongShare && onLongShare(), 600);
  };
  const stopShareTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] bg-gradient-to-br from-blue-800 to-fuchsia-800 text-white overflow-hidden relative border border-white/10"
      onTouchStart={startShareTimer}
      onTouchEnd={stopShareTimer}
      onMouseDown={(e) => { e.preventDefault(); startShareTimer(); }}
      onMouseUp={stopShareTimer}
      onMouseLeave={stopShareTimer}
    >
      {/* Top row: avatar + name (left) | OVR (right) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={name} url={avatarUrl} onClick={() => setAvatarOpen(true)} />
          <EditableName value={name} onSave={setName} />
        </div>
        <div className="text-right select-none">
          <div className="text-[11px] uppercase tracking-[0.2em] opacity-90">OVR</div>
          <div className="text-[56px] leading-none font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-300 drop-shadow-sm">{ovr}</div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="mt-3">
        <div className="flex justify-center gap-4">
          <SmallStat label="ARM" value={ratings.Arm} onClick={() => onStatClick && onStatClick("Arm")} />
          <SmallStat label="FRB" value={ratings.FrB} onClick={() => onStatClick && onStatClick("FrB")} />
          <SmallStat label="BAB" value={ratings.BaB} onClick={() => onStatClick && onStatClick("BaB")} />
          <SmallStat label="LEG" value={ratings.Leg} onClick={() => onStatClick && onStatClick("Leg")} />
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <SmallStat label="STA" value={ratings.Sta} onClick={() => onStatClick && onStatClick("Sta")} />
          <SmallStat label="FLX" value={ratings.Fle} onClick={() => onStatClick && onStatClick("Fle")} />
          <SmallStat label="SPD" value={ratings.Spe} onClick={() => onStatClick && onStatClick("Spe")} />
        </div>
      </div>

      {/* Avatar Modal */}
      <AnimatePresence>
        {avatarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center p-0">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ type: "spring", stiffness: 240, damping: 24 }} className="bg-white dark:bg-neutral-900 text-black dark:text-white rounded-2xl p-6 w-full max-w-xs mx-4 shadow-2xl">
              <h3 className="font-semibold text-lg tracking-tight">Avatar Image</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Paste an image URL (300kb recommended). Leave empty to remove.</p>
              <div className="mt-3 text-xs opacity-70">or upload an image (≤3MB)</div>
              <input type="file" accept="image/*" className="mt-1 w-full text-sm" onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 3145728) { alert("Please choose an image ≤ 3MB"); return; }
                const reader = new FileReader();
                reader.onload = () => setTmpUrl(reader.result);
                reader.readAsDataURL(f);
              }} />
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setAvatarOpen(false)} className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10">Cancel</button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setAvatarUrl(tmpUrl.trim()); setAvatarOpen(false); }} className="px-3 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white">Save</motion.button>
                <button onClick={() => { setAvatarUrl(""); setAvatarOpen(false); }} className="px-3 py-2 rounded-xl border border-red-500 text-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProgressBar = ({ value, max }) => {
  const pct = Math.max(0, Math.min(100, Math.round((value / (max || 1)) * 100)));
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-500 to-fuchsia-600" style={{ width: `${pct}%` }} />
    </div>
  );
};

const PanelShell = ({ icon, iconBg, title, subtitle, children, rightPill, theme }) => {
  // theme: 'dark' | 'light' | undefined
  const isLight = theme === 'light';
  return (
    <div className={
      isLight
        ? "rounded-2xl p-5 bg-white text-black border border-black/5"
        : "rounded-2xl p-5 bg-neutral-900/80 text-white border border-white/10"
    }>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl grid place-items-center ${iconBg}`}>{icon}</div>
          <div>
            <div className="font-semibold tracking-tight">{title}</div>
            <div className="text-[12px] opacity-70">{subtitle}</div>
          </div>
        </div>
        {rightPill}
      </div>
      {children}
    </div>
  );
};

const AerobicPanel = ({ ratings, xp, onLongPress, theme }) => {
  const blocks = [
    { key: "Sta", label: "Stamina" },
    { key: "Fle", label: "Flexibility" },
    { key: "Spe", label: "Speed" },
  ];
  return (
  <PanelShell icon={<Icon.Speed className="w-4 h-4" />} iconBg="bg-blue-600/20" title="Aerobic" subtitle="Cardiovascular Training">
      <div className="grid grid-cols-2 gap-4">
        {blocks.map(({ key, label }) => {
          let timer;
          const start = () => { timer = setTimeout(() => onLongPress && onLongPress({ key, sub: statMeta[key].subs[0] }), 450); };
          const stop = () => timer && clearTimeout(timer);
          return (
            <div key={key}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl p-2 -m-2 hover:bg-white/5 cursor-pointer select-none"
              onTouchStart={start} onTouchEnd={stop} onMouseDown={start} onMouseUp={stop}>
              <div className="text-blue-200/90">{label}</div>
              <div className="font-[700] text-[20px] tracking-wide">{ratings[key]}</div>
              <div className="col-span-2"><ProgressBar value={xp[key]} max={xpToNext(ratings[key])} /></div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
};

const AnaerobicPanel = ({ ratings, xp, onLongPress, theme }) => {
  const blocks = [
  { key: "Arm", label: "Arms" },
  { key: "Leg", label: "Legs" },
  { key: "FrB", label: "Front Body" },
  { key: "BaB", label: "Back Body" },
  ];
  return (
    <PanelShell icon={<Icon.Muscle className="w-4 h-4" />} iconBg="bg-fuchsia-600/20" title="Anaerobic" subtitle="Power & Skill Training">
      <div className="grid grid-cols-2 gap-4">
        {blocks.map(({ key, label }) => {
          let timer;
          const start = () => { timer = setTimeout(() => onLongPress && onLongPress({ key, sub: statMeta[key].subs[0] }), 450); };
          const stop = () => timer && clearTimeout(timer);
          return (
            <div key={key}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl p-2 -m-2 hover:bg-white/5 cursor-pointer select-none"
              onClick={() => onStatClick && onStatClick(key)}
              onTouchStart={start} onTouchEnd={stop} onMouseDown={start} onMouseUp={stop}>
              <div className="text-fuchsia-200/90">{label}</div>
              <div className="font-[700] text-[20px] tracking-wide">{ratings[key]}</div>
              <div className="col-span-2"><ProgressBar value={xp[key]} max={xpToNext(ratings[key])} /></div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
};

// Achievements (Stats tab, under Anaerobic)
const Shield = ({ locked }) => {
  const gid = useId();
  const gradId = `ach-g-${gid}`;
  return (
    <svg viewBox="0 0 64 72" className="w-8 h-9">
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
      <path d="M32 2 L56 12 V34 C56 48 47 60 32 68 C17 60 8 48 8 34 V12 Z" fill={locked ? "#1f2937" : `url(#${gradId})`} stroke={locked ? "#374151" : "#d1d5db"} strokeWidth="2" />
    </svg>
  );
};

const AchievementsPanel = ({ ratings, workouts, theme }) => {
  const unlocked = computeAchievements(ratings, workouts);
  const setUnlocked = new Set(unlocked);
  const unlockedList = achievementDefs.filter((a) => setUnlocked.has(a.id));
  return (
  <PanelShell icon={<Icon.Star className="w-4 h-4" />} iconBg="bg-white/10" title="Achievements" subtitle="">
      {unlockedList.length === 0 ? (
        <div className="text-center text-sm opacity-70 py-6">Keep training and you'll unlock achievements!</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {unlockedList.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-xl p-3 border border-white/15 bg-white/5">
              <Icon.Trophy className="w-6 h-6" />
              <div>
                <div className="text-sm font-semibold tracking-tight">{a.label}</div>
                <div className="text-[11px] opacity-70">Unlocked</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PanelShell>
  );
};

// Google auth UI removed — functionality deprecated/removed to simplify prototype
const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
const addDays = (date, n) => { const d = new Date(date); d.setDate(d.getDate() + n); return d; };
const fmt = (date) => new Date(date).toISOString().slice(0, 10);
const isoWeek = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
};

// Simple id generator
function cryptoRandom() {
  // Generate a random id string
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

// ---------------- Logger, Calendar ----------------
const LoggerModal = ({ open, onClose, preset, onSave }) => {
  const [stat, setStat] = useState(preset?.key || "Sta");
  const [sub, setSub] = useState(preset?.sub || statMeta[stat].subs[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(30);
  const [avgWeight, setAvgWeight] = useState(20);
  const [series, setSeries] = useState(3);

  useEffect(() => { if (preset?.key) setStat(preset.key); if (preset?.sub) setSub(preset.sub); }, [preset]);
  useEffect(() => setSub(statMeta[stat].subs[0]), [stat]);
  const isAerobic = statMeta[stat].type === "Aerobic";

  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center p-5 z-50">
          <motion.div initial={{ y: 18, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 8, scale: 0.99, opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 26 }} className={`w-full max-w-md rounded-2xl p-5 shadow-2xl border ${theme === 'dark' ? 'bg-neutral-900/80 text-white border-white/10' : 'bg-white text-black border-black/5'}`}>
            <h3 className="text-lg font-semibold tracking-tight">Log a Training Session</h3>

            <label className="block mt-4 text-sm">Characteristic</label>
            <select value={stat} onChange={(e) => setStat(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10">
              {statList.map((k) => (
                <option value={k} key={k}>{statMeta[k].name} ({k})</option>
              ))}
            </select>

            <label className="block mt-4 text-sm">Subcategory</label>
            <select value={sub} onChange={(e) => setSub(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10">
              {statMeta[stat].subs.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>

            <label className="block mt-4 text-sm">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10" />

            {isAerobic ? (
              <div className="mt-4">
                <label className="block text-sm">Duration (minutes)</label>
                <input type="number" min="1" value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-sm">Average Weight</label>
                  <input type="number" min="1" value={avgWeight} onChange={(e) => setAvgWeight(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10" />
                </div>
                <div>
                  <label className="block text-sm">Number of Series</label>
                  <input type="number" min="1" value={series} onChange={(e) => setSeries(+e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10" />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => onClose(false)} className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10">Cancel</button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => onSave({ stat, sub, date, isAerobic, duration, avgWeight, series })} className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white">Save</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WeekCalendar = ({ workouts, weekOffset, setWeekOffset, weeklyGoal = 5 }) => {
  const base = new Date();
  const monday = startOfWeek(new Date(base.getFullYear(), base.getMonth(), base.getDate() + weekOffset * 7));
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const workoutDates = new Set(workouts.map((w) => w.date));

  const countInWeek = days.reduce((acc, d) => acc + (workoutDates.has(fmt(d)) ? 1 : 0), 0);
  const weekNo = isoWeek(monday);

  return (
    <div className="rounded-2xl p-5 bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
      <div className="flex items-center justify-between gap-2">
        <button onClick={() => setWeekOffset((o) => o - 1)} className="p-2 rounded-xl bg-black/5 dark:bg-white/10"><Icon.Left className="w-5 h-5" /></button>
        <div className="text-center">
          <div className="font-semibold tracking-tight text-lg">Week {weekNo}</div>
          <div className="text-[12px] opacity-70">{fmt(days[0])} – {fmt(days[6])}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekOffset(0)} className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 text-sm">Today</button>
          <button onClick={() => setWeekOffset((o) => o + 1)} className="p-2 rounded-xl bg-black/5 dark:bg-white/10"><Icon.Right className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mt-4">
        {days.map((d, i) => {
          const dateStr = fmt(d);
          const has = workoutDates.has(dateStr);
          return (
            <div key={i} className={`aspect-square rounded-2xl grid place-items-center text-xs border ${has ? "bg-gradient-to-br from-blue-500 to-fuchsia-600 text-white border-transparent shadow" : "bg-black/5 dark:bg-white/10 border-black/5 dark:border-white/10"}`}>
              <div className="text-[10px] opacity-80 mb-0.5">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</div>
              <div className="font-semibold text-[13px]">{d.getDate()}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="opacity-80">Season Progress</span>
          <span className="opacity-80">{Math.min(countInWeek, weeklyGoal)} / {weeklyGoal} sessions</span>
        </div>
        <ProgressBar value={countInWeek} max={weeklyGoal || 1} />
      </div>
    </div>
  );
};

// ---------------- Main Prototype ----------------

function FitcardPrototype() {
  // Скрытый canvas для экспорта карточки
  // const canvasRef = useRef(null); // Удалено дублирующее объявление
  // Модалка для просмотра субкатегорий
  const [subcatModal, setSubcatModal] = useState({ open: false, stat: null });
  // По умолчанию dark
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      // Можно добавить localStorage/theme, если нужно
      return "dark";
    }
    return "dark";
  });
  const [tab, setTab] = useState("stats");

  // --- Local progress persistence ---
  const defaultState = {
    name: "You",
    avatarUrl: "",
    ratings: Object.fromEntries(statList.map((k) => [k, 50])),
    xp: Object.fromEntries(statList.map((k) => [k, 0])),
    workouts: [],
    progress: [],
    weeklyGoal: 5,
  };
  // Загрузка из localStorage
  let initial = defaultState;
  try {
    const raw = localStorage.getItem('fitcard-user');
    if (raw) {
      const parsed = JSON.parse(raw);
      initial = { ...defaultState, ...parsed };
    }
  } catch {}
  const [name, setName] = useState(initial.name);
  const [avatarUrl, setAvatarUrl] = useState(initial.avatarUrl);
  const [ratings, setRatings] = useState(initial.ratings);
  const [xp, setXp] = useState(initial.xp);
  const [workouts, setWorkouts] = useState(initial.workouts);
  const [progress, setProgress] = useState(initial.progress);
  const [weeklyGoal, setWeeklyGoal] = useState(initial.weeklyGoal);

  // Logger modal
  const [loggerOpen, setLoggerOpen] = useState(false);
  const [preset, setPreset] = useState(null);

  // Calendar + settings
  const [weekOffset, setWeekOffset] = useState(0);
  // weeklyGoal уже объявлен выше с инициализацией из localStorage

  // Sharing canvas
  const canvasRef = useRef(null);

  const snapshot = () => ({ name, avatarUrl, ratings, xp, workouts, progress, weeklyGoal });
  const applySnapshot = (s) => {
    if (!s) return;
    setName(s.name ?? name);
    setAvatarUrl(s.avatarUrl ?? "");
    setRatings(s.ratings ?? ratings);
    setXp(s.xp ?? xp);
    setWorkouts(s.workouts ?? workouts);
    setProgress(s.progress ?? progress);
    if (typeof s.weeklyGoal === 'number') setWeeklyGoal(s.weeklyGoal);
  };
  // --- Сохранять прогресс локально при изменениях ---
  useEffect(() => {
    const data = snapshot();
    try {
      localStorage.setItem('fitcard-user', JSON.stringify(data));
    } catch {}
  }, [name, avatarUrl, ratings, xp, workouts, progress, weeklyGoal]);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  // Рисование карточки на canvas
  const drawCardToCanvas = async () => {
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 340;
    }
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#1e3a8a"); g.addColorStop(1, "#a21caf");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fillRect(24, 24, W - 48, H - 48);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 36px Inter, system-ui, sans-serif"; ctx.fillText(name || "You", 40, 80);
    ctx.font = "bold 96px Inter, system-ui, sans-serif"; ctx.textAlign = "right"; ctx.fillText(String(computeOvr(ratings)), W - 40, 110); ctx.textAlign = "left";
    const cx = 100, cy = 150, r = 60;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.closePath(); ctx.save(); ctx.clip();
    if (avatarUrl) {
      await new Promise((res) => { const img = new Image(); img.crossOrigin = "anonymous"; img.onload = () => { ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2); res(); }; img.onerror = () => res(); img.src = avatarUrl; });
    } else {
      ctx.fillStyle = "#334155"; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      ctx.fillStyle = "#fff"; ctx.font = "bold 64px Inter, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillText((name || "Y")[0].toUpperCase(), cx, cy + 22); ctx.textAlign = "left";
    }
    ctx.restore();
    const entries = [["ARM", ratings.Arm],["LEG", ratings.Leg],["FRB", ratings.FrB],["BAB", ratings.BaB],["STA", ratings.Sta],["FLX", ratings.Fle],["SPD", ratings.Spe]];
    ctx.font = "bold 28px Inter, system-ui, sans-serif";
    let x = 220, y = 150;
    for (let i = 0; i < entries.length; i++) { const [k, v] = entries[i]; ctx.fillStyle = "#cbd5e1"; ctx.fillText(k, x, y); ctx.fillStyle = "#fff"; ctx.fillText(String(v), x + 80, y); y += 40; if ((i + 1) % 4 === 0) { x += 200; y = 150; } }
    return canvas;
  };

  const shareCard = async () => {
    const canvas = await drawCardToCanvas();
    if (!canvas) {
      alert('Ошибка: не удалось создать изображение.');
      return;
    }
    const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
    if (!blob) {
      alert('Ошибка: не удалось экспортировать изображение.');
      return;
    }
    const file = new File([blob], "fitcard.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ title: "My Fitcard", text: `${name} – OVR ${computeOvr(ratings)}`, files: [file] });
      } catch (e) {
        alert('Отмена или ошибка при отправке: ' + (e?.message || '')); 
      }
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fitcard.png";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        a.remove();
        URL.revokeObjectURL(url);
        alert("Изображение карточки скачано! Файл можно найти в папке загрузок и поделиться с друзьями.");
      }, 100);
    }
  };

  // Новая логика начисления XP
  function calcAnaerobicXp(weight, series) {
    return Number(weight) * Number(series);
  }
  function calcAerobicXp(duration) {
    return Math.floor(Number(duration) / 10) * 10;
  }
  const onSaveWorkout = ({ stat, sub, date, isAerobic, duration, avgWeight, series }) => {
    let earned = 0;
    if (statMeta[stat].type === "Anaerobic") {
      earned = calcAnaerobicXp(avgWeight, series);
    } else {
      earned = calcAerobicXp(duration);
    }
    const result = applyXp({ currentRating: ratings[stat], currentXp: xp[stat], earned });
    const newRatings = { ...ratings, [stat]: result.rating };
    const newXp = { ...xp, [stat]: result.xp };

    const workout = { id: cryptoRandom(), date, stat, sub, type: statMeta[stat].type, earned, before: ratings[stat], after: result.rating, ts: Date.now() };
    const newWorkouts = [workout, ...workouts].slice(0, 500);

    let newProgress = [...progress];
    if (result.increased > 0) newProgress = [{ date, stat, delta: result.increased }, ...newProgress].slice(0, 50);

    setRatings(newRatings);
    setXp(newXp);
    setWorkouts(newWorkouts);
    setProgress(newProgress);
    setLoggerOpen(false);
  };

  const lastUniqueDays = (() => {
    const seen = new Set(); const list = [];
    for (const w of workouts) { if (!seen.has(w.date)) { seen.add(w.date); list.push({ date: w.date, stat: w.stat, after: w.after }); } if (list.length >= 5) break; }
    return list;
  })();


  // ...оставляем только основной контент без второго приветственного экрана...

  return (
    <div className={
      `min-h-screen h-full w-full ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-white text-black"}`
    }>
      {/* Скрытый canvas для экспорта карточки */}
      <canvas ref={canvasRef} width={600} height={340} style={{ display: 'none' }} aria-hidden="true"></canvas>
  {/* Убрали Header, safe-area теперь глобально через CSS */}
  <main className="mx-auto max-w-md px-5 pb-28 pt-[50px]">
        {tab === "stats" && (
          <div className="space-y-5">
            <div>
              <PlayerCard name={name} setName={setName} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} ratings={ratings} onLongShare={shareCard} />
            </div>
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => setLoggerOpen(true)} className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2">
              <Icon.Plus className="w-4 h-4 fill-white" />
              <span>Log a Workout</span>
            </motion.button>
            <AerobicPanel ratings={ratings} xp={xp} onLongPress={(preset) => { setPreset(preset); setLoggerOpen(true); }} theme={theme} />
            <AnaerobicPanel ratings={ratings} xp={xp} onLongPress={(preset) => { setPreset(preset); setLoggerOpen(true); }} theme={theme} />
            <AchievementsPanel ratings={ratings} workouts={workouts} theme={theme} />
          </div>
        )}

        {tab === "season" && (
          <div className="space-y-5">
            <WeekCalendar workouts={workouts} weekOffset={weekOffset} setWeekOffset={setWeekOffset} weeklyGoal={weeklyGoal} />
            <div className={
              theme === "dark"
                ? "rounded-2xl p-5 bg-black/5 dark:bg-white/10 border border-white/10"
                : "rounded-2xl p-5 bg-white border border-black/10"
            }>
              <div className="font-semibold mb-2 tracking-tight">Last Progress</div>
              <ul className="space-y-2 text-sm">
                {lastUniqueDays.length === 0 && <li className="opacity-60">No progress yet. Log a training session!</li>}
                {lastUniqueDays.map((p, i) => (
                  <li key={i} className="flex justify-between items-center gap-2">
                    <span className="opacity-80">{p.date}</span>
                    <span className="font-medium">{p.stat}</span>
                    <span className={theme === "dark" ? "px-2 py-0.5 rounded-full bg-white/10 text-[11px]" : "px-2 py-0.5 rounded-full bg-black/10 text-[11px]"}>Rating {p.after}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className="space-y-5">
            {/* Theme block */}
            <div className={
              theme === "dark"
                ? "rounded-2xl p-5 bg-white/5 border border-white/10 flex items-center justify-between"
                : "rounded-2xl p-5 bg-white border border-black/10 flex items-center justify-between"
            }>
              <div>
                <div className="font-semibold tracking-tight">Theme</div>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className={
                theme === "dark"
                  ? "px-3 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white"
                  : "px-3 py-2 rounded-2xl bg-black text-white border border-black"
              }>
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </motion.button>
            </div>

            {/* Backup & Restore — самостоятельный блок */}
            <div className={
              theme === "dark"
                ? "rounded-2xl p-5 bg-white/5 border border-white/10"
                : "rounded-2xl p-5 bg-white border border-black/5"
            }>
              <div className="font-semibold tracking-tight mb-2">Backup & Restore</div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-2 rounded-xl bg-blue-500 text-white"
                  onClick={() => {
                    // Экспортируем актуальные данные о прогрессе и тренировках
                    const exportData = {
                      name,
                      avatarUrl,
                      ratings,
                      xp,
                      workouts,
                      progress,
                      weeklyGoal,
                    };
                    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'fitcard-backup.json';
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                      URL.revokeObjectURL(url);
                      a.remove();
                      alert('Данные успешно экспортированы и сохранены на устройстве.');
                    }, 100);
                  }}
                >Export Data</button>
                <label className="px-3 py-2 rounded-xl bg-fuchsia-500 text-white cursor-pointer">
                  Import Data
                  <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const text = await file.text();
                    try {
                      const obj = JSON.parse(text);
                      localStorage.setItem('fitcard-user', JSON.stringify(obj));
                      window.location.reload();
                    } catch {
                      alert('Invalid file');
                    }
                  }} />
                </label>
              </div>
            </div>

            {/* Weekly Goal block */}
            <div className={
              theme === "dark"
                ? "rounded-2xl p-5 bg-white/5 border border-white/10 flex items-center justify-between"
                : "rounded-2xl p-5 bg-white border border-black/10 flex items-center justify-between"
            }>
              <div>
                <div className="font-semibold tracking-tight">Weekly Goal</div>
                <div className="text-sm opacity-70">Target training sessions per week</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setWeeklyGoal((g) => Math.max(1, g - 1))} className={theme === "dark" ? "px-2 py-1 rounded-xl bg-white/10" : "px-2 py-1 rounded-xl bg-black/10"}>–</button>
                <input type="number" min="1" max="7" value={weeklyGoal} onChange={(e) => setWeeklyGoal(Math.max(1, Math.min(7, +e.target.value || 1)))} className={theme === "dark" ? "w-16 px-2 py-1 rounded-xl bg-white/10 text-center" : "w-16 px-2 py-1 rounded-xl bg-black/10 text-center"} />
                <button onClick={() => setWeeklyGoal((g) => Math.min(7, g + 1))} className={theme === "dark" ? "px-2 py-1 rounded-xl bg-white/10" : "px-2 py-1 rounded-xl bg-black/10"}>+</button>
              </div>
            </div>

            {/* Google Auth Panel скрыт по запросу пользователя */}
          </div>
        )}
      </main>

      <TabBar tab={tab} setTab={setTab} />
      <canvas ref={canvasRef} width="720" height="480" style={{ display: "none" }} />
      <LoggerModal open={loggerOpen} onClose={setLoggerOpen} preset={preset} onSave={onSaveWorkout} />
    </div>
  );
}

export default FitcardPrototype;

// ---------------- Self-tests (runtime, no UI impact) ----------------
if (typeof window !== "undefined" && !window.__FITCARD_TESTED__) {
  window.__FITCARD_TESTED__ = true;
  // cryptoRandom presence & behavior
  console.assert(typeof cryptoRandom === "function", "cryptoRandom should be a function");
  const ids = Array.from({ length: 200 }, () => cryptoRandom());
  console.assert(ids.every((s) => typeof s === "string" && s.length >= 10), "cryptoRandom should return a non-trivial string");
  console.assert(new Set(ids).size === ids.length, "cryptoRandom should produce unique values across 200 samples");
  const a = cryptoRandom(); const b = cryptoRandom();
  console.assert(a !== b, "cryptoRandom should not repeat on consecutive calls");
  // xp progression formula
  console.assert(xpToNext(50) === 50, "xpToNext(50) must be 50");
  console.assert(xpToNext(60) === 150, "xpToNext(60) must be 150");
  // applyXp leveling (single + multi-level)
  const r1 = applyXp({ currentRating: 50, currentXp: 0, earned: 60 });
  console.assert(r1.rating === 51 && r1.xp === 10, "applyXp should roll over with correct remainder");
  const r2 = applyXp({ currentRating: 50, currentXp: 0, earned: 50 + 60 + 70 });
  console.assert(r2.rating === 53 && r2.xp === 0, "applyXp should handle multiple level-ups correctly");
  // achievements (original)
  console.assert(computeAchievements(Object.fromEntries(statList.map((k) => [k, 50])), []).length === 0, "no achievements at baseline");
  // Проверяем достижение по одной характеристике (например, sta_60)
  console.assert(computeAchievements({ Sta: 60, Fle: 50, Spe: 50, Arm: 50, Leg: 50, FrB: 50, BaB: 50 }, []).includes("sta_60"), "sta_60 should unlock when Sta reaches 60");
  // Проверяем достижение по OVR
  console.assert(computeAchievements(Object.fromEntries(statList.map((k) => [k, 60])), []).includes("ovr_60"), "ovr_60 should unlock when overall >= 60");
  console.assert(computeAchievements(Object.fromEntries(statList.map((k) => [k, 50])), [{ date: "2025-01-01" }]).includes("first_session"), "first_session should unlock after first workout");
  // isoWeek sanity
  const m = startOfWeek(new Date("2025-02-03"));
  const weekNums = Array.from({ length: 7 }, (_, i) => isoWeek(addDays(m, i)));
  console.assert(new Set(weekNums).size === 1, "isoWeek should be stable across Mon..Sun of same week");
}
