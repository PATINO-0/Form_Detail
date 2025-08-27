// app/page.js
"use client";
import { useState } from "react";

export default function Page() {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light"); 
  const [accent, setAccent] = useState("#a855f7"); 
  const [reduceMotion, setReduceMotion] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hqPhoto, setHqPhoto] = useState(false);

  const ACCENTS = [
    "#f97316", 
    "#ef4444", 
    "#22c55e", 
    "#06b6d4", 
    "#a855f7", 
    "#ec4899", 
  ];

  const resetToDefault = () => {
    setLanguage("English");
    setTheme("light");
    setAccent("#a855f7");
    setReduceMotion(true);
    setAutoPlay(true);
    setHqPhoto(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    
    console.log({ language, theme, accent, reduceMotion, autoPlay, hqPhoto });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={onSave}
        className="w-full max-w-xl rounded-2xl bg-white shadow-md ring-1 ring-black/5 p-6 md:p-8"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
          <p className="text-sm text-gray-500">
            Set or customize your preferences for the system
          </p>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Language</label>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Select the language of the platform
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border-gray-300 text-sm px-3 py-2 shadow-sm focus:border-violet-500 focus:ring-violet-500"
            >
              <option>English</option>
              <option>Español</option>
              <option>Português</option>
              <option>Français</option>
            </select>
          </div>
        </div>

        <div className="my-6 h-px bg-gray-100" />

        {/*Interface */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Interface theme
          </label>
          <p className="text-sm text-gray-500 -mt-1">
            Customize your application appearance
          </p>

          <div className="grid grid-cols-3 gap-4 mt-3">
            {[
              { key: "auto", label: "Auto" },
              { key: "light", label: "Light" },
              { key: "dark", label: "Dark" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setTheme(opt.key)}
                className={`group relative rounded-xl border p-3 text-left transition
                 ${theme === opt.key ? "border-violet-500 ring-2 ring-violet-200" : "border-gray-200 hover:border-gray-300"}
                `}
              >
                {/* Mini preview */}
                <div
                  className={`h-20 w-full rounded-lg ${
                    opt.key === "dark" ? "bg-violet-800" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`h-3 w-12 rounded-b-lg ${
                      theme === opt.key ? "bg-violet-500" : "bg-gray-300"
                    }`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {opt.label}
                  </span>
                  {theme === opt.key && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="my-6 h-px bg-gray-100" />

        {/* Accent color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Accent color
          </label>
          <p className="text-sm text-gray-500 -mt-1">
            Pick your platform&apos;s main color
          </p>
          <div className="mt-2 flex items-center gap-3">
            {ACCENTS.map((c) => {
              const active = accent === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAccent(c)}
                  aria-label={`Pick ${c}`}
                  className={`h-8 w-8 rounded-full ring-offset-2 transition 
                    ${active ? "ring-2 ring-violet-500" : "ring-0"}
                  `}
                  style={{ backgroundColor: c }}
                />
              );
            })}
          </div>
        </div>

        <div className="my-6 h-px bg-gray-100" />

        {/* Toggles */}
        <div className="space-y-4">
          <ToggleRow
            label="Reduce motion"
            checked={reduceMotion}
            setChecked={setReduceMotion}
          />
          <ToggleRow
            label="Auto play"
            checked={autoPlay}
            setChecked={setAutoPlay}
          />
          <ToggleRow
            label="High quality photo"
            checked={hqPhoto}
            setChecked={setHqPhoto}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetToDefault}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset to default
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
             
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-violet-400"
              style={{ backgroundColor: accent }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* Toggle sub */
function ToggleRow({ label, checked, setChecked }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
          ${checked ? "bg-violet-600" : "bg-gray-300"}
        `}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition 
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
