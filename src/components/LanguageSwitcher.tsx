import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { LOCALES, type Locale } from '../i18n/messages';
import { useI18n } from '../i18n/I18nContext';
import { FlagIconBg, FlagIconEn } from './icons/LocaleFlags';

function GlobeIcon() {
  return (
    <svg
      className="lang-switcher-globe"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`lang-switcher-chevron${open ? ' is-open' : ''}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocaleFlag({ locale }: { locale: Locale }) {
  return locale === 'en' ? (
    <FlagIconEn className="lang-switcher-flag" />
  ) : (
    <FlagIconBg className="lang-switcher-flag" />
  );
}

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const baseId = useId();
  const listId = `${baseId}-listbox`;
  const comboboxId = `${baseId}-combobox`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const el = rootRef.current;
      if (el && e.target instanceof Node && !el.contains(e.target)) {
        close();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const pick = (code: Locale) => {
    setLocale(code);
    close();
  };

  const currentLabel = locale === 'en' ? t('lang_en') : t('lang_bg');

  return (
    <div
      ref={rootRef}
      className={`lang-switcher lang-switcher-root${open ? ' is-open' : ''}`}
    >
      <label htmlFor={comboboxId} className="lang-switcher-label">
        <GlobeIcon />
        <span>{t('lang_label')}</span>
      </label>

      <button
        id={comboboxId}
        type="button"
        className="lang-switcher-trigger"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={t('lang_label')}
        onClick={() => setOpen((v) => !v)}
      >
        <LocaleFlag locale={locale} />
        <span className="lang-switcher-trigger-label">{currentLabel}</span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul id={listId} className="lang-switcher-menu" role="listbox">
          {LOCALES.map((code) => {
            const name = code === 'en' ? t('lang_en') : t('lang_bg');
            const selected = locale === code;
            return (
              <li key={code} className="lang-switcher-menu-item" role="presentation">
                <button
                  type="button"
                  id={`${baseId}-opt-${code}`}
                  className={`lang-switcher-option${selected ? ' is-selected' : ''}`}
                  role="option"
                  aria-selected={selected}
                  onClick={() => pick(code)}
                >
                  <LocaleFlag locale={code} />
                  <span>{name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
