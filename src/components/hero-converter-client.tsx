'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Check, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { convert } from '@/lib/utils';

const TOAST_DURATION = 2400;

type Mode = 'json2toon' | 'toon2json';

const JSON_PLACEHOLDER = '{\n  "name": "Alice",\n  "age": 30,\n  "city": "Beijing"\n}';
const TOON_PLACEHOLDER = '~name Alice ~age 30 ~city Beijing';

export function HeroConverterClient() {
  const t = useTranslations('hero');
  const [mode, setMode] = useState<Mode>('json2toon');
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [savings, setSavings] = useState(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ type, message });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, TOAST_DURATION);
  }, []);

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const handleConvert = useCallback(() => {
    if (mode === 'json2toon') {
      try {
        const json = JSON.parse(leftValue) as object;
        const toon = convert(json) as string;
        setRightValue(toon);
        const savingsPercent = Math.round((1 - toon.length / leftValue.length) * 100);
        setSavings(Math.max(0, savingsPercent));
      } catch {
        showToast('error', t('invalidJson'));
      }
    } else {
      try {
        const decoded = convert(leftValue);
        const jsonStr = JSON.stringify(decoded, null, 2);
        setRightValue(jsonStr);
        const savingsPercent = Math.round((1 - leftValue.length / jsonStr.length) * 100);
        setSavings(Math.max(0, savingsPercent));
      } catch {
        showToast('error', t('invalidToon'));
      }
    }
  }, [mode, leftValue, t, showToast]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(rightValue);
    showToast('success', t('copied'));
  }, [rightValue, showToast, t]);

  const clearLeft = useCallback(() => {
    setLeftValue('');
    setRightValue('');
    setSavings(0);
  }, []);

  const switchMode = useCallback((newMode: Mode) => {
    if (newMode === mode) return;
    setMode(newMode);
    setLeftValue('');
    setRightValue('');
    setSavings(0);
  }, [mode]);

  const leftLabel = mode === 'json2toon' ? t('jsonInput') : t('toonInput');
  const rightLabel = mode === 'json2toon' ? t('toonOutput') : t('jsonOutput');
  const convertButtonText = mode === 'json2toon' ? t('convertToToon') : t('convertToJson');
  const leftPlaceholder = mode === 'json2toon' ? JSON_PLACEHOLDER : TOON_PLACEHOLDER;

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-1 p-1.5 mb-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => switchMode('json2toon')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
            mode === 'json2toon'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'text-white/60 hover:text-white/90'
          }`}
        >
          {t('tabJson2Toon')}
        </button>
        <button
          type="button"
          onClick={() => switchMode('toon2json')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
            mode === 'toon2json'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'text-white/60 hover:text-white/90'
          }`}
        >
          {t('tabToon2Json')}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <h3 className="text-lg font-bold text-white">{leftLabel}</h3>
            </div>
            <button onClick={clearLeft} className="text-sm text-blue-400 hover:text-blue-300 font-medium transition">
              {t('clear')}
            </button>
          </div>
          <textarea
            value={leftValue}
            onChange={(e) => setLeftValue(e.target.value)}
            className="w-full h-64 p-4 bg-black/40 border border-white/10 rounded-2xl font-mono text-sm focus:border-blue-500 focus:outline-none resize-none text-white/90 placeholder-white/30"
            placeholder={leftPlaceholder}
          />
          <button
            onClick={handleConvert}
            className="mt-4 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-[1.02]"
          >
            {convertButtonText}
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-purple-500/30 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-lg font-bold text-white">{rightLabel}</h3>
              </div>
              <button onClick={copyOutput} className="text-sm text-purple-400 hover:text-purple-300 font-medium transition">
                {t('copy')}
              </button>
            </div>
            <textarea
              value={rightValue}
              readOnly
              className="w-full h-64 p-4 bg-black/40 border border-purple-500/20 rounded-2xl font-mono text-sm resize-none text-white/90"
            />
            <div className="mt-4 flex items-center justify-between p-4 backdrop-blur-xl bg-white/5 border border-green-500/30 rounded-2xl">
              <span className="text-white/80 font-medium">{t('tokenSavings')}</span>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {savings}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300"
          role="status"
          aria-live="polite"
        >
          <div
            className={`
              flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl
              backdrop-blur-xl border
              ${toast.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
                : 'bg-red-500/15 border-red-400/40 text-red-200'
              }
            `}
          >
            {toast.type === 'success' ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/30">
                <Check className="h-4 w-4 text-emerald-300" strokeWidth={2.5} />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/30">
                <AlertCircle className="h-4 w-4 text-red-300" strokeWidth={2.5} />
              </div>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
