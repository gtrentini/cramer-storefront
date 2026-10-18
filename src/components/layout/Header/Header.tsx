import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange,
}) => {
  return (
    <header className={styles.header}>
      {/* Top trust indicator bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.trustBadgesList}>
            <div className={styles.trustBadge}>
              <span className={styles.icon} aria-hidden="true">★</span>
              <span>
                <strong className={styles.highlight}>100%</strong> Positive Feedback
              </span>
            </div>

            <div className={styles.trustBadge}>
              <span className={styles.icon} aria-hidden="true">✓</span>
              <span>
                <strong className={styles.highlight}>1,100+</strong> Transactions
              </span>
            </div>

            <div className={styles.topRatedPlusTag} title="eBay Top Rated Plus Seller Status">
              <span aria-hidden="true">✦</span>
              <span>Top Rated Plus</span>
            </div>
          </div>

          <div className={styles.securityNote}>
            <span>Official Cramer Collectables Vault • Direct eBay Integration</span>
          </div>
        </div>
      </div>

      {/* Main Header with Logo, Title, and Search Bar */}
      <div className={styles.mainHeader}>
        <div className={styles.brandGroup}>
          <div className={styles.brandLogo} aria-hidden="true">
            CC
          </div>
          <div className={styles.brandInfo}>
            <h1 className={styles.brandTitle}>Cramer Collectables</h1>
            <p className={styles.storeSubtitle}>
              Curated High-End Sports Cards, Vintage Comics & Sealed Toys
            </p>
          </div>
        </div>

        <div className={styles.searchForm} role="search">
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search sports cards, CGC comics, vintage toys, PSA cert #..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              aria-label="Search Cramer Collectables inventory"
            />
          </div>
          <div className={styles.quickTags}>
            <span>Trending:</span>
            <span className={styles.tagPill}>PSA 10</span>
            <span className={styles.tagPill}>Bowman Chrome</span>
            <span className={styles.tagPill}>CGC 9.8</span>
            <span className={styles.tagPill}>Kenner 1985</span>
          </div>
        </div>
      </div>
    </header>
  );
};
