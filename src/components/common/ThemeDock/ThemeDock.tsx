import React from 'react';
import { ThemeMode } from '@/types/collectable.types';
import styles from './ThemeDock.module.scss';

interface ThemeDockProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  itemCount: number;
}

interface ThemeOption {
  key: ThemeMode;
  label: string;
  badgeLabel: string;
  swatchClass: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    key: 'vault',
    label: 'Vault (Dark)',
    badgeLabel: 'Gold Slab',
    swatchClass: styles.vaultSwatch,
  },
  {
    key: 'gallery',
    label: 'Gallery (Warm Editorial)',
    badgeLabel: 'Archival Cream',
    swatchClass: styles.gallerySwatch,
  },
  {
    key: 'terminal',
    label: 'Terminal (Minimal Grid)',
    badgeLabel: 'Electric Cyan',
    swatchClass: styles.terminalSwatch,
  },
];

export const ThemeDock: React.FC<ThemeDockProps> = ({
  activeTheme,
  onThemeChange,
  itemCount,
}) => {
  return (
    <aside className={styles.dockWrapper} aria-label="Theme Preview Dock">
      <div className={styles.dockInner}>
        <div className={styles.leftSection}>
          <span className={styles.previewLabel}>
            <span className={styles.pulseDot} />
            Theme System
          </span>
          <div className={styles.themeSelector} role="radiogroup" aria-label="Select Theme Mode">
            {THEME_OPTIONS.map((theme) => {
              const isActive = activeTheme === theme.key;
              return (
                <button
                  key={theme.key}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  className={`${styles.themeBtn} ${isActive ? styles.active : ''}`}
                  onClick={() => onThemeChange(theme.key)}
                >
                  <span className={`${styles.swatch} ${theme.swatchClass}`} />
                  <span>{theme.label}</span>
                  {isActive && <span className={styles.activeBadge}>{theme.badgeLabel}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.itemCountBadge} title="Verified Mock Collectables Count">
            <span className={styles.countNumber}>{itemCount}</span>
            <span>Items Indexed</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
